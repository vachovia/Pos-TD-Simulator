import * as React from 'react'
import { useState } from 'react'

const genericErrorId = {
    NOT_READY: 9998,
    UNKNOWN: 9999,
}

const transactionErrorIds = {
    NO_TERMINALS_AVAILABLE: 1003,
    NO_TERMINAL_PAIRED: 1004,
    TERMINAL_MISSING: 1005,
    GENERAL_INTERNAL_ERROR: 3000,
    REFERENCE_CODE_REJECTED_BY_TERMINAL: 3002,
    FAILED_COMMUNICATION_ERROR: 3005,
    FAILED_BATTERY_LOW: 3006,
    CONNECTION_LOST_WITH_TERMINAL: 3009,
    FAILED_TRANSACTION_TIMED_OUT: 3010,
    FAILED_TRANSACTION_INVALID_REQUEST: 3011,
    INVALID_TERMINAL_ID: 3012,
    EXCEEDING_AMOUNT: 3013,
}

const allSdkErrors = Object.entries({
    ...genericErrorId,
    ...transactionErrorIds,
})

export const useSdkError = (codesModule: any): [Error, () => JSX.Element] => {
    const [sdkErrorId, setSdkError] = useState(genericErrorId.UNKNOWN)

    const sdkError = codesModule.toSdkError(sdkErrorId)
    return [sdkError, SdkErrorSelector]

    // Implementation

    function SdkErrorSelector() {
        return (
            <div className="form__group">
                <label htmlFor="SdkError">sdkErrorId:</label>
                <select
                    name="SdkError"
                    id="SdkError"
                    onChange={handleChange}
                    value={sdkErrorId}
                >
                    {allSdkErrors.map(toOption)}
                </select>
                <p>
                    <strong>message:</strong> {sdkError.message}
                </p>
            </div>
        )

        function toOption([key, value]: [string, number]) {
            return (
                <option key={key} value={value}>
                    {value} - {key}
                </option>
            )
        }

        function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
            setSdkError(Number.parseInt(event.target.value))
        }
    }
}
