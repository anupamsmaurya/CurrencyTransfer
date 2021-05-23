import React, { createContext, useEffect, useReducer } from 'react'
import { reducer } from './reducer'
import { fetchExchangeRates } from './actionCreators'
import getExhangeRatesService from '../services/exchangeRates'
import initialState from './initialState'

//create a context based on initial store values
const store = createContext(initialState)
const { Provider } = store

interface Props {
    children: React.ReactNode
}

/**
 * Provider to serve app with the context and useReducer()
 */
const StateProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    /**
     * Triggers once to fetch exchange rates and 
     * initialise a poll to fetch rates every 10 seconds
     */
    useEffect(() => {
        getExhangeRatesService().then(data => dispatch(fetchExchangeRates(data)))
        const interval = setInterval(() => {
            getExhangeRatesService().then(data => dispatch(fetchExchangeRates(data)))
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return <Provider value={{ state, dispatch }}>{children}</Provider>
};

export { store, StateProvider }