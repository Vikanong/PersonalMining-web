import React, { useState, useEffect } from "react"
import { ReactComponent as MetamaskIcon } from 'images/icon/svg/metamask.svg'
import { ReactComponent as WalletConnectIcon } from 'images/icon/svg/walletconnect.svg'


const ConnectWallet: React.FC = () => {
  return (
    <div>
      <MetamaskIcon className="" />
      <WalletConnectIcon className="" />

    </div>

  )
}

export default ConnectWallet