import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { ConnectKitProvider, ConnectKitButton, } from "connectkit";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum
  ],
  [
    alchemyProvider({
      apiKey: process.env.REACT_APP_ALCHEMY_ID
    }),
    publicProvider()
  ]);

const appName = 'connectkit-demo';
const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID;
const jsonRpcUrl = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_ID}`;

const config = createConfig({
  connectors: [
    new MetaMaskConnector({
      shimDisconnect: false,
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName,
        jsonRpcUrl
      }
    }),
    new WalletConnectConnector({
      chains,
      options: {
        appName,
        jsonRpcUrl,
        projectId
      }
    }),
    new InjectedConnector({
      chains
    }),
  ],
  publicClient,
  webSocketPublicClient,
  logger: {
    warn: (message) => console.warn(message),
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
);

reportWebVitals(sendToVercelAnalytics);
