export enum Currency {
    GBP = "GBP",
    USD = "USD",
    EUR = "EUR"
}

export enum ExchangeType {
    SOURCE,
    TARGET
}

export type CurrencyContainerType = {
    currency: Currency,
    exchangeType: ExchangeType,
    amount: number | string
}

export type WalletType = {
    [Currency.EUR] : number,
    [Currency.GBP] : number,
    [Currency.USD] : number
}

export interface RatesType {
    [key: string]: number
}