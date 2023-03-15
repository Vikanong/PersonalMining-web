import ethereumLogoUrl from 'images/ethereum-logo.png'
import optimismLogoUrl from 'images/icon/svg/optimistic_ethereum.svg'
import bscLogo from 'images/bnb.png'

import { SupportedChainId } from './chains'
import { OPTIMISM_LIST } from './lists'

export enum NetworkType {
  L1,
  L2,
}
interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly infoLink: string
  readonly logoUrl: string
  readonly circleLogoUrl?: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
  readonly color?: string
  readonly backgroundColor?: string
  readonly defaultListUrl?: string
  readonly statusPage?: string
}

// interface L1ChainInfo extends BaseChainInfo {
//   readonly networkType: NetworkType.L1
//   readonly defaultListUrl?: string
// }

// export interface L2ChainInfo extends BaseChainInfo {
//   readonly networkType: NetworkType.L2
//   readonly bridge: string
//   readonly statusPage?: string
//   readonly defaultListUrl: string
// }

type ChainInfoMap = { readonly [chainId: number]: BaseChainInfo }

const CHAIN_INFO: ChainInfoMap = {
  // [SupportedChainId.BSCMAINNET]: {
  //   networkType: NetworkType.L1,
  //   docs: 'https://docs.uniswap.org/',
  //   explorer: 'https://etherscan.io/',
  //   infoLink: 'https://info.uniswap.org/#/',
  //   label: 'Ethereum',
  //   logoUrl: ethereumLogoUrl,
  //   nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  // },
  [SupportedChainId.BSCTESTNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://testnet.bscscan.com/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'BSC TESTNET',
    logoUrl: bscLogo,
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  },
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.RINKEBY]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://rinkeby.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Rinkeby',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Rinkeby Ether', symbol: 'rETH', decimals: 18 },
  },
  [SupportedChainId.ROPSTEN]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://ropsten.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Ropsten',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ropsten Ether', symbol: 'ropETH', decimals: 18 },
  },
  [SupportedChainId.KOVAN]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://kovan.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Kovan',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Kovan Ether', symbol: 'kovETH', decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.uniswap.org/',
    explorer: 'https://goerli.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/',
    label: 'Görli',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Görli Ether', symbol: 'görETH', decimals: 18 },
  },
  [SupportedChainId.OPTIMISM]: {
    networkType: NetworkType.L2,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://optimistic.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'Optimism',
    logoUrl: optimismLogoUrl,
    // Optimism perfers same icon for both
    circleLogoUrl: optimismLogoUrl,
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.OPTIMISM_GOERLI]: {
    networkType: NetworkType.L2,
    bridge: 'https://app.optimism.io/bridge',
    defaultListUrl: OPTIMISM_LIST,
    docs: 'https://optimism.io/',
    explorer: 'https://goerli-optimism.etherscan.io/',
    infoLink: 'https://info.uniswap.org/#/optimism/',
    label: 'Optimism Görli',
    logoUrl: optimismLogoUrl,
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Optimism Goerli Ether', symbol: 'görOpETH', decimals: 18 },
  }
}

/**
 * Overloaded method for returning ChainInfo given a chainID
 * Return type varies depending on input type:
 * number | undefined -> returns chaininfo | undefined
 * SupportedChainId -> returns L1ChainInfo | L2ChainInfo
 * SupportedL1ChainId -> returns L1ChainInfo
 * SupportedL2ChainId -> returns L2ChainInfo
 */
export function getChainInfo(chainId: any): any {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined
  }
  return undefined
}

const MAINNET_INFO = CHAIN_INFO[SupportedChainId.MAINNET]
export function getChainInfoOrDefault(chainId: number | undefined) {
  return getChainInfo(chainId) ?? MAINNET_INFO
}
