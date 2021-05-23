import { CurrencyContainerType, ExchangeType, RatesType } from "../types/TypeDefinitions";
import CurrencyConverter from '../utilities/currencyConverter'
import * as actions from './actionTypes'

/**
 * Updates current currency to a new one selected by user
 * @param currency New currency
 * @param exchangeType source or target
 */
export const updateCurrency = (currency: string, exchangeType: ExchangeType) => {
    return {
        type: actions.UPDATE_CURRENCY,
        currency,
        exchangeType
    }
}

export const fetchExchangeRates = (data: any) => ({
    type: actions.FETCH_RATES,
    data
});

/**
 * Handles user entered amount and updates the other field(source or target)
 * @param amount amount entered by user
 * @param type source or target
 * @param sourceCurrency current source object from store
 * @param targetCurrency current target object from store
 * @param wallet current wallet balances from store
 * @param rates last fetched exchange rates from store
 */
export const handleUserInput = (
        amount: number, 
        type: ExchangeType, 
        sourceCurrency: CurrencyContainerType, 
        targetCurrency: CurrencyContainerType, 
        wallet: RatesType,
        rates: RatesType
    ) => {

    let balanceError = false;
    let sourceAmount, targetAmount

    if (type === ExchangeType.SOURCE) {
        const targetValue = CurrencyConverter(sourceCurrency.currency, amount, targetCurrency.currency, rates);
        sourceAmount = amount
        targetAmount = targetValue
    } else {
        const sourceValue = CurrencyConverter(targetCurrency.currency, amount, sourceCurrency.currency, rates);
        sourceAmount = sourceValue
        targetAmount = amount
    }
    if (wallet[sourceCurrency.currency] - sourceAmount < 0) {
        balanceError = true;
    }
    return {
        type: actions.HANDLE_INPUT,
        balanceError,
        sourceAmount: sourceAmount || '',
        targetAmount: targetAmount || '' 
    }
}

export const handleTransfer = (
    sourceCurrency: CurrencyContainerType,
    wallet: RatesType
) => {
    //Validating again so that if user enables a disabled transfer button from devtools
    if (wallet[sourceCurrency.currency] - (+sourceCurrency.amount) < 0) {
        //handle violation
        return
    }

    return {
        type: actions.INTIATE_TRANSFER
    }

}
