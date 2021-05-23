import CurrencyAmount from '../CurrencyAmount'
import {CurrencyContainerType, ExchangeType} from '../../types/TypeDefinitions'
import CurrencySymbolMap from '../../utilities/CurrencySymbols'
import { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { handleUserInput, updateCurrency } from '../../store/actionCreators'
import { store } from '../../store/contextStore'
import styles from './index.css'

interface Props {
    config: CurrencyContainerType,
    balance: number
}

const CurrencyContainer: React.FC<Props> = ({config: {currency, exchangeType, amount}, balance}) => {
    const {dispatch, state:{rates, sourceCurrency, targetCurrency, wallet}} = useContext(store);

    const intialSlideRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(()=>{
        if(null !== intialSlideRef.current) {
            intialSlideRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    },[])

    const handleInputCallback = (input: number) => {
        dispatch(
            handleUserInput(input, exchangeType, sourceCurrency, targetCurrency, wallet, rates)
        )        
    }

    const handleCurrencySwitch = (newCurrency: string) => {
        dispatch(updateCurrency(newCurrency,exchangeType))
        setTimeout(() => {
            if(exchangeType === ExchangeType.SOURCE) {
                const newSource = {...sourceCurrency, currency: newCurrency}
                dispatch(
                    handleUserInput(+amount, exchangeType, newSource, targetCurrency, wallet, rates)
                )        
            } else {
                let newTarget = {...targetCurrency, currency: newCurrency}
                dispatch(
                    handleUserInput(+amount, exchangeType, sourceCurrency, newTarget, wallet, rates)
                )            
            }
        }, 0)
        
        
        //handleInputCallback(+amount)
    }

    const balanceInfo = `You have ${CurrencySymbolMap[currency].symbol} ${balance}`
    const currencyOptions = Object.keys(wallet)
    const anchors = currencyOptions.map((option: string) => {
        const active = option === currency
        return (
            <a
                key={option} 
                href={`#${option}${exchangeType}`} 
                onClick={()=> handleCurrencySwitch(option)}
                className={active?'active slide-head':'slide-head'}                                
            >
                {option}
            </a>
        )        
    })
    const slides = currencyOptions.map((option: string) => {
        const active = option === currency
        
        return (
            <div id={`${option}${exchangeType}`} key={option} {...(active ? {ref: intialSlideRef} : {})}>
                <div style={styles.exchangeContainer}>
                    <div style={styles.currencyInfo}>
                        <div style={styles.currencyLabel}>{option}</div>
                        <div>
                            {balanceInfo}
                        </div>
                    </div>
                    <div style={styles.inputContainer}>
                        {exchangeType === ExchangeType.SOURCE ? '-' : '+'}
                        <CurrencyAmount
                            amount={amount}
                            balance={balance}
                            inputCallback={handleInputCallback}
                            testId = {option+exchangeType}
                        />
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="slider">
            <div>
                {anchors}
            </div>
            
            <div className="slides">
                {slides}
            </div>                
        </div>
    )
}

export default CurrencyContainer