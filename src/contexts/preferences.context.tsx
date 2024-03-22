import * as React from 'react'
import { createContext, useEffect, useState } from 'react'
import { storageModule } from '../modules/storage'
import { defaultIndustry } from '../resources/industries'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../components/navigation'
import { WithChildren } from '../helpers/type.helper'
import { BridgeConfig, BridgeOptions } from '../types'

const storageKey = 'Preferences'

export enum IntegrationType {
    STANDALONE = 'STANDALONE',
    SDK = 'Sdk', // NOTE: (rafael@fiska.com) Sdk casing value is important to QA Suite
}

export enum SdkAssistHandler {
    OPERATION = 'OPERATION',
    RUN_TRANSACTION = 'RUN_TRANSACTION',
}

export enum SdkPrintMode {
    NOT_SPECIFIED = 'notSpecified',
    PRINT_ON_ECR = 'printOnEcr',
    PRINT_ON_TERMINAL = 'printOnTerminal',
}

type State = {
    activeIndustry: string
    activeIntegration: IntegrationType
    [IntegrationType.STANDALONE]: StandaloneIntegration
    [IntegrationType.SDK]: SdkIntegration
}

type Context = {
    integration: Integration
    getSdkIntegration(): SdkIntegration

    setIntegration(integration: Integration): void
    setActiveIntegration(integrationType: IntegrationType): void
    isValidIntegration(): boolean

    activeIndustry: string
    setActiveIndustry(industryId: string): void
}

export const PreferencesContext = createContext({} as Context)

export const PreferencesProvider = (props: WithChildren) => {
    const navigate = useNavigate()
    const initial = restoreState()
    const [state, setState] = useState<State>(initial)

    const { activeIntegration, activeIndustry } = state
    const integration = state[activeIntegration]

    const context: Context = {
        integration,
        getSdkIntegration,

        setIntegration,
        setActiveIntegration,
        isValidIntegration,

        activeIndustry,
        setActiveIndustry,
    }

    useEffect(() => {
        /**
         * NOTE: (rafael@fiska.com) This persists the state whenever it changes
         */
        storageModule.setItem(storageKey, {
            ...state,
            activeIndustry,
            activeIntegration: integration.type,
            [integration.type]: integration,
        })
    }, [state, activeIndustry, integration])

    return (
        <PreferencesContext.Provider value={context}>
            {props.children}
        </PreferencesContext.Provider>
    )

    function setIntegration(integration: Integration): void {
        setState(prevState => ({
            ...prevState,
            [integration.type]: integration,
        }))
    }

    function setActiveIntegration(activeIntegration: IntegrationType): void {
        setState(prevState => ({ ...prevState, activeIntegration }))
    }

    function setActiveIndustry(activeIndustry: string) {
        setState(prevState => ({ ...prevState, activeIndustry }))
    }

    function isValidIntegration(): boolean {
        switch (integration.type) {
            case IntegrationType.STANDALONE:
                return true

            case IntegrationType.SDK:
                return isValidSdkIntegration(integration)
        }
    }

    function getSdkIntegration(): SdkIntegration {
        if (integration.type !== IntegrationType.SDK || !isValidIntegration()) {
            // history.push(Routes.preferences)
            navigate(Routes.preferences);
            throw new Error('SDK Integration is either inactive or invalid')
        }

        return integration
    }
}

// Implementation

function isValidSdkIntegration(sdkIntegration: SdkIntegration): boolean {
    const { sdkLoaderUrl, sdkImplementationUrl, bridgeConfig } = sdkIntegration
    const { merchantId, registerId } = bridgeConfig
    return Boolean(
        sdkLoaderUrl && sdkImplementationUrl && merchantId && registerId,
    )
}

function restoreState(): State {
    const defaultState: State = {
        activeIndustry: defaultIndustry.id,
        activeIntegration: IntegrationType.STANDALONE,
        [IntegrationType.STANDALONE]: { type: IntegrationType.STANDALONE },
        [IntegrationType.SDK]: {
            type: IntegrationType.SDK,
            assistHandler: SdkAssistHandler.RUN_TRANSACTION,
            sdkPrintMode: SdkPrintMode.NOT_SPECIFIED,
            sdkLoaderUrl: '',
            sdkImplementationUrl: '',
            bridgeConfig: { merchantId: '', registerId: '' },
            bridgeOptions: {},
        },
    }

    return storageModule.getItem<State>(storageKey) || defaultState
}

// Types

type Integration = StandaloneIntegration | SdkIntegration

type StandaloneIntegration = { type: IntegrationType.STANDALONE }

export type SdkIntegration = {
    type: IntegrationType.SDK
    sdkLoaderUrl: string
    sdkImplementationUrl: string
    sdkPrintMode?: SdkPrintMode
    assistHandler: SdkAssistHandler
    bridgeConfig: BridgeConfig
    bridgeOptions: BridgeOptions
}
