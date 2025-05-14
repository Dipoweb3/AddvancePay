import { useState, useEffect } from 'react';
import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    okxwallet?: {
      ethereum?: ExternalProvider & {
        isOKExWallet?: boolean;
        request?: (args: { method: string }) => Promise<unknown>;
      };
    };
  }
}

export default function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const getProvider = (): ExternalProvider & {
    isOKExWallet?: boolean;
    request?: (args: { method: string }) => Promise<unknown>;
  } | null => {
    if (typeof window !== 'undefined' && window.okxwallet?.ethereum) {
      return window.okxwallet.ethereum;
    }
    return null;
  };

  const connectWallet = async () => {
    const provider = getProvider();

    if (!provider || !provider.request) {
      alert('OKX Wallet not found. Please install the OKX Wallet extension.');
      return;
    }

    try {
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      }) as string[];

      setWalletAddress(accounts[0]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('OKX Wallet connection failed:', err.message);
      } else {
        console.error('OKX Wallet connection failed:', err);
      }
    }
  };

  useEffect(() => {
    const provider = getProvider();

    if (provider?.request) {
      provider
        .request({ method: 'eth_accounts' })
        .then((accounts) => {
          if (Array.isArray(accounts) && typeof accounts[0] === 'string') {
            setWalletAddress(accounts[0]);
          }
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            console.error('Failed to get accounts:', err.message);
          } else {
            console.error('Failed to get accounts:', err);
          }
        });
    }
  }, []);

  return { walletAddress, connectWallet };
}
