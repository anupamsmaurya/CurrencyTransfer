import { ExchangeType } from "../types/TypeDefinitions"
import * as actions from './actionTypes'

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actions.FETCH_RATES:
            console.log('data:', action.data.rates)
            return { ...state, rates: action.data?.rates }
        case actions.HANDLE_INPUT:
            console.log(action, state.wallet)
            return {
                ...state,
                sourceCurrency: {
                    ...state.sourceCurrency,
                    amount: action.sourceAmount
                },
                targetCurrency: {
                    ...state.targetCurrency,
                    amount: action.targetAmount
                },
                balanceError: action.balanceError
            }
        case actions.INTIATE_TRANSFER:
            const newSourceBalance = state.wallet[state.sourceCurrency.currency] - state.sourceCurrency.amount
            const newTargetBalance = state.wallet[state.targetCurrency.currency] + state.targetCurrency.amount
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    [state.sourceCurrency.currency]: +newSourceBalance.toFixed(2),
                    [state.targetCurrency.currency]: +newTargetBalance.toFixed(2)
                },
                sourceCurrency: {
                    ...state.sourceCurrency,
                    amount: ''
                },
                targetCurrency: {
                    ...state.targetCurrency,
                    amount: ''
                }
            }
        case actions.UPDATE_CURRENCY:
            if(action.exchangeType === ExchangeType.SOURCE) {
                return {
                    ...state,
                    sourceCurrency: {
                        ...state.sourceCurrency,
                        currency: action.currency,
                        amount: 0
                    },
                    targetCurrency: {
                        ...state.targetCurrency,
                        amount: 0
                    }
                }    
            } else {
                return {
                    ...state,
                    sourceCurrency: {
                        ...state.sourceCurrency,
                        amount: ''
                    },
                    targetCurrency: {
                        ...state.targetCurrency,
                        currency: action.currency,
                        amount: ''
                    }
                }    
            }
        default:
            return state;
    }
};
