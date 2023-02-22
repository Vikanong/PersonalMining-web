import React, { useState, useEffect } from "react"
import ConnectWalletModal from "@/components/ConnectWalletModal"
import { useActiveWeb3React } from 'hooks/web3hooks'
// import { usePoolsIds, usePools } from 'hooks/useMiningContract'

import { useMiningContract } from 'hooks/useContract'
import { getPools } from "@/utils/miningHelpers"

import "./index.less"

const Mining: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const { account } = useActiveWeb3React();
  const miningContract = useMiningContract();
  // const ids = usePoolsIds();
  // const pools = usePools(ids);

  useEffect(() => {
    const get = async () => {
      const list = await getPools(miningContract);
    }
    get()
  }, [miningContract])



  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  return (
    <div>
      {/* <ConnectWalletModal /> */}
      <ul className="miningList">
        <li>
          mining

        </li>


      </ul>

      {accountEllipsis}
    </div>

  )
}

export default Mining