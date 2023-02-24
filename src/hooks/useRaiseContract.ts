import { useState, useEffect } from 'react'
import { useRaiseContract } from './useContract'
import { pow18 } from '@/utils/contractUtils'

export const useSummary = () => {
  const [data, setData] = useState({
    totalFundraising: "-",
    totalPersonTimes: "-",
    totalAmount: "-",
    totalCountry: "-"
  });
  const contract = useRaiseContract();
  const getSummary = async () => {
    const summary = await contract?.getSummary();
    setData({
      totalFundraising: summary[0].toString(),
      totalPersonTimes: summary[1].toString(),
      totalAmount: summary[2].div(pow18).toString(),
      totalCountry: summary[3].toString()
    })
  }
  useEffect(() => {
    if (contract) {
      getSummary()
    }
  }, [contract])
  return data
}