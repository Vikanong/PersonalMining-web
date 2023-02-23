import React, { useState, useEffect, useContext } from "react"
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import ConnectWalletModal from "@/components/ConnectWalletModal"
import ImageComponent from "@/components/ImageComponent"
import { useActiveWeb3React } from 'hooks/web3hooks'
import useMining from 'hooks/useMiningContract'

import { useMiningContract } from 'hooks/useContract'

import "./index.less"

const Mining: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const { active, account } = useWeb3ReactCore();
  const miningContract = useMiningContract();
  const { poolList } = useMining(miningContract);

  useEffect(() => {
    setPools(poolList);
    // console.log(active);
  }, [miningContract, poolList])

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  return (
    <div>
      {/* <ConnectWalletModal /> */}
      <ul className="miningList">
        {pools.map(pool => {
          return (
            <li key={pool.miningId} className="th-card">
              <ImageComponent imageName={pool.symbol.toLowerCase()} />
              <div className="symbol">
                {pool.symbol}
              </div>
              <div className="rate">
                RATE: {pool.rate}% / minute
              </div>

              {account}


            </li>
          )
        })}

      </ul>

      {/* {accountEllipsis} */}

    </div>

  )
}

export default Mining