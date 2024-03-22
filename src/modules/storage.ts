type StorageModule = {
    getItem: <T>(key: string) => T | void
    setItem: (key: string, value: unknown) => void
}

const prefix = 'PosSimulator::'

export const storageModule: StorageModule = setStorage(localStorage)

function setStorage(storage: Storage): StorageModule {
    return { getItem, setItem }

    function getItem<T>(key: string): T | void {
        const value = storage.getItem(`${prefix}${key}`)
        if (value) return JSON.parse(value) as T
    }

    function setItem(key: string, value: unknown) {
        value && storage.setItem(`${prefix}${key}`, JSON.stringify(value))
    }
}
