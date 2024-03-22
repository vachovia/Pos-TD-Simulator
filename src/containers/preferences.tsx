import * as React from 'react'
import { useContext } from 'react'
import { PageContainer } from '../components/page-container'
import {
    IntegrationType,
    PreferencesContext,
    SdkAssistHandler,
    SdkIntegration,
    SdkPrintMode,
} from '../contexts/preferences.context'
import { industries } from '../resources/industries'
import { BridgeConfig, BridgeOptions } from '../types'
import { SingleSelect } from '../components/single-select'

export const Preferences = () => {
    const {
        integration,
        setActiveIntegration,
        activeIndustry,
        setActiveIndustry,
    } = useContext(PreferencesContext)

    return (
        <PageContainer title="Preferences">
            <div className="l-section">
                <SingleSelect
                    name="integration"
                    legend="Select Integration Mode"
                    options={[
                        { id: IntegrationType.STANDALONE, label: 'Standalone' },
                        { id: IntegrationType.SDK, label: 'Internal - Sdk' },
                    ]}
                    onChange={setActiveIntegration}
                    defaultChecked={integration.type}
                />
                <IntegrationPreferences />
                <hr />
                <SingleSelect
                    name="industry"
                    legend="Active Industry"
                    options={industries}
                    onChange={setActiveIndustry}
                    defaultChecked={activeIndustry}
                />
            </div>
        </PageContainer>
    )
}

// Implementation

function IntegrationPreferences() {
    const { integration } = useContext(PreferencesContext)

    switch (integration.type) {
        case IntegrationType.STANDALONE:
            return null // Standalone does not expose any preferences

        case IntegrationType.SDK:
            return (
                <>
                    <hr />
                    <fieldset>
                        <legend>Internal - SDK Preferences</legend>
                        <SdkPreferences sdkIntegration={integration} />
                        <SdkLoaderUrlPresets sdkIntegration={integration} />
                        <SdkAssistHandlerOptions sdkIntegration={integration} />
                        <SdkPrintModeOptions sdkIntegration={integration} />
                    </fieldset>
                </>
            )
    }
}

type SdkProps = { sdkIntegration: SdkIntegration }
function SdkPreferences({ sdkIntegration }: SdkProps) {
    const { setIntegration } = useContext(PreferencesContext)
    const { sdkLoaderUrl, sdkImplementationUrl, bridgeConfig, bridgeOptions } =
        sdkIntegration
    const { merchantId, registerId } = bridgeConfig
    const { skipSuccessScreen, skipSuccessWithBalanceScreen } = bridgeOptions

    return (
        <div className="input__group">
            <div className={merchantId ? 'input' : 'input--invalid'}>
                <label htmlFor="merchantId">Merchant Id:</label>
                <input
                    id="merchantId"
                    type="text"
                    required={true}
                    value={merchantId}
                    onChange={handleBridgeConfigChangeFor('merchantId')}
                />
            </div>
            <div className={registerId ? 'input' : 'input--invalid'}>
                <label htmlFor="registerId">Register Id:</label>
                <input
                    id="registerId"
                    type="text"
                    required={true}
                    value={registerId}
                    onChange={handleBridgeConfigChangeFor('registerId')}
                />
            </div>
            <div className={sdkLoaderUrl ? 'input' : 'input--invalid'}>
                <label htmlFor="sdkLoaderUrl">Sdk Loader Url:</label>
                <input
                    id="sdkLoaderUrl"
                    type="text"
                    required={true}
                    value={sdkLoaderUrl}
                    onChange={handleSdkIntegrationChangeFor('sdkLoaderUrl')}
                />
            </div>
            <div className={sdkImplementationUrl ? 'input' : 'input--invalid'}>
                <label htmlFor="sdkImplementationUrl">
                    Sdk Implementation Url:
                </label>
                <input
                    id="sdkImplementationUrl"
                    type="text"
                    required={true}
                    value={sdkImplementationUrl}
                    onChange={handleSdkIntegrationChangeFor(
                        'sdkImplementationUrl',
                    )}
                />
            </div>
            <div className="input">
                <label htmlFor="skipSuccessScreen">
                    Skip Successful Screens:
                </label>
                <input
                    type="checkbox"
                    name="skipSuccessScreen"
                    id="skipSuccessScreen"
                    checked={Boolean(skipSuccessScreen)}
                    onChange={handleBridgeOptionsChangeFor('skipSuccessScreen')}
                />
            </div>
            <div className="input">
                <label htmlFor="skipSuccessWithBalanceScreen">
                    Skip Successful Screens With Balance:
                </label>
                <input
                    type="checkbox"
                    name="skipSuccessWithBalanceScreen"
                    id="skipSuccessWithBalanceScreen"
                    checked={Boolean(skipSuccessWithBalanceScreen)}
                    onChange={handleBridgeOptionsChangeFor(
                        'skipSuccessWithBalanceScreen',
                    )}
                />
            </div>
        </div>
    )

    function handleBridgeConfigChangeFor(key: keyof BridgeConfig) {
        return (event: React.ChangeEvent<HTMLInputElement>) =>
            setIntegration({
                ...sdkIntegration,
                bridgeConfig: {
                    ...sdkIntegration.bridgeConfig,
                    [key]: event.target.value,
                },
            })
    }

    function handleBridgeOptionsChangeFor(key: keyof BridgeOptions) {
        return (event: React.ChangeEvent<HTMLInputElement>) =>
            setIntegration({
                ...sdkIntegration,
                bridgeOptions: {
                    ...sdkIntegration.bridgeOptions,
                    [key]: event.target.checked,
                },
            })
    }

    function handleSdkIntegrationChangeFor(key: keyof SdkIntegration) {
        return (event: React.ChangeEvent<HTMLInputElement>) =>
            setIntegration({
                ...sdkIntegration,
                [key]: event.target.value,
            })
    }
}

