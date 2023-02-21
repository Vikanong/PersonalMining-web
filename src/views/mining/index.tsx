import React, { useState, useEffect } from "react"
import ConnectWalletModal from "../../components/ConnectWalletModal"
import { useActiveWeb3React } from 'hooks/web3hooks'
import { usePoolsIds, usePools } from 'hooks/useMiningContract'

import "./index.less"

const Mining: React.FC = () => {

  const { account } = useActiveWeb3React();
  const ids = usePoolsIds();
  const pools = usePools(ids);



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