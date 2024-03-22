/**
 * NOTE: (rafael@fiska.com) This file is a copy of the public Payment SDK Api.
 *       The Payment SDK Repository is private, so we don't have a simple way
 *       to access it from this repository that is publicly shared.
 */

/**
 * An {@link https://en.wikipedia.org/wiki/IETF_language_tag IETF language tag}
 * of the language and region used to localize user interface and error messages.
 */
export type Locale = 'en-us'

/**
 * A three-letter ISO 4217 alpha-3 currency code used for currency rendering
 * in user interfaces and Sdk messages. List of supported currencies.
 */
export type Currency = 'CAD' | 'USD'

/**
 * A `TransactionRequest` accepts an optional `printMode`.
 * If `TransactionResponse.printMode` is set to 'printOnEcr', then the PaymentSdk will
 * attempt to return a `TransactionResponse.receipts` with a list of `ReceiptData`.
 */
export type PrintMode = 'printOnTerminal' | 'printOnEcr'

/**
 * Payment Sdk
 */
export type PaymentSdk = {
    /**
     * Initialize a Payment Bridge instance
     *
     * @param config Bridge Configuration Settings
     * @param bridgeOptions Optional Bridge Options
     */
    bridge(
        config: BridgeConfig,
        bridgeOptions?: BridgeOptions,
    ): BridgeWithAssistant
}

/**
 * Payment Bridge Configuration
 */
export type BridgeConfig = {
    /**
     * The unique identifier for the merchant. This is the same identifier
     * that you provided when the merchant was onboarded.
     */
    merchantId: string

    /**
     * The identifier for this register. The identifier must be unique within
     * all of the merchant's registers.
     */
    registerId: string

    /**
     * Optional locale setting for this instance of a BridgeConfig
     *
     * @default "en-us"
     */
    locale?: Locale

    /**
     * Optional currency setting for this instance of a BridgeConfig
     * TODO: Changes currency symbol displayed on device?
     *
     * @default "usd"
     */
    currency?: Currency
}

/**
 * Optional Bridge Options
 */
export type BridgeOptions = {
    /**
     * Optional flag to skip success screens when using the UI Assistant.
     * Successful transactions with a balance will still display a screen
     * with a warning mentioning the balance due.
     *
     * @default false
     */
    skipSuccessScreen?: boolean
    /**
     * Optional flag to skip success screens when using the UI Assistant.
     * When set to `true`, will always skip success screens, even if the
     * transaction has a balance due.
     *
     * @default false
     */
    skipSuccessWithBalanceScreen?: boolean
}

/**
 * Payment Bridge with UI Assistant
 */
export type BridgeWithAssistant = PaymentBridge & {
    assist: AssistModule
}

/**
 * Payment Bridge
 *
 * Direct interface to integrated commerce functionality
 */
export type PaymentBridge = {
    /**
     * Get Readiness Status
     */
    getStatus(): Promise<StatusResult>

    /**
     * Get Payment Bridge Download URLs
     */
    getBridgeDownloadUrls(): Promise<DownloadLinks>

    /**
     * Get list of available terminals
     */
    getAvailableTerminals(): Promise<TerminalsResponse>

    /**
     * Run a Transaction on specified terminal
     *
     * @param transactionRequest Transaction request details
     */
    runTransaction(
        transactionRequest: TransactionRequest,
    ): Promise<TransactionResponse>
}

/**
 * Payment Bridge UI Assistant Module
 */
export type AssistModule = {
    /**
     * Run a Transaction with a UI assistance
     *
     * @param assistedTransactionRequest Transaction request without a terminalId
     */
    runTransaction(
        assistedTransactionRequest: AssistedTransactionRequest,
    ): Promise<TransactionResponse>
}

/**
 * Terminal Device
 */
export type Terminal = {
    /**
     * Terminal Device Type
     */
    deviceType: string

    /**
     * Terminal Identifier
     */
    terminalId: string

    /**
     * Terminal MAC Address
     */
    macAddress: string

    /**
     * Merchant ID associated with Terminal
     */
    merchantId?: string

    /**
     * Register IDs associated with Terminal
     */
    registerIds?: string[]

    /**
     * Payment processor associated with Terminal
     */
    processor?: string

    /**
     * Date time stamp of last Terminal event
     */
    lastSeen?: string
}

/**
 * Terminal collection response
 */
export type TerminalsResponse = {
    /**
     * Array of available Terminals
     */
    availableTerminals: Terminal[]
}

/**
 * Supported Transaction Types
 */
export type TransactionType = 'SALE' | 'REFUND' | 'VOID'

/**
 * Transaction Request
 */
