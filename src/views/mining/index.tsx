import React, { useState, useEffect } from "react"
import ConnectWalletModal from "@/components/ConnectWalletModal"

const Mining: React.FC = () => {
  
  const [showConnectWallet, setShowConnectWallet] = useState(false);


  const checkConnectWallet = (is: boolean) => {
    setShowConnectWallet(is)
  }


  return (
    <div>
      <ConnectWalletModal checkModal={checkConnectWallet} />
      123456
    </div>
  )
}

export default Mining