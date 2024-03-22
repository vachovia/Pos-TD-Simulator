import React, { useState } from 'react'

const operatingSystems = [
    'Windows',
    'Mac',
    'UNIX',
    'Linux',
    'Unknown',
    'Auto Detect',
]

type Returns = {
    isIpad: boolean
    operatingSystem: string
    OperatingSystemSelector: () => JSX.Element
}
export const useOperatingSystem = (): Returns => {
    const [isIpad, setIsIpad] = useState(false)
    const [operatingSystem, setOperatingSystem] = useState(operatingSystems[0])

    return {
        isIpad,
        operatingSystem:
            operatingSystem === 'Auto Detect' ? '' : operatingSystem,
        OperatingSystemSelector,
    }

    function OperatingSystemSelector() {
        return (
            <div className="form__group">
                <label htmlFor="ipads">
                    Simulate behaviour for iPads:
                </label>
                <input
                    type="checkbox"
                    id="ipads"
                    onChange={handleCheckboxChange}
                    checked={isIpad}
                />
                <br />
                <label htmlFor="OperatingSystem">Operating System:</label>
                <select
                    name="OperatingSystem"
                    id="OperatingSystem"
                    onChange={handleChange}
                    value={operatingSystem}
                    disabled={isIpad}
                >
                    {operatingSystems.map(toOption)}
                </select>
            </div>
        )

        function toOption(system: string) {
            return (
                <option key={system} value={system}>
                    {system}
                </option>
            )
        }

        function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
            setOperatingSystem(event.target.value)
        }

        function handleCheckboxChange(
            event: React.ChangeEvent<HTMLInputElement>,
        ) {
            setIsIpad(event.target.checked)
        }
    }
}
