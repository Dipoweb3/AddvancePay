import { useState, useEffect } from 'react';

export default function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('OKX Wallet not found. Please install the OKX extension.');
      return;
    }

    const provider = window.ethereum;

    if (!provider.isOKExWallet) {
      alert('Detected a wallet, but not OKX. Please use OKX Wallet.');
      return;
    }

    try {
      const accounts = await provider.request<string[]>({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum?.isOKExWallet) {
      window.ethereum
        .request<string[]>({ method: 'eth_accounts' })
        .then((accounts) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        });
    }
  }, []);

  return { walletAddress, connectWallet };
}
