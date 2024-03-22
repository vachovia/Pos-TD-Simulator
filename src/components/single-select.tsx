import * as React from 'react'
import { PropsWithChildren } from 'react'

export interface SingleSelectOption {
    id: string
    label: string
    disabled?: boolean
}

type Props = PropsWithChildren<{
    name: string
    legend: string
    options: SingleSelectOption[]
    onChange(id: unknown): void
    defaultChecked?: string
}>
export const SingleSelect = (props: Props) => {
    const { legend, children, options, onChange } = props

    return (
        <fieldset className="single-select">
            <legend>{legend}</legend>
            <div className="single-select__collection">
                {options.map(({ id, label, disabled }) => (
                    <span key={id} className="single-select__item">
                        <input
                            type="radio"
                            id={id}
                            value={id}
                            name={props.name}
                            disabled={disabled}
                            onChange={onChange.bind(null, id)}
                            defaultChecked={id === props.defaultChecked}
                        />
                        <label className="btn" htmlFor={id}>
                            {label}
                        </label>
                    </span>
                ))}
                {children ? children : null}
            </div>
        </fieldset>
    )
}
