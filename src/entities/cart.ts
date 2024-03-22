import { LineItem, lineItemModule } from './line-item'
import { Product } from './product'

export type Cart = LineItem[]
export const cartModule = { add, remove, total, toCents }

function add(cart: Cart, product: Product): Cart {
    const lineItem = cart.find(item => item.name === product.name)

    const addItem = (item: LineItem): LineItem =>
        item.name === product.name ? lineItemModule.add(item) : item

    return lineItem ? cart.map(addItem) : [...cart, lineItemModule.of(product)]
}

function remove(cart: Cart, lineItem: LineItem): Cart {
    const removeItem = (item: LineItem): LineItem =>
        item.name === lineItem.name ? lineItemModule.remove(lineItem) : item

    return cart.map(removeItem).filter(item => item.quantity > 0)
}

function total(cart: Cart): number {
    const sum = cart.reduce(
        (acc, nextItem) => acc + lineItemModule.subtotal(nextItem),
        0,
    )
    return Math.round(sum * 100) / 100
}

function toCents(cartTotal: number): number {
    return Math.round(cartTotal * 100)
}
