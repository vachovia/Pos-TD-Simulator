import * as React from 'react'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { Cart, cartModule } from '../entities/cart'
import { Routes } from '../components/navigation'
import { PageContainer } from '../components/page-container'
import { IntegrationsContext } from '../contexts/integrations.context'
import {
    IntegrationType,
    PreferencesContext,
} from '../contexts/preferences.context'
import { useNavigate } from 'react-router-dom'
import { LinkedOperations } from '../components/linked-operations'
import { DataList } from '../components/data-list'
import { Hotkeys } from '../components/hotkeys'
import { OperationTable } from '../components/operation-table'
import { SingleSelect } from '../components/single-select'
import { Product } from '../entities/product'
import { LineItem } from '../entities/line-item'
import { Loader } from '../components/loader'
import { DeprecatedOperation, sdkModule } from '../modules/sdk.module'
import { TransactionType } from '../types'
import { IconsModule } from '../resources/icons.module'

const { total, toCents } = cartModule

enum OperationType {
    SALE = 'SALE',
    REFUND = 'REFUND',
    VOID = 'VOID',
}

enum OperationMethod {
    card = 'card',
    cash = 'cash',
}

enum SaleStatus {
    Ongoing = 'ongoing',
    Submitting = 'submitting',
    Success = 'success',
    Failure = 'failure',
}

enum OperationMode {
    DEFAULT,
    LINKED,
}

type State = {
    cart: Cart
    status: SaleStatus
    type: OperationType
    method: OperationMethod
    mode: OperationMode
    statusError?: string
}

const initialState: State = {
    cart: [],
    status: SaleStatus.Ongoing,
    type: OperationType.SALE,
    method: OperationMethod.card,
    mode: OperationMode.DEFAULT,
}

