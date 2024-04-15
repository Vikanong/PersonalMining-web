import { useEffect, useState } from "react"
import { useTokenContract } from "hooks/useContract"
import { formatEther } from '@ethersproject/units'
import { MaxUint256 } from '@ethersproject/constants'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { tokenDecimal } from '@/utils/contractUtils'
import Decimal from 'decimal.js';



export default function useTokenUtils(tokenAddress: string) {
  const [balance, setBalance] = useState("--");
  const tokenContract = useTokenContract(tokenAddress);
  const { account, provider } = useWeb3ReactCore();

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
      const balanceValue = await provider?.getBalance(account || '')
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
    const balance = await tokenContract?.balanceOf(account);
    const decimals = await tokenContract?.decimals();
    const value = new Decimal(balance.toString()).div(tokenDecimal(decimals)).mul(tokenDecimal(18)).toFixed();
    const transaction = await tokenContract?.approve(contractAddress, value, options);
    const result = await transaction.wait();
    return result;
  }

  useEffect(() => {
    tokenBalance()
  }, [account, provider])

  return {
    balance,
    tokenBalance,
    isApprove,
    approve
  }
}