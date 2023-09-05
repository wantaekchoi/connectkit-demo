import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { ConnectKitProvider, ConnectKitButton, } from "connectkit";

const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet, polygon, optimism, arbitrum], [publicProvider()])
const config = createConfig({
  connectors: [
    new MetaMaskConnector({
      chains,
      shimDisconnect: false,
    }),
    new WalletConnectConnector({
      chains,
      options: {
        appName: 'connectkit-demo',
        jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_ID}`,
        projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID
      }
    }),
    new InjectedConnector({ chains }),
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
    <div>home</div>
  </React.StrictMode>,
);

reportWebVitals(sendToVercelAnalytics);
