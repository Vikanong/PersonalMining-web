import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { MainChaid } from '@/connection'
import { switchChain } from '@/utils/switchChain';
import Routelist from './router'
import "./assets/style/reset.less"

function App() {

  const { chainId, connector } = useWeb3React();
  useEffect(() => {
    if (chainId !== MainChaid) {
      switchChain(connector, MainChaid)
    }
  }, [chainId])

  return (
    <BrowserRouter>
      <Routelist />
    </BrowserRouter>
  )
}

export default App
