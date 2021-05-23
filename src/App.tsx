import React from 'react';
import './App.css';
import { StateProvider } from './store/contextStore'
import ExchangeScreen from './screens/Exchange'

function App({initialState}: any) {
  return (
    <div className="App">
      <StateProvider>
        <ExchangeScreen />
      </StateProvider>
    </div>
  );
}

export default App;
