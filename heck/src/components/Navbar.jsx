import React, { useState, useEffect } from 'react';
import { AptosClient } from 'aptos';

// Initialize the Aptos Client for network interaction
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com'); // Aptos devnet URL

const CHAIN_NAME = "aptos"; // Set your chain name appropriately

const ConnectWallet = () => {
  const [account, setAccount] = useState(null); // Stores connected account address
  const [isConnected, setIsConnected] = useState(false); // Tracks connection status
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [network, setNetwork] = useState('Devnet'); // Tracks selected network

  // Function to connect the Welldone wallet (via window.dapp)
  const connectWallet = async () => {
    try {
      // Check if the Welldone wallet (window.dapp) is available
      if (typeof window.dapp === 'undefined') {
        throw new Error('Welldone Wallet (window.dapp) is not installed');
      }

      // Request accounts from the wallet
      const accounts = await window.dapp.request(CHAIN_NAME, { method: "dapp:accounts" });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]); // Get the first account
        setIsConnected(true);
        setErrorMessage(''); // Clear error message on success
      } else {
        setErrorMessage('No accounts found');
      }
    } catch (error) {
      console.error('Error connecting to Welldone Wallet:', error);
      setErrorMessage(error.message || 'Failed to connect to Welldone Wallet');
    }
  };

  // Function to check if the wallet is already connected
  const checkIfConnected = async () => {
    try {
      // Check if Welldone wallet is injected via window.dapp
      if (typeof window.dapp !== 'undefined') {
        const accounts = await window.dapp.request(Aptos, { method: "dapp:accounts" });
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]); // Get the first account
          setIsConnected(true);
        }
      } else {
        setErrorMessage('Welldone Wallet (window.dapp) is not installed');
      }
    } catch (error) {
      console.log('Wallet not connected.');
    }
  };

  // Run on component mount to check if the wallet is connected
  useEffect(() => {
    const waitForWallet = async () => {
      // Delay to ensure wallet injection
      await new Promise(resolve => setTimeout(resolve, 1000));
      checkIfConnected();
    };
    waitForWallet();
  }, []);

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
                  {!isConnected ? (
                    <button
                      onClick={connectWallet}
                      className="font-bold sm:text-2xl brightness-120 text-white"
                    >
                      Connect Wallet
                    </button>
                  ) : (
                    <div>
                      <p>Connected account: {account}</p>
                    </div>
                  )}
                </div>
              </li>
              {errorMessage && (
                <li>
                  <p className="text-red-500">{errorMessage}</p>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