export type TransactionRequest =
    | SaleTransactionRequest
    | VoidTransactionRequest
    | RefundTransactionRequest

export type AssistedTransactionRequest =
    | Omit<SaleTransactionRequest, 'terminalId'>
    | Omit<VoidTransactionRequest, 'terminalId'>
    | Omit<RefundTransactionRequest, 'terminalId'>

/**
 * Transaction Options
 */
type TransactionOptions = {
    /**
     * Optional PrintMode
     */
    printMode?: PrintMode
}

/**
 * Sale Transaction Request
 */
export type SaleTransactionRequest = TransactionOptions & {
    /**
     * Transaction Type, Sale
     */
    type: 'SALE'

    /**
     * Transaction amount in smallest currency denomination
     */
    amount: number

    /**
     * Identifier of terminal on which to run transaction
     */
    terminalId: string
}

/**
 * Void Transaction Request
 */
export type VoidTransactionRequest = TransactionOptions & {
    /**
     * Transaction Type, Void
     */
    type: 'VOID'

    /**
     * Reference number for transaction in reference
     */
    referenceNumber: string

    /**
     * Identifier of terminal on which to run transaction
     */
    terminalId: string
}

/**
 * Return Transaction Request
 */
export type RefundTransactionRequest = TransactionOptions & {
    /**
     * Transaction Type, Refund
     */
    type: 'REFUND'

    /**
     * Transaction amount in smallest currency denomination
     */
    amount: number

    /**
     * Identifier of terminal on which to run transaction
     */
    terminalId: string
}

/**
 * Transaction Response
 */
export type TransactionResponse = {
    /**
     * Transaction Type
     */
    type: TransactionType

    /**
     * Identifier of Terminal on which transaction was run
     */
    terminalId: string

    /**
     * Terminal-specific response code
     */
    terminalCode: string

    /**
     * Attempts to detect the terminal print mode
     */
    terminalPrintMode: TerminalPrintMode

    /**
     * Original requested transaction amount
     */
    requestedAmount: number

    /**
     * Approved transaction amount
     */
    approvedAmount: number

    /**
     * Breakdown of the approved amount
     */
    approvedAmountBreakdown: ApprovedAmountBreakdown

    /**
     * Remaining balance to be paid of original requested amount
     */
    balanceAmount: number

    /**
     * When applicable, a string describing the reason why the transaction was declined
     */
    declineDescription: string | null

    /**
     * Reference code of the transaction
     */
    referenceNumber: string | null

    /**
     * A numerical code representing the transaction outcome.
     */
    resultCode: TransactionResponseId | TransactionErrorId

    /**
     * A message describing the resultCode in more details (e.g. "User cancelled the operation successfully.")
     */
    resultDescription: string

    /**
     * A list of all terminal responses received during the transaction
     */
    terminalResponses: TerminalResponse[]

    /**
     * A list of all receipt related data received during the transaction.
     * This field is only present if `TransactionRequest.printMode` was set to `printOnEcr`.
     */
    receipts: ReceiptData[]
}

/**
 * Represents responses sent by terminals during transactions
 */
export type TerminalResponse = {
    cardType: CardType | null
    invoiceNumber: string | null
    referenceNumber: string | null
    terminalCode: string
    declineDescription: string | null
    resultCode: TransactionResponseId | TransactionErrorId

    // From the Amount Breakdown, if present
    amountDue: number
    cashbackAmount: number
    surchargeAmount: number
    taxAmount: number
    tipAmount: number
    totalAmount: number
}

/**
 * The print mode detected in the terminal device.
 */
export type TerminalPrintMode = 'printOnTerminal' | 'printOnEcr' | 'unknown'

/**
 * Represents the data available for integrators to print transaction receipts.
 * This field is only present if `terminalPrintMode` is set to `printOnEcr`.
 */
export type ReceiptData = {
    cardType: CardType | null
    cardEntryMode: CardEntryMode | null
    accountType: string | null
    batchNumber: string | null
    sequenceNumber: number | null
    retrievalReferenceNumber: string | null
    cvvResult: string | null
    avsResult: string | null
    authorizationCode: string | null
    trace: string | null
    maskedCardNumber: string | null
    expirationDate: string | null
    cardholderName: string | null
    hostResponseText: string | null
    hostResponseCode: string | null
    customerVerificationMethod: CustomerVerificationMethod | null
    emvApplicationLabel: string | null
    emvAid: string | null
    emvTvr: string | null
    emvTsi: string | null
    emvAac: string | null
    emvTc: string | null
}

