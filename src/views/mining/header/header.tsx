import React, { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import ConnectWalletModal from "@/components/ConnectWalletModal"
import "./header.less"

const Header: React.FC = () => {

  const [showConnectModal, setShowConnectModal] = useState(false);
  const { account, connector } = useWeb3React();

  const disconnect = () => {
    if (account) {
      if (connector && connector.deactivate) {
        connector.deactivate()
      }
      connector.resetState()
    } else {
      checkConnectWallet(true)
    }
  }

  const checkConnectWallet = (is: boolean) => {
    setShowConnectModal(is)
  }

  return (
    <div className="header">
      {showConnectModal && <ConnectWalletModal checkModal={checkConnectWallet} />}
      <button className="connect-button" onClick={disconnect}>{account ? 'Disconnect' : 'Connect'}</button>
    </div>
  )
}

export default Header 