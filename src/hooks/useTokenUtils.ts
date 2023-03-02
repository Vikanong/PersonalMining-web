import { useEffect, useState } from "react"
import { useTokenContract } from "hooks/useContract"
import { formatEther } from '@ethersproject/units'
import { MaxUint256 } from '@ethersproject/constants'
import { useActiveWeb3React } from './web3hooks'
import { tokenDecimal } from '@/utils/contractUtils'
import Decimal from 'decimal.js';



export default function useTokenUtils(tokenAddress: string) {
  const [balance, setBalance] = useState("--");
  const tokenContract = useTokenContract(tokenAddress);
  const { account, library } = useActiveWeb3React();

  // 获取Token Balance
  const tokenBalance = async () => {
    if (tokenAddress) {
      const balanceValue = await tokenContract?.balanceOf(account);
      if (balanceValue) {
        setBalance(formatEther(balanceValue))
        return formatEther(balanceValue);
      }
      return "0"
    } else {
      const balanceValue = await library?.getBalance(account || '')
      if (balanceValue) {
        setBalance(formatEther(balanceValue))
        return formatEther(balanceValue)
      }
      return "0"
    }
  }

  const isApprove = async (contractAddress: string) => {
    if (!tokenAddress || !contractAddress) return false;
    if (!account) return false;
    const allowance = await tokenContract?.allowance(account, contractAddress);
    console.log(allowance.toString());
    const decimals = await tokenContract?.decimals();
    const value = new Decimal(allowance.toString()).div(tokenDecimal(decimals)).toFixed();
    return Number(value) > 0;
  }

  const approve = async (contractAddress: string) => {
    if (!tokenAddress || !contractAddress || !account) return false;
    const options = { from: account };
    const transaction = await tokenContract?.approve(contractAddress, MaxUint256, options);
    const result = await transaction.wait();
    return result;
  }

  useEffect(() => {
    tokenBalance()
  }, [account])

  return {
    balance,
    isApprove,
    approve
  }
}