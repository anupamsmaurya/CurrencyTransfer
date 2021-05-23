import { useContext } from 'react'
import CurrencyContainer from '../../components/CurrencyContainer'
import { store } from '../../store/contextStore'
import { handleTransfer } from '../../store/actionCreators'
import styles from './index.css'

/**
 * Exhcnage screen layout component.
 * Loads both source and target components ans Transfer button
 */
const ExchangeScreen = () => {

    const { state: { balanceError, sourceCurrency, targetCurrency, wallet }, dispatch } = useContext(store);

    const disabledButton = balanceError || (sourceCurrency.currency === targetCurrency.currency)

    const initiateTransfer = () => {
        dispatch(
            handleTransfer(sourceCurrency, wallet)
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
            {balanceError && <div style={styles.errorMsg}>Insufficient balance for this amount</div>}
            {
                sourceCurrency.amount &&
                <button 
                    style={styles.transferButton}
                    disabled={disabledButton} 
                    onClick={initiateTransfer}
                    name='transfer'
                >
                    Transfer
                </button>
            }
        </div>
    )
}

export default ExchangeScreen