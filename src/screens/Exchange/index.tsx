import { useContext } from 'react'
import CurrencyContainer from '../../components/CurrencyContainer'
import { store } from '../../store/contextStore'
import { handleTransfer } from '../../store/actionCreators'
import styles from './index.css'
import converter from '../../utilities/currencyConverter'
import CurrencySymbolMap from '../../utilities/CurrencySymbols'

/**
 * Exhcnage screen layout component.
 * Loads both source and target components ans Transfer button
 */
const ExchangeScreen = () => {

    const { state: { balanceError, sourceCurrency, targetCurrency, wallet, rates }, dispatch } = useContext(store);

    const disabledButton = balanceError || (sourceCurrency.currency === targetCurrency.currency)

    const initiateTransfer = () => {
        dispatch(
            handleTransfer(sourceCurrency, wallet)
        )
    }

    const displayExchangeRate = () => {
        const targetRate = converter(sourceCurrency.currency, 1, targetCurrency.currency, rates)
        return (
            <div style={styles.exchangeRate}>
                {`${CurrencySymbolMap[sourceCurrency.currency].symbol}1 = ${CurrencySymbolMap[targetCurrency.currency].symbol}${targetRate}`}
            </div>
        )
    }

    return (
        <div>
            <CurrencyContainer
                config={sourceCurrency}
                balance={wallet[sourceCurrency.currency]}
            />
            <div className='divider'></div>
            <CurrencyContainer
                config={targetCurrency}
                balance={wallet[targetCurrency.currency]}
            />
            
            {displayExchangeRate()}

            <div style={styles.actionItems}>
                {balanceError && <div style={styles.errorMsg}>Insufficient balance for this amount</div>}
                {
                    sourceCurrency.amount &&
                    <button 
                        style={styles.transferButton}
                        disabled={disabledButton} 
                        onClick={initiateTransfer}
                        name='exchange'
                    >
                        Exchange
                    </button>
                }
            </div>
        </div>
    )
}

export default ExchangeScreen