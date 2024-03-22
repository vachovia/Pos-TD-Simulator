import { Product } from './product'

export type LineItem = {
    quantity: number,
    name: string,
    price: number
}

export const lineItemModule = { add, remove, subtotal, of }

function of(product: Product): LineItem {
    return {
        quantity: 1,
        name: product.name,
        price: product.price
    }
}

function add(item: LineItem): LineItem {
    return { ...item, quantity: ++item.quantity }
}

function remove(item: LineItem): LineItem {
    return { ...item, quantity: --item.quantity }
}

function subtotal(item: LineItem): number {
    return Math.round(item.price * item.quantity * 100) / 100
}
