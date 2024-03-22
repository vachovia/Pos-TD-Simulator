import * as React from 'react'
import { createContext, useContext } from 'react'
import {
    IntegrationType,
    PreferencesContext,
    SdkAssistHandler,
    SdkIntegration,
    SdkPrintMode,
} from './preferences.context'
import { isPromise, WithChildren } from '../helpers/type.helper'
import { DeprecatedOperation, sdkModule } from '../modules/sdk.module'
import { AssistedTransactionRequest, AssistModule } from '../types'

declare global {
    interface Window {
        POS: {
            handleTransaction?(type: string, amount: number): Promise<unknown>
        }
    }
}

type Context = {
    handleTransaction(operation: DeprecatedOperation): Promise<unknown>
}

export const IntegrationsContext = createContext({} as Context)

export const IntegrationsProvider = (props: WithChildren) => {
    const { integration } = useContext(PreferencesContext)

    const context: Context = { handleTransaction }

    return (
        <IntegrationsContext.Provider value={context}>
            {props.children}
        </IntegrationsContext.Provider>
    )

    function handleTransaction(operation: DeprecatedOperation) {
        // Round a possible imprecision (e.g. .28 * 100) and returns a float for the amount.
        operation.amount = Math.floor(operation.amount)

        switch (integration.type) {
            case IntegrationType.STANDALONE:
                return standaloneHandler(operation)

            case IntegrationType.SDK:
                return sdkHandler({ integration, operation })
        }
    }
}

// Implementation

function standaloneHandler({ type, amount }: DeprecatedOperation) {
    try {
        const result = window.POS.handleTransaction!(type, amount)
        const message = `Error: The 'handleTransaction' handler must return a promise`
        return isPromise(result) ? result : Promise.reject(message)
    } catch (error) {
        if (error instanceof Error) {
            const message = `Error: Please add the SDK script tag to the index.html file.`
            if (error.message === 'PaymentSdk is not defined') alert(message)
        }

        return Promise.reject(error)
    }
}

type SdkHandler = {
    operation: DeprecatedOperation
    integration: SdkIntegration
}

async function sdkHandler({ integration, operation }: SdkHandler) {
    const { resolveSdkLoader } = sdkModule
    const { sdkLoaderUrl, bridgeConfig, bridgeOptions, sdkPrintMode } =
        integration

    const sdk = await resolveSdkLoader(sdkLoaderUrl)
    const bridge = sdk.bridge(bridgeConfig, bridgeOptions)
    const bridgeAssistant = bridge.assist as AssistModuleWithDeprecatedOperation

    if (integration.assistHandler === SdkAssistHandler.OPERATION)
        return bridgeAssistant.operation(operation).then(logResponse)

    const transaction = adaptToTransaction(operation)
    if (sdkPrintMode && sdkPrintMode !== SdkPrintMode.NOT_SPECIFIED)
        transaction.printMode = sdkPrintMode

    return bridgeAssistant.runTransaction(transaction).then(logResponse)

    function logResponse(response: unknown) {
        console.log(response);
        return response;
    }

    function adaptToTransaction(operation: DeprecatedOperation): AssistedTransactionRequest {
        switch (operation.type) {
            case 'SALE':
            case 'REFUND':
                return {
                    type: operation.type,
                    amount: operation.amount,
                }

            case 'VOID':
                if (!operation.linkedReference)
                    throw new Error('Reference number is missing')

                return {
                    type: operation.type,
                    referenceNumber: operation.linkedReference.referenceCode,
                }

            default:
                throw new Error(`Unhandled transaction type: ${operation.type}`)
        }
    }
}

// Types

type AssistModuleWithDeprecatedOperation = AssistModule & {
    operation(deprecatedOperation: DeprecatedOperation): Promise<unknown>
}
