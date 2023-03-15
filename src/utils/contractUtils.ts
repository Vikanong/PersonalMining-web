import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner ,JsonRpcProvider} from '@ethersproject/providers'
import { Address } from 'constants/index'
import { MainChaid } from '@/connection'
import Decimal from 'decimal.js';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export const pow18 = Decimal.pow(10, 18);

// account is not optional
function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
  return provider.getSigner(account).connectUnchecked()
}

// account is optional
function getProviderOrSigner(provider: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider
}

export function getContract(address: string, ABI: any, provider: JsonRpcProvider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(provider, account) as any)
}

export const getContractAddress = (address: Address) => {
  return address[MainChaid];
}

export const getTokenAddress = (address: Address) => {
  return address[MainChaid];
}

export const tokenDecimal = (decimal: any) => {
  return Decimal.pow(10, decimal);
}

export const getTokenDecimal = async (contract?: Contract | null) => {
  if (contract) {
    console.log(contract);
    // const decimals = await contract.methods.decimals().call();
    // return tokenDecimal(decimals);
  }
  return 0
}