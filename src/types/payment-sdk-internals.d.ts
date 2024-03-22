import { Terminal } from './index';

export type ViewScreen =
    | 'bridgeViews'
    | 'operationViews'
    | 'transactionViews'
    | 'terminalViews'
    | 'miscViews'
    | 'merchantViews'

export type SdkInternals = {
    viewsNest: SdkViewsNest
    codesModule: any
}

export type SdkViewsNest = {
    viewScreens: { [key in ViewScreen]: ScreensCollection }
}

export type CachedTerminal = {
    terminal: Terminal
    isPreferred?: boolean
}

export type ScreensCollection = { [key: string]: (props?: any) => ViewScreen }

export type View = {
    hide(): void
    show(screen: ViewScreen): void
}

export {Terminal}