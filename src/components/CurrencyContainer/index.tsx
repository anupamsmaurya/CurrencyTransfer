import CurrencyAmount from '../CurrencyAmount'
import {CurrencyContainerType, ExchangeType} from '../../types/TypeDefinitions'
import CurrencySymbolMap from '../../utilities/CurrencySymbols'
import { useContext, useLayoutEffect, useRef } from 'react'
import { handleUserInput, updateCurrency } from '../../store/actionCreators'
import { store } from '../../store/contextStore'
import styles from './index.css'

interface Props {
    config: CurrencyContainerType,
    balance: number
}

/**
 * Container component for both Source and Target entities.
 */
const CurrencyContainer: React.FC<Props> = ({config: {currency, exchangeType, amount}, balance}) => {
    const {dispatch, state:{rates, sourceCurrency, targetCurrency, wallet}} = useContext(store);

    const intialSlideRef = useRef<HTMLDivElement>(null)
    /**
     * Slides in the active currency container into the view
     * if it is not the first one. Runs on mount only.
     */
    useLayoutEffect(()=>{
        if(null !== intialSlideRef.current) {
            intialSlideRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    },[])

    /**
     * Triggers currency conversion when user enters any value. 
     * It is called on every keystroke. Action is dispatched to reducer and
     * target field amount is updated.
     * @param input amount entered for transfer
     */
    const handleInputCallback = (input: number) => {
        dispatch(
            handleUserInput(input, exchangeType, sourceCurrency, targetCurrency, wallet, rates)
        )        
    }

    /**
     * This function is called when user selects any different 
     * currency(for each of the two sections). If user has already
     * entered any amount then currency conversion is also triggerred.
     * @param newCurrency New currency type selected by user.
     */
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
    }

    const balanceInfo = `You have ${CurrencySymbolMap[currency].symbol} ${balance}`
    const currencyOptions = Object.keys(wallet)

    //currency selector links on top
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

    //currency container slides for each currency
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