import { Currency, ExchangeType, CurrencyContainerType } from "../types/TypeDefinitions"
import initialWallet from "../utilities/initialWallet"

const initialState = {
    rates: {},
    wallet: initialWallet,
    sourceCurrency: {
        currency: Currency.EUR,
        exchangeType: ExchangeType.SOURCE,
        amount: ''
    } as CurrencyContainerType,
    targetCurrency: {
        currency: Currency.GBP,
        exchangeType: ExchangeType.TARGET,
        amount: ''
    } as CurrencyContainerType
}

export default initialState