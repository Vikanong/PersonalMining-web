import React, { useState, useEffect } from "react"
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import ConnectWalletModal from "@/components/ConnectWalletModal"
import useMining from 'hooks/useMiningContract'
import { useMiningContract } from 'hooks/useContract'
import PoolCard from "./pool"
import { PoolType } from "@/constants/type"

import "./index.less"

const Mining: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const { active } = useWeb3ReactCore();

  const miningContract = useMiningContract();
  const { poolList, stakingBNB, stakingToken } = useMining(miningContract);

  useEffect(() => {
    console.log(poolList);
    setPools(poolList);
  }, [miningContract, poolList, active])

  // const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  const checkConnectWallet = (is: boolean) => {
    setShowConnectWallet(is)
  }

  const staking = async (pool: PoolType, amount: string) => {
    if (pool && Number(amount) > 0) {
      let Tx;
      if (pool.symbol === 'BNB') {
        Tx = await stakingBNB(pool.miningId, amount);
      } else {
        Tx = await stakingToken(pool.miningId, pool.tokenAddress, amount);
      }
      return Tx;
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