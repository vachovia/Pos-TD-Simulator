import { ViewScreen } from '../../types/payment-sdk-internals'
import * as React from 'react'
import { SdkImplementation } from '../../modules/sdk.module'
import { Terminal } from '../../types'

export const OperationNest = (sdkImplementation: SdkImplementation) => {
    const view = sdkImplementation.__view
    const bridgeSdk = sdkImplementation.bridge({
        merchantId: '1',
        registerId: '2',
    })
    const downloadLinks = bridgeSdk.getBridgeDownloadUrls()
    const { viewsNest } = sdkImplementation.__implementation.__internals
    const { bridgeViews, terminalViews, operationViews, miscViews } =
        viewsNest.viewScreens

    const noopProps = {
        view,
        onClose: view.hide,
        onCancel: view.hide,
        onSubmit: view.hide,
        onBack: view.hide,
        onInstall: () => null,
        onRetry: () => null,
        downloadLinks,
        assistedTransactionRequest: {
            type: 'SALE',
            amount: 123,
            terminalId: '123',
        },
        result: {
            operation: {
                resultTitle: 'Operation Result Title',
                resultText: 'Operation Result Text',
            },
        },
    }

    type Cta = { label: string; action: () => void }
    type Section = { title: string; ctas: Cta[] }

    const { bridgeWelcomeView, bridgeNotReadyView, bridgeMissingView } =
        bridgeViews

    const bridge: Section = {
        title: 'Bridge',
        ctas: [
            {
                label: 'Install Mac',
                action: () =>
                    show(
                        bridgeWelcomeView({
                            ...noopProps,
                            operatingSystem: 'Mac',
                        }),
                    ),
            },
            {
                label: 'Install Windows',
                action: () =>
                    show(
                        bridgeWelcomeView({
                            ...noopProps,
                            operatingSystem: 'Windows',
                        }),
                    ),
            },
            {
                label: 'Install Unknown',
                action: () =>
                    show(
                        bridgeWelcomeView({
                            ...noopProps,
                            operatingSystem: 'Unknown',
                        }),
                    ),
            },
            {
                label: 'Install Detect OS',
                action: () => show(bridgeWelcomeView(noopProps)),
            },
            {
                label: 'Not Ready',
                action: () => show(bridgeNotReadyView(noopProps)),
            },
            {
                label: 'Missing',
                action: () =>
                    show(
                        bridgeMissingView({
                            ...noopProps,
                            onInstall: () => show(bridgeWelcomeView(noopProps)),
                        }),
                    ),
            },
        ],
    }

    const {
        terminalMissingView,
        terminalNotInstalledView,
        terminalPickerView,
    } = terminalViews

    const terminal: Section = {
        title: 'Terminal',
        ctas: [
            {
                label: 'Missing',
                action: () => show(terminalMissingView(noopProps)),
            },
            {
                label: 'Not Installed',
                action: () => show(terminalNotInstalledView(noopProps)),
            },
        ],
    }

    const availableTerminals: Terminal[] = [
        {
            macAddress: '54E1405A9C17',
            terminalId: '54E1405A9C17',
            deviceType: 'Ingenico Terminal',
        },
        {
            macAddress: 'B400168157CAB400168157CA',
            terminalId: 'B400168157CAB400168157CA',
            deviceType: 'Ingenico Terminal',
        },
        {
            macAddress: '54E140DD71B6',
            terminalId: '54E140DD71B6',
            deviceType: 'Ingenico Terminal',
        },
        {
            macAddress: '54E140DD71F1',
            terminalId: '54E140DD71F1',
            deviceType: 'Ingenico Terminal',
        },
        {
            macAddress: '54E140DD712C54E140DD712C',
            terminalId: '54E140DD712C54E140DD712C',
            deviceType: 'Ingenico Terminal',
        },
    ]

    const multilane: Section = {
        title: 'Multilane',
        ctas: [
            {
                label: '2 Terminal Selection',
                action: () =>
                    terminalPickerView({
                        ...noopProps,
                        availableTerminals: availableTerminals.slice(0, 2),
                    }),
            },
            {
                label: '5 Terminal Selection (with last used)',
                action: () =>
                    terminalPickerView({
                        ...noopProps,
                        availableTerminals,
                        cachedTerminal: {
                            terminal: availableTerminals[1],
                            isPreferred: true,
                        },
                        enforceTerminalSelection: true,
                    }),
            },
            {
                label: 'Last Used Terminal',
                action: () =>
                    terminalPickerView({
                        ...noopProps,
                        availableTerminals,
                        cachedTerminal: {
                            terminal: availableTerminals[1],
                        },
                    }),
            },
            {
                label: 'Last Used Terminal (Unavailable)',
                action: () =>
                  terminalPickerView({
                      ...noopProps,
                      availableTerminals: availableTerminals.slice(0, 2),
                      cachedTerminal: {
                          terminal: availableTerminals[3],
                      },
                  }),
            },
        ],
    }

    const {
        operationWaitingView,
        operationLongWaitingView,
        operationWaitingWithTerminalsView,
    } = operationViews

    const operation: Section = {
        title: 'Operation',
        ctas: [
            {
                label: 'Waiting',
                action: () => show(operationWaitingView(), true),
            },
            {
                label: 'Long Waiting',
                action: () => show(operationLongWaitingView(noopProps)),
            },
            {
                label: 'Waiting with Terminals',
                action: () => show(operationWaitingWithTerminalsView(), true),
            },
        ],
    }

    const { miscLoadingView } = miscViews

    const miscellaneous: Section = {
        title: 'Miscellaneous',
        ctas: [
            {
                label: 'Loading',
                action: () => show(miscLoadingView(), true),
            },
        ],
    }

    const sections = [bridge, terminal, multilane, operation, miscellaneous]
    return <React.Fragment>{sections.map(toNestSection)}</React.Fragment>

    function toNestSection({ title, ctas }: Section, key: number) {
        return (
            <div className="l-section" key={key}>
                <h3>{`${title} Views`}</h3>
                <div className="button__collection">{ctas.map(toButtons)}</div>
            </div>
        )

        function toButtons({ label, action }: Cta, key: number) {
            return (
                <button onClick={action} key={key}>
                    {label}
                </button>
            )
        }
    }

    function show(screen: ViewScreen, notCancellable?: boolean) {
        view.show(screen)
        if (notCancellable) setTimeout(view.hide, 3000)
    }
}
