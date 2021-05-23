import { useContext, useState } from 'react'
import CurrencyContainer from '../../components/CurrencyContainer'
import { store } from '../../store/contextStore'
import { handleTransfer } from '../../store/actionCreators'
import styles from './index.css'

const ExchangeScreen = () => {

    const { state: { balanceError, sourceCurrency, targetCurrency, wallet, rates }, dispatch } = useContext(store);
    console.log('app store:', sourceCurrency, targetCurrency, wallet)

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
                    disabled={balanceError} 
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