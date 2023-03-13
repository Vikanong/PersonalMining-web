import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import Web3Provider from '@/components/Web3Provider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <Web3Provider>
      <App />
    </Web3Provider>
  </Provider>
)

reportWebVitals()
