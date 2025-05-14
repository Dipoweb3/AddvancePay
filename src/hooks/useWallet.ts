import { useState, useEffect } from 'react';
import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    okxwallet?: {
      ethereum?: ExternalProvider;
    };
  }
}

export default function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const getProvider = (): ExternalProvider | null => {
    if (typeof window !== 'undefined' && window.okxwallet?.ethereum) {
      return window.okxwallet.ethereum;
    }
    return null;
  };

  const connectWallet = async () => {
    const provider = getProvider();

    if (!provider?.request) {
      alert('OKX Wallet not found. Please install the OKX Wallet extension.');
      return;
    }

    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error('OKX Wallet connection failed:', err);
    }
  };

  useEffect(() => {
    const provider = getProvider();

    if (provider?.request) {
      provider.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });
    }
  }, []);

  return { walletAddress, connectWallet };
}
