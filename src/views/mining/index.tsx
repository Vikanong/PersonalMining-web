import React, { useState, useEffect } from "react"
import ConnectWalletModal from "@/components/ConnectWalletModal"
import useMining from 'hooks/useMiningContract'
import { useMiningContract } from 'hooks/useContract'
import PoolCard from "./pool"
import { PoolType } from "@/constants/type"


import "./index.less"

const Mining: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const [showConnectWallet, setShowConnectWallet] = useState(false);

  const miningContract = useMiningContract();
  const { poolList, stakingBNB, stakingToken } = useMining(miningContract);

  useEffect(() => {
    console.log(poolList);
    setPools(poolList);
  }, [miningContract, poolList])

  // const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  const checkConnectWallet = (is: boolean) => {
    setShowConnectWallet(is)
  }

  const staking = async (pool: PoolType, amount: string) => {
    console.log(pool);
    console.log(amount);
    if (pool.symbol === 'BNB') {
      const tsHash = await stakingBNB(pool.miningId, amount);
    } else {
      const result = await stakingToken(pool.miningId, pool.tokenAddress, amount);
    }
  }

  return (
    <div>
      {showConnectWallet && <ConnectWalletModal checkModal={checkConnectWallet} />}
      <ul className="miningList">
        {pools.map(pool => {
          return (<PoolCard key={pool.miningId} pool={pool} checkModal={checkConnectWallet} staking={staking} />)
        })}
      </ul>
      {/* {accountEllipsis} */}
    </div>

  )
}

export default Mining