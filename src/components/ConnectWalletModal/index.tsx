import React, { useState, useEffect } from "react"
import useAuth from 'hooks/useAuth'
import { connectorLocalStorageKey, ConnectorNames, connectors } from 'connectors/index'


import { ReactComponent as MetamaskIcon } from 'images/icon/svg/metamask.svg'
import { ReactComponent as WalletConnectIcon } from 'images/icon/svg/walletconnect.svg'

import "./index.less"


const ConnectWalletModal: React.FC = () => {

  const { connectWallet, disconnect } = useAuth()
  // 连接钱包
  const connect = (connectorId: ConnectorNames) => {
    connectWallet(connectorId);
    localStorage.setItem(connectorLocalStorageKey, connectorId);
  }

  // 断开钱包
  const disConnectWallet = () => {
    disconnect();
    localStorage.removeItem(connectorLocalStorageKey);
  }

  const getIcon = (title: string) => {
    switch (title) {
      case "Metamask":
        return <MetamaskIcon />
        break;
      case "TrustWallet":
        return <WalletConnectIcon />
        break;
      default:
        break;
    }
  }

  return (
    <div className="walletModal">
      <ul>
        {connectors.map(entry => (
          <li key={entry.title} onClick={() => {
            connect(entry.connectorId)
          }}>
            <span>
              {getIcon(entry.title)}
            </span>
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ConnectWalletModal