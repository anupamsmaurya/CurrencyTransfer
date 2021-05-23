import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Currency, CurrencyContainerType, ExchangeType } from './types/TypeDefinitions';
import initialWallet from './utilities/initialWallet';
import CurrencyConverter from './utilities/currencyConverter';
import userEvent from '@testing-library/user-event';
import mockCurrencyData from './mockData';

window.HTMLElement.prototype.scrollIntoView = jest.fn

/* jest.mock('./services/exchangeRates', () => {
    return function() {
      return { getExhangeRatesService: () => Promise.resolve(mockCurrencyData) };
    };
}); */

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

test('shows Exchange Button after input', async() => {
    render(<App />);
    const {sourceCurrency} = initialState
    const sourceInput = screen.getByTestId(`${sourceCurrency.currency}${sourceCurrency.exchangeType}`)
    expect(screen.queryByRole('button', {name: /exchange/i})).not.toBeInTheDocument()
    userEvent.type(sourceInput, '20')
    const button = await screen.findByRole('button', {name: /exchange/i})
    expect(button).toBeVisible()
});

test('shows error on balance overflow and disables Exchange Button', async() => {
    render(<App />);
    const {sourceCurrency} = initialState
    const sourceInput = screen.getByTestId(`${sourceCurrency.currency}${sourceCurrency.exchangeType}`)
    expect(screen.queryByRole('button', {name: /exchange/i})).not.toBeInTheDocument()
    userEvent.type(sourceInput, '101')
    const button = await screen.findByRole('button', {name: /exchange/i})
    const errorMsg = await screen.findByText( /Insufficient balance for this amount/i)
    expect(button).toBeVisible()
    expect(button).toBeDisabled()
    expect(errorMsg).toBeVisible()
});

/* test('converts source currency to target', async() => {
    const {sourceCurrency, targetCurrency, rates} = initialState
    render(<App />);   
    const sourceInput = screen.getByTestId('EUR0')
    
    const amount = 2
    userEvent.type(sourceInput, `${amount}`)
    const targetValue = CurrencyConverter(Currency.EUR, amount, Currency.GBP, rates);
    
    await waitFor(() => {
        console.log("targetValue: ", targetValue, " targetCurrency:",targetCurrency)
        const targetInput = screen.getByTestId(`GBP1`)
        console.log('after input:', sourceInput.value, targetInput.value)
        expect(targetInput.value).toBe(targetValue)
    })
}); */
  
  