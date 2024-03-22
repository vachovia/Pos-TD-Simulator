import React, { useContext } from 'react'
import { Product } from '../entities/product'
import { PreferencesContext } from '../contexts/preferences.context'
import { industries } from '../resources/industries'
import { useNavigate } from 'react-router-dom'
import { Routes } from './navigation'
import { IconsModule } from '../resources/icons.module'

export const Hotkeys = (props: { onClick(product: Product): void }) => {
    const navigate = useNavigate()
    const { activeIndustry } = useContext(PreferencesContext)

    const industry = industries.find(i => i.id === activeIndustry)
    if (!industry) {
        // history.replace(Routes.preferences)
        navigate(Routes.preferences, { replace: true });
        return null
    }

    return (
        <div className="l-section">
            <h3>{industry.label}</h3>
            <div className="hotkeys">{industry.items.map(Item)}</div>
        </div>
    )

    function Item(product: Product): JSX.Element {
        return (
            <figure
                key={product.name}
                className="hotkey"
                onClick={() => props.onClick(product)}
            >
                {Figure(product)}
                <figcaption>{product.name}</figcaption>
            </figure>
        )
    }

    function Figure(p: Product): JSX.Element {
        return (
            <div className="hotkey__figure">
                {p.img ? (
                    <img src={p.img} alt={p.name} />
                ) : (
                    <IconsModule.PriceTag />
                )}
                <span className="hotkey__price">${p.price}</span>
            </div>
        )
    }
}
