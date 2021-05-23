import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Currency, CurrencyContainerType, ExchangeType } from './types/TypeDefinitions';
import initialWallet from './utilities/initialWallet';
import CurrencyConverter from './utilities/currencyConverter';
import userEvent from '@testing-library/user-event';

window.HTMLElement.prototype.scrollIntoView = jest.fn

const initialState = {
    rates: {
        "EUR": 0.821018,
        "GBP": 0.706689,
        "USD": 1
      },
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

test('renders currency header', () => {
    render(<App />);
    screen.getAllByRole('link',{name: "EUR"})
});

test('avoids invalid input', () => {
    render(<App />);
    
    const input = screen.getByTestId("EUR0")

    expect(input.value).toBe('')

    fireEvent.change(input, { target: { value: 'abc' } })
    expect(input.value).toBe('')

});

/* test('rounds off floating numbers', () => {
    render(<App />);
    
    const input = screen.getByTestId("EUR0")

    userEvent.type(input, '2.3434')

    expect(input.value).toBe('2.34')

}); */

test('shows Transfer Button after input', async() => {
    render(<App />);
    const {sourceCurrency} = initialState
    const sourceInput = screen.getByTestId(`${sourceCurrency.currency}${sourceCurrency.exchangeType}`)
    expect(screen.queryByRole('button', {name: /transfer/i})).not.toBeInTheDocument()
    userEvent.type(sourceInput, '20')
    const button = await screen.findByRole('button', {name: /transfer/i})
    expect(button).toBeVisible()
});

test('converts source currency to target', async() => {
    const {sourceCurrency, targetCurrency, rates} = initialState
    render(<App />);   
    const sourceInput = screen.getByTestId(`${sourceCurrency.currency}${sourceCurrency.exchangeType}`)
    
    const amount = 2
    userEvent.type(sourceInput, `${amount}`)
    const targetValue = CurrencyConverter(sourceCurrency.currency, amount, targetCurrency.currency, rates);
    
    await waitFor(() => {
        console.log("targetValue: ", targetValue, " targetCurrency:",targetCurrency)
        const targetInput = screen.getByTestId(`${targetCurrency.currency}${targetCurrency.exchangeType}`)
        console.log('after input:', sourceInput.value, targetInput.value)
        expect(targetInput.value).toBe(targetValue)
    })


});
  
  