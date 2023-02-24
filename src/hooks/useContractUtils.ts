import { useCallback } from 'react';
import { formatEther } from '@ethersproject/units'
import { Web3Provider } from '@ethersproject/providers'
import { useActiveWeb3React } from './web3hooks'
import { useTokenContract } from "./useContract"
import ERC20_ABI from 'constants/abi/ERC20.json'
import { getContract, tokenDecimal } from '@/utils/contractUtils'
import Decimal from 'decimal.js';
import { MaxUint256 } from '@ethersproject/constants'

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

  // const tokenContract_ = useTokenContract("0x07bB4B361e903dB80Bce1F18246303DFd3b2600A");

  // 获取主链币Balance
  const mainChainBalance = async () => {
    const balanceValue = await library?.getBalance(account || '')
    if (balanceValue) {
      return formatEther(balanceValue)
    }
    return "0"
  }

  // 获取Token Balance
  const tokenBalance = async (address: string) => {
    if (!address || !library || !ERC20_ABI) return "0";
    const tokenContract = getContract(address, ERC20_ABI, library);
    const balanceValue = await tokenContract?.balanceOf(account);
    if (balanceValue) {
      return formatEther(balanceValue);
    }
    return "0"
  }

  const isApproveContract = async (tokenAddress: string, contractAddress: string) => {
    if (!tokenAddress || !contractAddress || !library || !ERC20_ABI) return false;
    const tokenContract = getContract(tokenAddress, ERC20_ABI, library);
    if (!account) return false;
    const allowance = await tokenContract?.allowance(account, contractAddress);
    console.log(allowance.toString());
    const decimals = await tokenContract?.decimals();
    const value = new Decimal(allowance.toString()).div(tokenDecimal(decimals)).toFixed();
    return Number(value) > 0;
  }

  const approve = async (tokenAddress: string, contractAddress: string) => {
    if (!tokenAddress || !contractAddress || !library || !ERC20_ABI || !account) return false;
    const signer = library.getSigner();

    // const account1 = await signer.getAddress();
    // console.log(account1); // 当前钱包地址

    console.log(signer);

    console.log(library);

    const tokenContract = getContract(tokenAddress, ERC20_ABI, library);



    const options = { from: account };
    const result = await tokenContract?.approve(contractAddress, MaxUint256, options);
    return result;
  }



  return {
    mainChainBalance,
    tokenBalance,
    isApproveContract,
    approve
  }
}