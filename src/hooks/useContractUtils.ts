import { useCallback } from 'react';
import { formatEther } from '@ethersproject/units'
import { Web3Provider } from '@ethersproject/providers'
import { useActiveWeb3React } from './web3hooks'
import { useTokenContract } from "hooks/useContract"
import ERC20_ABI from 'constants/abi/ERC20.json'

import { getContract } from '../utils/contractUtils'
// import { pow18 } from '../utils'

// export const useMainChainBalance = () => {
//   const { library, account } = useActiveWeb3React()
//   return useCallback(async () => {
//     const balanceValue = await library?.getBalance(account || '')
//     if (balanceValue) {
//       return formatEther(balanceValue)
//     }
//   }, [account, library])
// }


// export const useTokenInfo = (tokenAddress: string) => {
//   const { account } = useActiveWeb3React()
//   const contract = useTokenContract(tokenAddress)
//   const getTokenBalance = useCallback(async () => {
//     const balanceValue = await contract?.balanceOf(account)
//     if (balanceValue) {
//       return formatEther(balanceValue)
//     }
//   }, [account, contract])

//   const getTokenSymbol = useCallback(async () => {
//     const symbol = await contract?.symbol()
//     if (symbol) return symbol
//   }, [contract])

//   return {
//     getTokenBalance,
//     getTokenSymbol
//   }
// }

export default function useContractUtils() {
  const { library, account } = useActiveWeb3React();

  // const tokenContract = useTokenContract(tokenAddress);

  const mainChainBalance = async () => {
    const balanceValue = await library?.getBalance(account || '')
    if (balanceValue) {
      return formatEther(balanceValue)
    }
    return "0"
  }

  const tokenBalance = async (address: string) => {
    if (!address || !library || !ERC20_ABI) return "0";
    const tokenContract = getContract(address, ERC20_ABI, library)
    const balanceValue = await tokenContract?.balanceOf(account)
    if (balanceValue) {
      return formatEther(balanceValue)
    }
    return "0"
  }


  return {
    mainChainBalance,
    tokenBalance
  }
}