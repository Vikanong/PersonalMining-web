import React, { useState, createContext } from "react";
import { BrowserRouter } from 'react-router-dom'
import Routelist from "./route"
import Web3ReactManager from './components/Web3ReactManager'
import ConnectWalletModal from "@/components/ConnectWalletModal"
import { useStore } from './store/store';
import "./assets/style/reset.less"

// export const GlobalContext = createContext({});



const App: React.FC = () => {
  // const [state] = useStore();
  // const [showConnectWallet, setShowConnectWallet] = useState(false);
  return (
    <BrowserRouter>
      {/* {showConnectWallet && <ConnectWalletModal />} */}
      <Web3ReactManager>
        <Routelist />
      </Web3ReactManager>
    </BrowserRouter>
  );
}

export default App;