function SdkLoaderUrlPresets({ sdkIntegration }: SdkProps) {
    const { setIntegration } = useContext(PreferencesContext)
    return (
        <div className="button-presets">
            <strong>presets:</strong>
            {Object.entries({
                local: 'http://localhost:80',
                dev: 'https://app-bridge-sdk-javascript.dev.fiska.tech',
                tagged: 'https://app-bridge-sdk-javascript-TAG_NAME.dev.fiska.tech',
                prod: 'https://sdk.integratedcommerce.io',
            }).map(presetButton)}
        </div>
    )

    function presetButton([label, host]: [string, string]) {
        return (
            <button className="btn-text" key={label} onClick={handleClick}>
                {label}
            </button>
        )

        function handleClick() {
            setIntegration({
                ...sdkIntegration,
                sdkLoaderUrl: `${host}/bridge-sdk.js`,
                sdkImplementationUrl: `${host}/bridge-sdk-impl.js`,
            })
        }
    }
}

function SdkAssistHandlerOptions({ sdkIntegration }: SdkProps) {
    const { setIntegration } = useContext(PreferencesContext)

    const options = [
        { id: SdkAssistHandler.OPERATION, label: 'Legacy Operation' },
        { id: SdkAssistHandler.RUN_TRANSACTION, label: 'Transaction' },
    ]

    const onChange = (assistHandler: SdkAssistHandler) =>
        setIntegration({ ...sdkIntegration, assistHandler })

    return (
        <SingleSelect
            name="assist-handler"
            legend="Internal - Sdk Assist Handler"
            options={options}
            onChange={onChange}
            defaultChecked={sdkIntegration.assistHandler}
        />
    )
}

function SdkPrintModeOptions({ sdkIntegration }: SdkProps) {
    const { setIntegration } = useContext(PreferencesContext)

    if (sdkIntegration.assistHandler === SdkAssistHandler.OPERATION) return null

    const onChange = (sdkPrintMode: SdkPrintMode) =>
        setIntegration({ ...sdkIntegration, sdkPrintMode })

    const options = [
        { id: SdkPrintMode.NOT_SPECIFIED, label: 'Not Specified' },
        { id: SdkPrintMode.PRINT_ON_ECR, label: 'Print On ECR' },
        { id: SdkPrintMode.PRINT_ON_TERMINAL, label: 'Print On Terminal' },
    ]

    return (
        <SingleSelect
            name="print-mode"
            legend="Internal - Sdk Print Mode"
            options={options}
            onChange={onChange}
            defaultChecked={
                sdkIntegration.sdkPrintMode || SdkPrintMode.NOT_SPECIFIED
            }
        />
    )
}
