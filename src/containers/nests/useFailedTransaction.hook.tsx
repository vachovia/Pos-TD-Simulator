import React, { useRef } from 'react'

const resultCodes = {
    USER_CANCELLED: 1,
    BATCH_EMPTY: 2,
    RECEIPT_MESSAGE: 3,
    FAILED_GENERAL: 1200,
    ADMIN_MODE: 1201,
    FAILED_COULD_NOT_BE_COMPLETED: 1204,
    FAILED_OTHER_ERROR: 1999,
    DECLINED_GENERAL: 2200,
    DECLINED_BY_MERCHANT: 2203,
    DECLINED_TIMED_OUT: 2204,
}

const failedTransactionResponseCodes = Object.entries(resultCodes)

type FailedTransaction = {
    type: string
    resultCode: number
    resultDescription?: string
    terminalCode?: number
}

type Returns = {
    getFailedTransaction(): FailedTransaction
    FailedTransactionOptions: () => JSX.Element
    getUseAnotherTerminalHandler(): () => void | undefined
}

export const useFailedTransaction = (): Returns => {
    const resultCodeRef = useRef<HTMLSelectElement>(null)
    const typeRef = useRef<HTMLSelectElement>(null)
    const declineDescriptionRef = useRef<HTMLInputElement>(null)
    const multiLaneRef = useRef<HTMLInputElement>(null)

    return {
        getFailedTransaction,
        getUseAnotherTerminalHandler,
        FailedTransactionOptions,
    }

    // Implementation

    function getFailedTransaction(): FailedTransaction {
        return {
            type: typeRef.current!.value,
            resultCode: Number.parseInt(resultCodeRef.current!.value),
            resultDescription: declineDescriptionRef.current!.value,
            terminalCode: 12345,
        }
    }

    function getUseAnotherTerminalHandler(): () => void | undefined {
        if (!multiLaneRef.current!.checked) return () => undefined

        const resultCode = Number.parseInt(resultCodeRef.current!.value);
        const message = `Retries transaction, but enforces terminal selection`;

        return resultCode === resultCodes.USER_CANCELLED
            ? () => alert(message)
            : () => undefined
    }

    function FailedTransactionOptions() {
        return (
            <div className="form__group">
                <label htmlFor="type">type:</label>
                <select name="type" id="type" ref={typeRef}>
                    <option value="" />
                    <option value="SALE">Sale</option>
                    <option value="REFUND">Refund</option>
                    <option value="VOID">Void</option>
                </select>
                <br />
                <label htmlFor="resultCode">resultCode:</label>
                <select name="resultCode" id="resultCode" ref={resultCodeRef}>
                    {failedTransactionResponseCodes.map(toOption)}
                </select>
                <br />
                <label htmlFor="declineDescription">declineDescription:</label>
                <input
                    name="declineDescription"
                    id="declineDescription"
                    ref={declineDescriptionRef}
                    placeholder="Decline Reason"
                    defaultValue="Decline Reason"
                />
                <br />
                <label htmlFor="multiLane">other terminals available:</label>
                <input ref={multiLaneRef} type="checkbox" id="multiLane" />
            </div>
        )

        function toOption([key, value]: [string, number]) {
            return (
                <option key={key} value={value}>
                    {value} - {key}
                </option>
            )
        }
    }
}
