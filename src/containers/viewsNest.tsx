import { PageContainer } from '../components/page-container'
import * as React from 'react'
import { useContext, useLayoutEffect, useState } from 'react'
import {
    IntegrationType,
    PreferencesContext,
    SdkAssistHandler,
} from '../contexts/preferences.context'
import { OperationNest } from './nests/operation.nest'
import { RunTransactionNest } from './nests/runTransaction.nest'
import { Loader } from '../components/loader'
import { SdkImplementation, sdkModule } from '../modules/sdk.module'

enum ViewState {
    READY = 'READY',
    ERROR = 'ERROR',
    LOADING = 'LOADING',
}

type State =
    | { viewState: ViewState.LOADING }
    | { viewState: ViewState.ERROR }
    | { viewState: ViewState.READY; sdkImplementation: SdkImplementation }

export const ViewsNest = () => {
    const { getSdkIntegration, integration } = useContext(PreferencesContext)
    const [state, setState] = useState<State>({ viewState: ViewState.LOADING })

    useLayoutEffect(() => {
        if (state.viewState !== ViewState.LOADING) return

        if (integration.type !== IntegrationType.SDK)
            return setState({ viewState: ViewState.ERROR })

        sdkModule
            .resolveSdkLoader(integration.sdkLoaderUrl)
            .then(() =>
                sdkModule
                    .resolveSdkImplementation(integration.sdkImplementationUrl)
                    .then(sdkImplementation => {
                        console.log('response: ', sdkImplementation)

                        setState({
                            viewState: ViewState.READY,
                            sdkImplementation,
                        })
                    }),
            )
            .catch(() => setState({ viewState: ViewState.ERROR }))
    })

    return (
        <PageContainer title="Views Nest">
            <RenderState />
        </PageContainer>
    )

    function RenderState() {
        switch (state.viewState) {
            case ViewState.LOADING:
                return <Loader />

            case ViewState.READY:
                switch (getSdkIntegration().assistHandler) {
                    case SdkAssistHandler.OPERATION:
                        return OperationNest(state.sdkImplementation)

                    case SdkAssistHandler.RUN_TRANSACTION:
                    default:
                        return RunTransactionNest(state.sdkImplementation)
                }

            case ViewState.ERROR:
                return (
                    <>
                        <h4 className="negative">Unable to load the Nest</h4>
                        <p>
                            The required PaymentSdk global object is not present
                            and can not be loaded. Please check the settings.
                        </p>
                    </>
                )
        }
    }
}
