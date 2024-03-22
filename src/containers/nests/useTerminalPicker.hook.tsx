import React, { createRef, useContext, useState } from 'react'
import { CachedTerminal, Terminal } from '../../types/payment-sdk-internals'
import { PreferencesContext } from '../../contexts/preferences.context'

type TransactionRequest = {
    type: string
    amount: number
    referenceNumber: number
}

type TerminalPickerProps = {
    assistedTransactionRequest: TransactionRequest
    cachedTerminal?: CachedTerminal
    enforceTerminalSelection?: boolean
    availableTerminals: Terminal[]
}

type Returns = {
    getTerminalPickerProps: () => TerminalPickerProps
    updateCachedTerminal: (cachedTerminal: CachedTerminal) => void
    TerminalPickerOptions: () => JSX.Element
}
export const useTerminalPicker = (): Returns => {
    const { getSdkIntegration } = useContext(PreferencesContext)
    const { merchantId, registerId } = getSdkIntegration().bridgeConfig
    const storageKey = `PaymentSdk:${merchantId}:${registerId}:LAST_USED_TERMINAL`

    const typeRef = createRef<HTMLSelectElement>()
    const enforceSelectionRef = createRef<HTMLInputElement>()
    const cachedIsAvailableRef = createRef<HTMLInputElement>()
    const [cachedTerminal, setCachedTerminal] = useState(getCachedTerminal())

    return {
        getTerminalPickerProps,
        updateCachedTerminal,
        TerminalPickerOptions,
    }

    // Implementation

    function getTerminalPickerProps(): TerminalPickerProps {
        return {
            enforceTerminalSelection: enforceSelectionRef.current!.checked,
            assistedTransactionRequest: {
                type: typeRef.current!.value,
                amount: 123,
                referenceNumber: 123456,
            },
            cachedTerminal,
            availableTerminals: getAvailableTerminals(cachedTerminal),
        }
    }

    function getAvailableTerminals(cachedTerminal?: CachedTerminal) {
        const t1 = generateTerminal()
        const t2 = generateTerminal()

        if (!cachedTerminal) return [t1, t2]

        /**
         * NOTE: (rafael@fiska.com) If the user checks `Make cached terminal available`,
         *       then we add it to the list of available terminals, otherwise, the cached
         *       terminal will be displayed as missing by default.
         */
        return cachedIsAvailableRef.current!.checked
            ? [cachedTerminal.terminal, t1, t2]
            : [t1, t2]

        function generateTerminal(): Terminal {
            const macAddress = generateMacAddress()
            return {
                macAddress,
                terminalId: macAddress,
                deviceType: 'Views Nest Terminal',
            }

            function generateMacAddress() {
                return `XXXXXXXXXXXX`.replace(/X/g, randomCharacter)

                function randomCharacter() {
                    const randomPosition = Math.floor(Math.random() * 16)
                    return '0123456789ABCDEF'.charAt(randomPosition)
                }
            }
        }
    }

    function getCachedTerminal() {
        const rawTerminal = localStorage.getItem(storageKey)
        return rawTerminal ? JSON.parse(rawTerminal) : undefined
    }

    function updateCachedTerminal(cachedTerminal: CachedTerminal) {
        localStorage.setItem(storageKey, JSON.stringify(cachedTerminal))
        setCachedTerminal(cachedTerminal)
    }

    function TerminalPickerOptions() {
        return (
            <div className="form__group">
                <label htmlFor="type">Type:</label>
                <select name="type" id="type" ref={typeRef}>
                    <option value="" />
                    <option value="SALE">Sale</option>
                    <option value="REFUND">Refund</option>
                    <option value="VOID">Void</option>
                </select>
                <br />
                <label htmlFor="enforceSelection">
                    Enforce Terminal Selection:
                </label>
                <input
                    ref={enforceSelectionRef}
                    type="checkbox"
                    id="enforceSelection"
                />
                <br />
                <label htmlFor="cachedIsAvailable">
                    Cached terminal is available:
                </label>
                <input
                    ref={cachedIsAvailableRef}
                    type="checkbox"
                    id="cachedIsAvailable"
                    defaultChecked={true}
                />
                <br />
                <label htmlFor="type">Cached Terminal:</label>
                <pre>
                    <code>{JSON.stringify(cachedTerminal || {}, null, 2)}</code>
                </pre>
            </div>
        )
    }
}
