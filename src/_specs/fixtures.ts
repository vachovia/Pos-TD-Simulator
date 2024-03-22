import { defaultIndustry } from '../resources/industries'
import { Product } from '../entities/product'
import { LineItem } from '../entities/line-item'

export const fixtures = {
    getProduct,
    getLineItem,
}

// Implementation

function getProduct(overrides: Partial<Product> = {}): Product {
    return {
        ...defaultIndustry.items[0],
        ...overrides,
    }
}

function getLineItem(overrides: Partial<LineItem> = {}): LineItem {
    return {
        quantity: 1,
        ...defaultIndustry.items[0],
        ...overrides,
    }
}