export type CardType =
    | 'UNKNOWN'
    | 'DEBIT'
    | 'VISA'
    | 'MASTERCARD'
    | 'AMEX'
    | 'DINERS'
    | 'DISCOVER'
    | 'JCB'
    | 'UNIONPAY'
    | 'OTHER'
    | 'GIFT'
    | 'CASH'
    | 'EBT'

export type CardEntryMode = 'UNKNOWN' | 'SWIPED' | 'DIPPED' | 'TAPPED' | 'KEYED'

export type CustomerVerificationMethod =
    | 'UNKNOWN'
    | 'NONE'
    | 'PIN'
    | 'SIGNATURE'
    | 'PIN_SIGNATURE'

/**
 * Approved Amount Breakdown
 */
export type ApprovedAmountBreakdown = {
    /**
     * Tax Amount
     */
    taxAmount: number

    /**
     * Tip Amount
     */
    tipAmount: number

    /**
     * Cash Back Amount
     */
    cashbackAmount: number

    /**
     * Surcharge Amount
     */
    surchargeAmount: number

    /**
     * Transaction Amount
     */
    transactionAmount: number
}

/**
 * Status Result
 *
 * Returned by getStatus() to indicate the readiness of all integrated components
 * It has 2 representations:
 *      1. isReady is set to true and statusFaults is an empty array
 *      2. isReady is set to false and statusFaults contains an non empty array
 */
export type StatusResult =
    | { isReady: true; statusFaults: [] }
    | { isReady: false; statusFaults: StatusFaults }

/**
 * Status Fault Information
 *
 * Includes a StatusFaultCode as the id and a message describing the fault
 */
export type StatusFault = {
    id: StatusFaultId
    message: string
}

/**
 * Represents a non Empty array of StatusFaults
 */
export type StatusFaults = [StatusFault, ...StatusFault[]]

/**
 * Payment Bridge Download Links by OS
 */
export type DownloadLinks = {
    mac: string // Download URL for macOS Payment Bridge
    windows: string // Download URL for windows Payment Bridge
}

/**
 * SDKErrorId is an expansion of all error ID values
 */
export type SdkErrorId = TransactionErrorId | BridgeErrorId | UnknownErrorId

/**
 * Sdk Error
 *
 * Includes an SdkErrorCode as the id and a message describing the error
 */
export type SdkError = Error & { id: SdkErrorId }

/**
 * LIST OF APPLICATION UNIQUE IDS
 */

/**
 * Transaction Error Ids
 */
export type TransactionErrorId =
    | 1003 // NO_TERMINALS_AVAILABLE
    | 1004 // NO_TERMINAL_PAIRED
    | 1005 // MISSING_TERMINAL
    | 3000 // GENERAL_INTERNAL_ERROR
    | 3002 // REFERENCE_CODE_REJECTED_BY_TERMINAL
    | 3005 // FAILED_COMMUNICATION_ERROR
    | 3006 // FAILED_BATTERY_LOW
    | 3009 // CONNECTION_LOST_WITH_TERMINAL
    | 3010 // FAILED_TRANSACTION_TIMED_OUT
    | 3011 // FAILED_TRANSACTION_INVALID_REQUEST
    | 3012 // INVALID_TERMINAL_ID
    | 3013 // EXCEEDING_AMOUNT
    | 3020 // UNKNOWN_TRANSACTION_RESULT

/**
 * Transaction Response Ids
 */
export type TransactionResponseId =
    // Successful Transaction Result Codes
    | 0 // SUCCESS
    | 1 // USER_CANCELLED
    | 2 // BATCH_EMPTY
    | 3 // RECEIPT_MESSAGE
    | 4 // SUCCESS_W_BALANCE

    // Terminal Not Ready Result Codes
    | 1200 // FAILED_GENERAL
    | 1201 // ADMIN_MODE
    | 1204 // FAILED_COULD_NOT_BE_COMPLETED
    | 1999 // FAILED_OTHER_ERROR

    // Transaction Declined Result Codes
    | 2200 // DECLINED_GENERAL
    | 2203 // DECLINED_BY_MERCHANT
    | 2204 // DECLINED_TIMED_OUT

/**
 * Status Fault Ids
 */
export type StatusFaultId =
    | 1000 // BRIDGE_NOT_FOUND
    | 1001 // BRIDGE_UNAVAILABLE
    | 1002 // BRIDGE_NOT_READY
    | 3001 // UNINITIALIZED_MERCHANT
    | 1008 // BRIDGE_UPDATING

/**
 * Bridge-specific Error Ids
 */
export type BridgeErrorId = 9998 // STATUS_NOT_READY

/**
 * Unknown Error Id
 *
 * The constant value of 9999 for use in all unknown error conditions
 */
export type UnknownErrorId = 9999 // UNKNOWN
