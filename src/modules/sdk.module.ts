import { SdkInternals, View } from '../types/payment-sdk-internals'
import { PaymentSdk, TransactionType } from '../types'

declare global {
    interface Window {
        PaymentSdk: SdkLoader
    }
}

type State = {
    sdkLoader?: SdkLoader
    sdkLoaderUrl?: string
    sdkLoaderPromise?: Promise<SdkLoader>

    sdkImplUrl?: string
    sdkImplPromise?: Promise<SdkImplementation>
}

let state: State = {}

export const sdkModule = {
    resetState: () => (state = {}),
    resolveSdkLoader(sdkLoaderUrl: string): Promise<SdkLoader> {
        if (state.sdkLoaderUrl && state.sdkLoaderUrl !== sdkLoaderUrl)
            sdkModule.resetState()

        if (state.sdkLoader) return Promise.resolve(state.sdkLoader)

        if (state.sdkLoaderPromise) return state.sdkLoaderPromise

        state.sdkLoaderPromise = injectScriptTag({
            id: 'sdkLoader',
            src: sdkLoaderUrl,
        }).then(() => {
            state.sdkLoader = window.PaymentSdk
            state.sdkLoaderUrl = sdkLoaderUrl
            return state.sdkLoader
        })

        return state.sdkLoaderPromise
    },
    resolveSdkImplementation(sdkImplUrl: string): Promise<SdkImplementation> {
        if (state.sdkImplUrl && state.sdkImplUrl !== sdkImplUrl)
            sdkModule.resetState()

        if (state.sdkImplPromise) return state.sdkImplPromise

        state.sdkImplPromise = injectScriptTag({
            id: 'sdkImpl',
            src: sdkImplUrl,
        }).then(() => {
            if (!('__implementation' in window.PaymentSdk))
                throw new Error('Failed to load the SDK implementation')

            state.sdkImplUrl = sdkImplUrl
            return window.PaymentSdk
        }) as Promise<SdkImplementation>

        return state.sdkImplPromise!
    },
}

// Implementation

async function injectScriptTag({
    id,
    src,
}: {
    id: string
    src: string
}): Promise<void> {
    document.getElementById(id)?.remove()

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = id
    script.src = src

    return new Promise((resolve, reject) => {
        script.onload = () => resolve()

        script.onerror = error => {
            alert(`Failed to load script tag with url:\n${src}`)
            sdkModule.resetState()
            reject(error)
        }

        document.head!.appendChild(script)
    })
}

// Types

/**
 * NOTE: (rafael@fiska.com) Define both SdkLoader and SdkImplementation types based on the PaymentSdk.
 */
export type SdkLoader = PaymentSdk & { __view: View }
export type SdkImplementation = SdkLoader & {
    __implementation: { __internals: SdkInternals }
}

export type DeprecatedOperation = {
    type: TransactionType
    amount: number
    referenceCode?: string
    linkedReference?: {
        referenceCode: string
    }
}
