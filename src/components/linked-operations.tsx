import * as React from 'react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { SingleSelect } from './single-select'
import { DeprecatedOperation } from '../modules/sdk.module'
import { TransactionType } from '../types'

const linkedOperations = [{ id: 'VOID', label: 'void' }]

type Props = {
    amount: number
    onCancel(): void
    onSubmit(linkedOperation: Partial<DeprecatedOperation>): void
}
export const LinkedOperations = (props: Props) => {
    const { onCancel, onSubmit } = props
    const [amount, setAmount] = useState<number>(props.amount)
    const [referenceCode, setReferenceCode] = useState<string>('')
    const [type, setType] = useState<TransactionType>('SALE')

    const referenceCodeIsRequired = requiresReferenceCode(type)
    const amountIsRequired = requiresAmount(type)
    const isValidOperation = !referenceCodeIsRequired || referenceCode

    return (
        <form className="backdrop" onSubmit={send}>
            <div className="l-section">
                <SingleSelect
                    onChange={setType}
                    defaultChecked={type}
                    name="linked_operations"
                    legend="Linked Operation Type"
                    options={linkedOperations}
                />

                <div className="input__group l-vspace">
                    {amountIsRequired && (
                        <div className="input">
                            <label htmlFor="amount">Amount in Cents:</label>
                            <input
                                type="text"
                                id="amount"
                                value={amount}
                                onChange={setAmountState}
                            />
                        </div>
                    )}
                    {referenceCodeIsRequired && (
                        <div
                            className={
                                isValidOperation ? 'input' : 'input--invalid'
                            }
                        >
                            <label htmlFor="referenceCode">
                                Reference Code:
                            </label>
                            <input
                                required
                                type="text"
                                id="referenceCode"
                                value={referenceCode}
                                onChange={setReferenceCodeState}
                            />
                        </div>
                    )}
                </div>

                <div className="button__collection l-block">
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="focus"
                        disabled={!isValidOperation}
                    >
                        Send
                    </button>
                </div>
            </div>
        </form>
    )

    function setAmountState(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target
        if (isValidAmount(value)) setAmount(+value)
    }

    function setReferenceCodeState(event: ChangeEvent<HTMLInputElement>) {
        setReferenceCode(event.target.value)
    }

    function isValidAmount(value: string) {
        return !Number.isNaN(+value)
    }

    function send(event: FormEvent) {
        event.preventDefault()
        onSubmit({
            type,
            amount: amountIsRequired ? amount : undefined,

            // linkedReference prop passed only if required
            ...(referenceCodeIsRequired && {
                linkedReference: { referenceCode },
            }),
        })
    }

    function requiresReferenceCode(transactionType: TransactionType): boolean {
        return ['CAPTURE', 'REFUND', 'VOID'].includes(transactionType)
    }

    function requiresAmount(transactionType: TransactionType): boolean {
        return ['CAPTURE', 'REFUND'].includes(transactionType)
    }
}
