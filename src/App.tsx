import './App.scss'
import React from 'react'
import { Navigation, Routes as RouterEnum } from './components/navigation'
import { WithChildren } from './helpers/type.helper'
import { PreferencesProvider } from './contexts/preferences.context'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ViewsNest } from './containers/viewsNest'
import { Preferences } from './containers/preferences'
import { Sales } from './containers/sales'
import { IntegrationsProvider } from './contexts/integrations.context'

export const App = () => (
    <div className="l-shell l-constrain">
        <BrowserRouter>
            <AllProviders>
                <Navigation />
                <Routes>
                    <Route path={RouterEnum.sales} element={<Sales />} />
                    <Route path={RouterEnum.viewsNest} element={<ViewsNest />} />
                    <Route path={RouterEnum.preferences} element={<Preferences />} />
                    <Route path="/" element={<Navigate to={RouterEnum.sales} />} />
                </Routes>
            </AllProviders>
        </BrowserRouter>
    </div>
)

function AllProviders(props: WithChildren) {
    return (
        <PreferencesProvider>
            <IntegrationsProvider>{props.children}</IntegrationsProvider>
        </PreferencesProvider>
    )
}
