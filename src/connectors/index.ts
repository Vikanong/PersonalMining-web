import React from "react"
import { InjectedConnector } from '@web3-react/injected-connector'
import NetworkConnector from './networkConnector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'

export const MainChaid = 97

export const NetworkContextName = 'NETWORK'
export const connectorLocalStorageKey = 'connectorId'
export const injected = new InjectedConnector({
  supportedChainIds: [MainChaid],
})

export const RPC = {
  56: 'https://bsc-dataseed.binance.org/',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
}

export const NETWORK_CHAIN_ID: number = MainChaid
export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: RPC[MainChaid] },
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: RPC[MainChaid] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})

export const bscConnector = new BscConnector({ supportedChainIds: [56, 97] })

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  BSC = "bsc",
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.BSC]: bscConnector,
}

interface Config {
  title: string;
  connectorId: ConnectorNames;
}

export const connectors: Config[] = [
  {
    title: "Metamask",
    connectorId: ConnectorNames.Injected,
  },
  {
    title: "WalletConnect",
    connectorId: ConnectorNames.WalletConnect,
  },
];

export declare enum TradeType {
  EXACT_INPUT = 0,
  EXACT_OUTPUT = 1
}