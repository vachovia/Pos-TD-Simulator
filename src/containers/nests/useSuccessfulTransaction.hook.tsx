import React, { createRef } from 'react'

type SuccessfulTransaction = {
    type: string
    resultCode: number
    balanceAmount?: number
    terminalPrintMode: 'printOnEcr' | 'unknown'
    referenceNumber?: string
}

type Returns = {
    getSuccessfulTransaction: () => SuccessfulTransaction
    SuccessfulTransactionOptions: () => JSX.Element
}
export const useSuccessfulTransaction = (): Returns => {
    const balanceRef = createRef<HTMLInputElement>()
    const printOnEcrRef = createRef<HTMLInputElement>()
    const referenceNumberRef = createRef<HTMLInputElement>()
    const typeRef = createRef<HTMLSelectElement>()

    return { getSuccessfulTransaction, SuccessfulTransactionOptions }

    // Implementation

    function getSuccessfulTransaction(): SuccessfulTransaction {
        const balance = Number.parseInt(balanceRef.current!.value)

        return {
            type: typeRef.current!.value,
            balanceAmount: Number.parseInt(balanceRef.current!.value),
            terminalPrintMode: printOnEcrRef.current!.checked
                ? 'printOnEcr'
                : 'unknown',
            referenceNumber: referenceNumberRef.current!.value,
            resultCode: balance ? 4 : 0,
        }
    }

    function SuccessfulTransactionOptions() {
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
                <label htmlFor="balanceAmount">balanceAmount:</label>
                <input
                    ref={balanceRef}
                    type="number"
                    id="balanceAmount"
                    defaultValue={0}
                    placeholder="Balance"
                />
                <br />
                <label htmlFor="referenceNumber">referenceNumber:</label>
                <input
                    ref={referenceNumberRef}
                    type="number"
                    id="referenceNumber"
                    defaultValue={123456}
                    placeholder="Reference Number"
                />
                <br />
                <label htmlFor="printOnEcr">terminalPrintsOnEcr:</label>
                <input ref={printOnEcrRef} type="checkbox" id="printOnEcr" />
            </div>
        )
    }
}
