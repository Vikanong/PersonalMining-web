import { useCallback } from 'react';
import { formatEther } from '@ethersproject/units'
import { useActiveWeb3React } from './web3hooks'
import { useTokenContract } from "hooks/useContract"
// import { pow18 } from '../utils'

export const useMainChainBalance = () => {
  const { library, account } = useActiveWeb3React()
  return useCallback(async () => {
    const balanceValue = await library?.getBalance(account || '')
    if (balanceValue) {
      return formatEther(balanceValue)
    }
  }, [account, library])
}


export const useTokenInfo = (tokenAddress: string) => {
  const { account } = useActiveWeb3React()
  const contract = useTokenContract(tokenAddress)
  const getTokenBalance = useCallback(async () => {
    const balanceValue = await contract?.balanceOf(account)
    if (balanceValue) {
      return formatEther(balanceValue)
    }
  }, [account, contract])

  const getTokenSymbol = useCallback(async () => {
    const symbol = await contract?.symbol()
    if (symbol) return symbol
  }, [contract])

  return {
    getTokenBalance,
    getTokenSymbol
  }
}