export const Sales = () => {
    const navigate = useNavigate();
    const { isValidIntegration, integration } = useContext(PreferencesContext)
    const { handleTransaction } = useContext(IntegrationsContext)

    useEffect(() => {
        if (integration.type !== IntegrationType.SDK) return

        /**
         * NOTE: (rafael@fiska.com) Calling resolveSdk here to front-load the
         *       Sdk initialization with the Sales component, just in case
         *       someone wants to use the Sdk from the Browser's console.
         */
        const _ignored = sdkModule.resolveSdkLoader(integration.sdkLoaderUrl)
    }, [integration])

    const [state, setState] = useState<State>(initialState)
    const { cart, status, type, method, mode, statusError } = state

    if (!isValidIntegration()) {
        // history.replace(Routes.preferences)
        navigate(Routes.preferences, { replace: true });
        return null;
    }

    function updateState(partialState: Partial<State>): void {
        setState(previousState => ({ ...previousState, ...partialState }))
    }

    /* generic helper to update a single state entry. Examples:
     * updateStateEntry('type', OperationType.SALE) // to update the entry <type>
     * updateStateEntry.bind(null, 'type')(OperationType.SALE) // partially applied */
    function updateStateEntry<K extends keyof State, V>(key: K, value: V) {
        updateState({ [key]: value })
    }

    const updateMode = (mode: OperationMode) => () =>
        setState(prevState => ({ ...prevState, mode }))

    function submitOperation(operation: DeprecatedOperation) {
        return handleTransaction(operation)
            .then(resetOperation)
            .catch(error => {
                console.warn('operation failed: ', error)
                updateState({ status: SaleStatus.Ongoing })
            })
    }

    return (
        <PageContainer
            path="/sales"
            title="Point of Sale"
            className="operation"
        >
            {mode === OperationMode.LINKED && (
                <LinkedOperations
                    amount={toCents(total(cart))}
                    onCancel={updateMode(OperationMode.DEFAULT)}
                    onSubmit={submitOperation}
                />
            )}
            <aside className="operation__aside">
                <div className="l-section">
                    <DataList
                        id="customer"
                        icon={<IconsModule.Users />}
                        placeholder="Customer's Name"
                    />
                </div>
                <div className="l-section">
                    <DataList
                        id="search"
                        icon={<IconsModule.MagnifyingGlass />}
                        placeholder="Search or Scan Item"
                    />
                </div>
                <Hotkeys onClick={lineItemAdd} />
            </aside>
            <form className="operation__form" onSubmit={handleSubmit}>
                <OperationTable cart={cart} onLineItemRemove={lineItemRemove} />
                <div className="operation__options l-container">
                    <div>
                        <SingleSelect
                            name="operation-type"
                            legend="Operation Type"
                            onChange={updateStateEntry.bind(null, 'type')}
                            defaultChecked={OperationType.SALE}
                            options={[
                                { id: OperationType.SALE, label: 'Sale' },
                                { id: OperationType.REFUND, label: 'Refund' },
                            ]}
                        >
                            {integration.type === IntegrationType.SDK && (
                                <button
                                    type="button"
                                    onClick={updateMode(OperationMode.LINKED)}
                                    className="btn--text"
                                >
                                    Linked Operations <IconsModule.Link />
                                </button>
                            )}
                        </SingleSelect>
                    </div>
                    <SingleSelect
                        name="operation-method"
                        legend="Operation Method"
                        onChange={updateStateEntry.bind(null, 'method')}
                        defaultChecked={OperationMethod.card}
                        options={[
                            { id: OperationMethod.card, label: 'Credit/Debit' },
                            { id: OperationMethod.cash, label: 'Cash' },
                        ]}
                    />
                </div>
                <FormActions />
            </form>
            <footer className="operation__ctas">
                <button className="btn--text">
                    <IconsModule.Archive />
                    &ensp;Park Sale
                </button>
                <button className="btn--text-del" onClick={resetOperation}>
                    <IconsModule.Trash />
                    &ensp;Discard Sale
                </button>
            </footer>
        </PageContainer>
    )

    function lineItemAdd(product: Product) {
        updateState({ cart: cartModule.add(cart, product) })
    }

    function lineItemRemove(lineItem: LineItem) {
        updateState({ cart: cartModule.remove(cart, lineItem) })
    }

    function resetOperation() {
        updateState({
            cart: [],
            status: SaleStatus.Ongoing,
            mode: OperationMode.DEFAULT,
        })
    }

    function FormActions() {
        const Action = {
            [SaleStatus.Ongoing]: Ongoing,
            [SaleStatus.Success]: Success,
            [SaleStatus.Failure]: Failure,
            [SaleStatus.Submitting]: Submitting,
        }[status]

        return (
            <div className={`operation__status ${status}`}>
                <div className="operation__status-container l-section">
                    <Action />
                </div>
            </div>
        )

        function Ongoing(): JSX.Element {
            const isRefund = type === OperationType.REFUND
            const classModifier = isRefund ? '-del' : '-ok'
            const label = isRefund ? 'Refund' : 'Pay'

            return (
                <React.Fragment>
                    <button
                        autoFocus
                        type="submit"
                        className={`btn--large${classModifier}`}
                        disabled={!cart.length}
                    >
                        {label}
                    </button>
                    <span className="operation__amount">${total(cart)}</span>
                </React.Fragment>
            )
        }

        function Success(): JSX.Element {
            return (
                <React.Fragment>
                    <div className="operation__result">
                        <IconsModule.Check />
                        <div>
                            <h4>Operation Success</h4>
                        </div>
                    </div>
                    <button onClick={resetOperation}>
                        Start New Operation
                    </button>
                </React.Fragment>
            )
        }

        function Failure(): JSX.Element {
            return (
                <React.Fragment>
                    <div className="operation__result">
                        <IconsModule.Cross />
                        <div>
                            <h4>Operation Failed</h4>
                            <span className="operation__error">
                                {statusError}
                            </span>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Retry</button>
                        <button onClick={cancelOperation}>
                            Cancel Operation
                        </button>
                    </div>
                </React.Fragment>
            )

            function cancelOperation() {
                updateState({ status: SaleStatus.Ongoing })
            }
        }

        function Submitting(): JSX.Element {
            return (
                <React.Fragment>
                    <button className="btn--text">
                        <Loader />
                    </button>
                    <span>Processing Operation...</span>
                </React.Fragment>
            )
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        switch (method) {
            case OperationMethod.cash:
                return updateState({ status: SaleStatus.Success })

            case OperationMethod.card:
                return submitOperation({
                    amount: toCents(total(cart)), // The operation needs cents, the POS simulator uses dollars
                    type: type as TransactionType,
                })
        }
    }
}
