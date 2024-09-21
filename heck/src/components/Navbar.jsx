import React, { useEffect, useState } from 'react';
import { AptosWalletAdapterProvider, useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { Col, Row } from 'antd';
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';


const ConnectWallet = () => {
  const { account, connected, disconnect, error } = useWallet();
  const [network, setNetwork] = useState('Testnet');

  useEffect(() => {
    if (error) {
      console.error('Wallet connection error:', error);
    }
  }, [error]);

  return (
    <div className="insert-x-0 top-8 w-full">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20 relative">
        <div className="flex item-center justify-center">
          <nav>
            <ul className="flex flex-row space-x-6 p-4">
              <li>
                <select
                  className="font-bold sm:text-2xl bg-transparent text-white brightness-100"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  <option value="Mainnet">Mainnet</option>
                  <option value="Devnet">Devnet</option>
                  <option value="Testnet">Testnet</option>
                </select>
              </li>
              <li>
                <div>
                  {!connected ? (
                    <WalletSelector />
                  ) : (
                    <div>
                      <p>Connected account: {account?.address}</p>
                      <button onClick={disconnect} className="text-red-500">
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              </li>
              {error && (
                <li>
                  <p className="text-red-500">{error.message}</p>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

// Wrap the ConnectWallet component with the AptosWalletAdapterProvider
const App = () => {
  return (
    <AptosWalletAdapterProvider>
      <ConnectWallet />
    </AptosWalletAdapterProvider>
  );
};

export default App;
