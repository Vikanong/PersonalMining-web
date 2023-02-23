import React, { useState, useEffect } from "react"
import ConnectWalletModal from "@/components/ConnectWalletModal"
import useMining from 'hooks/useMiningContract'
import { useMiningContract } from 'hooks/useContract'
import Pool from "./pool"


import "./index.less"

const Mining: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const [showConnectWallet, setShowConnectWallet] = useState(false);

  const miningContract = useMiningContract();
  const { poolList } = useMining(miningContract);

  useEffect(() => {
    setPools(poolList);
  }, [miningContract, poolList])

  // const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  const checkConnectWallet = (is: boolean) => {
    setShowConnectWallet(is)
  }

  return (
    <div>
      {showConnectWallet && <ConnectWalletModal checkModal={checkConnectWallet} />}
      <ul className="miningList">
        {pools.map(pool => {
          return (<Pool key={pool.miningId} pool={pool} checkModal={checkConnectWallet} />)
        })}
      </ul>
      {/* {accountEllipsis} */}
    </div>

  )
}

export default Mining