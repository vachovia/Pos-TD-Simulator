import * as React from 'react'
import { PropsWithChildren, useEffect } from 'react'
import { useSdkError } from './useSdkError.hook'
import { useOperatingSystem } from './useOperatingSystem.hook'
import { useSuccessfulTransaction } from './useSuccessfulTransaction.hook'
import { useFailedTransaction } from './useFailedTransaction.hook'
import { useTerminalPicker } from './useTerminalPicker.hook'
import { SdkImplementation } from '../../modules/sdk.module'

export const RunTransactionNest = (sdkImplementation: SdkImplementation) => {
    useEscapeKeyToHideViews(sdkImplementation)
    const sdkInternals = toSdkInternals(sdkImplementation)

    return (
        <React.Fragment>
            <MiscViews sdkInternals={sdkInternals} />
            <MerchantViews sdkInternals={sdkInternals} />
            <BridgeViews sdkInternals={sdkInternals} />
            <OperationViews sdkInternals={sdkInternals} />
            <TerminalViews sdkInternals={sdkInternals} />
            <TransactionViews sdkInternals={sdkInternals} />
        </React.Fragment>
    )
}

// Implementation

function MiscViews({ sdkInternals }: Props) {
    const { show, hide, onCancel, viewScreens, codesModule } = sdkInternals
    const { miscLoadingView, miscSdkErrorView } = viewScreens.miscViews
    const [sdkError, SdkErrorSelector] = useSdkError(codesModule)

    return (
        <div className="l-section">
            <h3>Miscellaneous Views</h3>
            <Screen
                title="Loading View"
                onClick={() => {
                    show(miscLoadingView())
                    scheduleRun(hide)
                }}
            />

            <Screen
                title="SDK Error View"
                onClick={() => show(miscSdkErrorView({ sdkError, onCancel }))}
            >
                <p>
                    sdkErrorId 3013 - EXCEEDING_AMOUNT is the only error view to
                    which we have a special treatment so far.
                    <br />
                    All other views only differ in the message displayed to the
                    screen.
                </p>
                <SdkErrorSelector />
            </Screen>
        </div>
    )
}

function MerchantViews({ sdkInternals }: Props) {
    const { show, onCancel, viewScreens } = sdkInternals
    const { uninitializedMerchantView } = viewScreens.merchantViews

    return (
        <div className="l-section">
            <h3>Merchant Views</h3>
            <Screen
                title="Uninitialized Merchant"
                onClick={() =>
                    show(
                        uninitializedMerchantView({
                            onCancel,
                            uninitializedMerchantCode: 3001,
                        }),
                    )
                }
            />
        </div>
    )
}

function BridgeViews({ sdkInternals }: Props) {
    const { show, onCancel, viewScreens } = sdkInternals

    const { bridgeWelcomeView, bridgeNotReadyView, bridgeMissingView } =
        viewScreens.bridgeViews

    const { isIpad, operatingSystem, OperatingSystemSelector } =
        useOperatingSystem()

    const onInstall = async () => {
        const bridgeConfig = { merchantId: 'm', registerId: 'r' }
        const bridge = window.PaymentSdk.bridge(bridgeConfig)
        const downloadLinks = await bridge.getBridgeDownloadUrls()

        return show(
            bridgeWelcomeView({
                isIpad,
                onCancel,
                operatingSystem,
                downloadLinks,
            }),
        )
    }

    return (
        <div className="l-section">
            <h3>Bridge Views</h3>
            <Screen title="Welcome" onClick={onInstall}>
                <OperatingSystemSelector />
            </Screen>
            <Screen
                title="Not Ready"
                onClick={() => show(bridgeNotReadyView({ onCancel }))}
            />
            <Screen
                title="Missing"
                onClick={() => show(bridgeMissingView({ onCancel, onInstall }))}
            />
        </div>
    )
}

function OperationViews({ sdkInternals }: Props) {
    const { show, hide, onCancel, viewScreens } = sdkInternals

    const {
        operationWaitingView,
        operationWaitingWithTerminalsView,
        operationLongWaitingView,
    } = viewScreens.operationViews

    return (
        <div className="l-section">
            <h3>Operation Views</h3>
            <Screen
                title="Waiting"
                onClick={() => {
                    scheduleRun(hide)
                    show(operationWaitingView())
                }}
            />
            <Screen
                title="Waiting with other terminals available"
                onClick={() => {
                    scheduleRun(hide)
                    show(operationWaitingWithTerminalsView())
                }}
            />
            <Screen
                title="Long Waiting"
                onClick={() => show(operationLongWaitingView({ onCancel }))}
            />
        </div>
    )
}

