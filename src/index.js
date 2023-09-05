import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

// import { WagmiConfig, createConfig } from "wagmi";
// import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
// import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";

// const config = createConfig(
//   getDefaultConfig({
//     appName: 'family connectkit demo',
//     alchemyId: `${process.env.REACT_APP_ALCHEMY_ID}`,
//     chains: [mainnet, polygon, optimism, arbitrum],
//     walletConnectProjectId: `${process.env.REACT_APP_WALLETCONNECT_PROJECT_ID}`,
//   })
// );

ReactDOM.render(
  <React.StrictMode>
  {/* <WagmiConfig config={config}>
    <ConnectKitProvider>
      <ConnectKitButton />
    </ConnectKitProvider>
  </WagmiConfig> */}
  <div>ddd</div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
