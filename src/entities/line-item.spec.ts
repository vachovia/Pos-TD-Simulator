import { lineItemModule } from './line-item'
import { fixtures } from '../_specs/fixtures'

describe('lineItemModule', () => {
    const { of, add, remove, subtotal } = lineItemModule

    it(`"of" creates a LineItem out of a Product`, () => {
        const product = fixtures.getProduct()
        const { name, price } = product
        expect(of(product)).toEqual({ name, price, quantity: 1 })
    })

    it(`"add" increases a LineItem quantity`, () => {
        const lineItemWith1 = fixtures.getLineItem({ quantity: 1 })
        const lineItemWith2 = add(lineItemWith1)
        expect(lineItemWith2.quantity).toBe(2)
        const lineItemWith3 = add(lineItemWith2)
        expect(lineItemWith3.quantity).toBe(3)
    })

    it(`"remove" decreases a LineItem quantity`, () => {
        const lineItemWith3 = fixtures.getLineItem({ quantity: 3 })
        const lineItemWith2 = remove(lineItemWith3)
        expect(lineItemWith2.quantity).toBe(2)
        const lineItemWith1 = remove(lineItemWith2)
        expect(lineItemWith1.quantity).toBe(1)
    })

    it(`"subtotal" calculates subtotal for a LineItem`, () => {
        const price = 14.97
        const quantity1 = fixtures.getLineItem({ quantity: 1, price })
        expect(subtotal(quantity1)).toBe(price)
        const quantity3 = fixtures.getLineItem({ quantity: 3, price })
        expect(subtotal(quantity3)).toBe(Math.round(price * 3 * 100) / 100)
    })
})
