import * as React from 'react'

interface DataListItem {
    value: string
    label?: string
}

interface Props {
    id: string
    datalist: DataListItem[]

    icon?: JSX.Element
    placeholder?: string
    defaultValue?: string
}
export class DataList extends React.PureComponent<Props> {
    public static defaultProps = {
        datalist: [],
    }

    public render() {
        const { id, defaultValue, placeholder } = this.props
        return (
            <div className="datalist">
                {this.props.icon}
                <input
                    list={id}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                />
                <datalist id={id}>
                    {this.props.datalist.map(DataList.Option)}
                </datalist>
            </div>
        )
    }

    public static Option(item: DataListItem): JSX.Element {
        return (
            <option key={item.value} value={item.value}>
                {item.label}
            </option>
        )
    }
}
