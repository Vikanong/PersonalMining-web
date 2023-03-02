// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import Providers from './web3Providers/Providers';
import App from './App';

// import { Buffer } from 'buffer';
// window.Buffer = Buffer;

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)
