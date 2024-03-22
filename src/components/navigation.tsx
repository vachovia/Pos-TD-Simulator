import * as React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {
    IntegrationType,
    PreferencesContext,
} from '../contexts/preferences.context'
import { IconsModule } from '../resources/icons.module'

export enum Routes {
    any = '*',
    viewsNest = '/views-nest',
    preferences = '/preferences',
    sales = '/sales',
}

export const Navigation = () => {
    const { integration, isValidIntegration } = useContext(PreferencesContext)

    const isInvalidIntegration = !isValidIntegration()

    return (
        <nav className="navigation">
            <Navigate Icon={IconsModule.Menu} />
            <Navigate
                to={Routes.sales}
                Icon={IconsModule.ShoppingCart}
                disabled={isInvalidIntegration}
            />
            <Navigate Icon={IconsModule.PriceTag} />
            <Navigate Icon={IconsModule.VCard} />
            <RenderRoutesForIntegration />
        </nav>
    )

    function RenderRoutesForIntegration() {
        switch (integration.type) {
            case IntegrationType.STANDALONE:
                return null

            case IntegrationType.SDK:
                return (
                    <React.Fragment>
                        <Navigate
                            to={Routes.viewsNest}
                            Icon={IconsModule.Layers}
                            disabled={isInvalidIntegration}
                        />
                        <Navigate
                            to={Routes.preferences}
                            Icon={IconsModule.Cog}
                        />
                    </React.Fragment>
                )
        }
    }
}

// Implementation

type Props = { Icon: React.FC; to?: Routes; disabled?: boolean }
function Navigate({ to, Icon, disabled }: Props) {
    if (disabled || !to)
        return (
            <div>
                <button disabled className="navigation__item">
                    <Icon />
                </button>
            </div>
        )

    return (
        <NavLink
            to={to}
            className={isActive =>
                isActive ? `navigation__item active` : 'navigation__item'
            }
        >
            <Icon />
        </NavLink>
    )
}
