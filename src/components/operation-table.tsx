import * as React from 'react'
import { LineItem, lineItemModule } from '../entities/line-item'
import { Cart, cartModule } from '../entities/cart'
import { IconsModule } from "../resources/icons.module";

interface Props {
    cart: Cart
    onLineItemRemove: (lineItem: LineItem) => void
}
export class OperationTable extends React.PureComponent<Props> {
    public render() {
        return (
            <div className="table__container">
                <table className="table">
                    <tbody>
                        <OperationTable.Header />
                        {this.props.cart.map(this.Row)}
                    </tbody>
                </table>
                <OperationTable.Summary
                    total={cartModule.total(this.props.cart)}
                />
            </div>
        )
    }

    private Row = (lineItem: LineItem): JSX.Element => {
        const clickHandler = () => this.props.onLineItemRemove(lineItem)
        const { name, price } = lineItem

        return (
            <tr key={name} className="table__row">
                <td>{name}</td>
                <td className="table__data--currency">{price}</td>
                <td>{lineItem.quantity}</td>
                <td>–</td>
                <td className="table__data--currency">
                    {lineItemModule.subtotal(lineItem)}
                </td>
                <td onClick={clickHandler}>
                    <button className="btn--text-del" type="button">
                        <IconsModule.Trash />
                    </button>
                </td>
            </tr>
        )
    }

    private static Header = (): JSX.Element => (
        <tr>
            <th>Item</th>
            <th className="table__data--currency">Price</th>
            <th>Qty.</th>
            <th>Disc.</th>
            <th className="table__data--currency">Subtotal</th>
            <th />
        </tr>
    )

    private static Summary = ({ total }: { total: number }): JSX.Element => {
        return (
            <footer className="table__summary">
                <p className="table__summary-line">
                    <span>Subtotal</span>
                    <span>${total}</span>
                </p>
                <p className="table__summary-line">
                    <span>Discount</span>
                    <span>- $0</span>
                </p>
                <p className="table__summary-line">
                    <span>Total</span>
                    <span>${total}</span>
                </p>
            </footer>
        )
    }
}
