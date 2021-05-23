import { Currency, RatesType } from "../types/TypeDefinitions"

/**
 * Converts amount to other currency based on exchange rates fetched from open API
 * @param currency source currency
 * @param amount source amount
 * @param convertTo target currency
 * @param exchangeRates conversion rates
 * @returns converted amount in target currency
 */
const converter = (currency: Currency, amount: number, convertTo: Currency, exchangeRates: RatesType) => {
    return parseFloat(((exchangeRates[convertTo]/exchangeRates[currency]) * amount).toFixed(2))
}

export default converter