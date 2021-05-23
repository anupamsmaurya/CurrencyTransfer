import styles from './index.css'

interface Props {
    balance: number,
    amount: number | string,
    inputCallback: (input: number) => void,
    testId: string
}

const CurrencyAmount: React.FC<Props> = ({testId, amount, inputCallback}) => {
    const inputRegex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        if(inputRegex.test(input) || input.length === 0) {
            inputCallback(+input)
        }        
    }

    return (
        <div>
            <input 
                value={amount} 
                onChange={handleChange} 
                style={styles.input} 
                data-testid={testId}
            />
        </div>
    )
}

export default CurrencyAmount