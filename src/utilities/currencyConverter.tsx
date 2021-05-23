import { Currency, RatesType } from "../types/TypeDefinitions"

//**convert amount based om exchange rates fetched from open API */
const converter = (currency: Currency, amount: number, convertTo: Currency, exchangeRates: RatesType) => {
    return parseFloat(((exchangeRates[convertTo]/exchangeRates[currency]) * amount).toFixed(2))
}

export default converter