import React, { createContext, useEffect, useReducer } from 'react'
import { reducer } from './reducer'
import { fetchExchangeRates } from './actionCreators'
import getExhangeRatesService from '../services/exchangeRates'
import { Currency, ExchangeType, CurrencyContainerType } from "../types/TypeDefinitions"
import initialWallet from "../utilities/initialWallet"

const initialState :any = {
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

const store = createContext(initialState)
const { Provider } = store

interface Props {
    children: React.ReactNode
}

const StateProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getExhangeRatesService().then(data => dispatch(fetchExchangeRates(data)))
        const interval = setInterval(() => {
            getExhangeRatesService().then(data => dispatch(fetchExchangeRates(data)))
        }, 100000);
        return () => clearInterval(interval);
    }, []);

    return <Provider value={{ state, dispatch }}>{children}</Provider>
};

export { store, StateProvider }