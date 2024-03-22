import { ReactNode } from 'react';

export const isPromise = (obj: any) => {
    // From https://github.com/then/is-promise
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * Similar to React's PropsWithChildren<P>, with 2 differences:
 * 1. children is required and 2. passing a props type <P> is optional
 */
export type WithChildren<P = { children: ReactNode }> = P & { children: ReactNode }
