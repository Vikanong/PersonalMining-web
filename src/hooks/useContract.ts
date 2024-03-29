import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
// import { useActiveWeb3React } from './web3hooks'
import { useWeb3React } from '@web3-react/core'
import { getContract, getContractAddress } from '@/utils/contractUtils'

import ERC20_ABI from 'constants/abi/ERC20.json'
import MULTICALL_ABI from 'constants/abi/Multicall.json'
import Mining_ABI from 'constants/abi/Mining.json'

import contractsAddress from 'constants/contractsAddress'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { provider, account, chainId } = useWeb3React();
  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
    let address: string | undefined;
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const address = getContractAddress(contractsAddress.multiCall)
  return useContract(address, MULTICALL_ABI, false)
}

export function useMiningContract(): Contract | null {
  const address = getContractAddress(contractsAddress.mining)
  return useContract(address, Mining_ABI)
}