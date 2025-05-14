import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    okxwallet?: {
      ethereum?: ExternalProvider;
    };
  }
}
=======
>>>>>>> d4c336599241310b66d23620e0b714ad13fe672d

export default function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

<<<<<<< HEAD
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
=======
  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('OKX Wallet not found. Please install the OKX extension.');
      return;
    }

    const provider = window.ethereum;

    if (!provider.isOKExWallet) {
      alert('Detected a wallet, but not OKX. Please use OKX Wallet.');
>>>>>>> d4c336599241310b66d23620e0b714ad13fe672d
      return;
    }

    try {
<<<<<<< HEAD
      const accounts = await provider.request({ method: 'eth_requestAccounts' }) as string[];
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error('OKX Wallet connection failed:', err);
=======
      const accounts = await provider.request<string[]>({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error('Wallet connection failed:', err);
>>>>>>> d4c336599241310b66d23620e0b714ad13fe672d
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    const provider = getProvider();

    if (provider?.request) {
      provider.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });
=======
    if (typeof window !== 'undefined' && window.ethereum?.isOKExWallet) {
      window.ethereum
        .request<string[]>({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        });
>>>>>>> d4c336599241310b66d23620e0b714ad13fe672d
    }
  }, []);

  return { walletAddress, connectWallet };
}
