// @ts-check
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Providers from './web3Providers/Providers';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Providers>
    <App />
  </Providers>
);
reportWebVitals();
