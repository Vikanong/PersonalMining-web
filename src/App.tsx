import React, { useState, createContext } from "react";
import { BrowserRouter } from 'react-router-dom'
import Routelist from "./route"
import Web3ReactManager from './components/Web3ReactManager'
import "./assets/style/reset.less"


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Web3ReactManager>
        <Routelist />
      </Web3ReactManager>
    </BrowserRouter>
  );
}

export default App;