function TerminalViews({ sdkInternals }: Props) {
    const { show, hide, onCancel, onClose, view, viewScreens } = sdkInternals

    const {
        terminalMissingView,
        terminalNotInstalledView,
        terminalPickerView,
    } = viewScreens.terminalViews

    const terminalPicker = useTerminalPicker()
    const {
        getTerminalPickerProps,
        updateCachedTerminal,
        TerminalPickerOptions,
    } = terminalPicker

    return (
        <div className="l-section">
            <h3>Terminal Views</h3>
            <Screen
                title="No Available Terminals"
                onClick={() => show(terminalNotInstalledView({ onCancel }))}
            >
                <p>
                    Mostly seeing on initial setups. Displayed when we can't
                    find any available terminal and we don't have any terminal
                    cached.
                </p>
            </Screen>
            <Screen
                title="No Available Terminals (Cached Terminal Missing)"
                onClick={() => show(terminalMissingView({ onCancel }))}
            >
                <p>
                    Displayed when we can't find any available terminal but we
                    have a terminal cached.
                </p>
            </Screen>
            <Screen
                title="Terminal Selector / Resolver"
                onClick={async () => {
                    const terminal: any = await terminalPickerView({
                        view,
                        onClose,

                        ...getTerminalPickerProps(),
                    })

                    alert(
                        `Transaction would be sent to ${JSON.stringify(
                            terminal,
                            null,
                            2,
                        )}.`,
                    )

                    updateCachedTerminal(terminal)
                    hide()
                }}
            >
                <p>
                    The purpose of this screen is to resolve which terminal will
                    be used to run a transaction.
                    <br />
                    So, if a cached terminal is preferred and available, we
                    resolve with it and the screen is skipped.
                </p>
                <TerminalPickerOptions />
            </Screen>
        </div>
    )
}

function TransactionViews({ sdkInternals }: Props) {
    const { show, onClose, viewScreens } = sdkInternals

    const { transactionSuccessView, transactionFailureView } =
        viewScreens.transactionViews

    const { getSuccessfulTransaction, SuccessfulTransactionOptions } =
        useSuccessfulTransaction()

    const {
        getFailedTransaction,
        getUseAnotherTerminalHandler,
        FailedTransactionOptions,
    } = useFailedTransaction()

    return (
        <div className="l-section">
            <h3>Transaction Views</h3>
            <Screen
                title="Success"
                onClick={() =>
                    show(
                        transactionSuccessView({
                            onClose,
                            successfulTransaction: getSuccessfulTransaction(),
                        }),
                    )
                }
            >
                <p>
                    For transactions with a resultCode of 0 (success) or 4
                    (success with balance).
                    <br />
                    When terminal is set to print on ECR, changes icon color and
                    displays extra notification.
                    <br />
                    When a balance is present, changes icon color and displays
                    extra note on the balance.
                </p>
                <SuccessfulTransactionOptions />
            </Screen>
            <Screen
                title="Failure"
                onClick={() =>
                    show(
                        transactionFailureView({
                            onClose,
                            transactionResponse: getFailedTransaction(),
                            onUseAnotherTerminal:
                                getUseAnotherTerminalHandler(),
                        }),
                    )
                }
            >
                <p>
                    For transactions with any other resultCode.
                    <br />
                    If resultCode is ADMIN_MODE or RECEIPT_MESSAGE, uses a
                    different icon/color.
                    <br />
                    If resultCode is USER_CANCELLED and we have other terminals
                    available, a "Use another terminal" button will be
                    displayed.
                </p>
                <FailedTransactionOptions />
            </Screen>
        </div>
    )
}

type FieldsetProps = PropsWithChildren<{ title: string; onClick(): void }>
function Screen({ title, onClick, children }: FieldsetProps) {
    return (
        <fieldset className="nest-view">
            <div className="nest-view__body">
                <legend>{title}</legend>
                {children}
            </div>
            <button onClick={onClick}>Show</button>
        </fieldset>
    )
}

function toSdkInternals(sdkImplementation: SdkImplementation) {
    const { __view, __implementation } = sdkImplementation

    return {
        view: __view,
        show: __view.show,
        hide: __view.hide,
        onClose: __view.hide,
        onCancel: __view.hide,
        viewScreens: __implementation.__internals.viewsNest.viewScreens,
        codesModule: __implementation.__internals.codesModule,
    }
}

function useEscapeKeyToHideViews(sdkImplementation: SdkImplementation) {
    useEffect(() => {
        /**
         * NOTE: (rafael@fiska.com) This effect is just to let
         *       users dismiss views by hitting the Escape key
         */
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)

        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === 'Escape') sdkImplementation.__view.hide()
        }
    })
}

function scheduleRun(hideFn: () => void, ms = 3000) {
    setTimeout(hideFn, ms)
}

// Types

type Props = { sdkInternals: SdkInternals }

type SdkInternals = ReturnType<typeof toSdkInternals>
