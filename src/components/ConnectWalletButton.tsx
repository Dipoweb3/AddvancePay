// src/components/ConnectWalletButton.tsx
import React from 'react';
import useWallet from '../hooks/useWallet';


const ConnectWalletButton = () => {
  const { account, connectWallet } = useWallet();

  return (
    <button onClick={connectWallet} className="px-4 py-2 bg-blue-600 text-white rounded">
      {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWalletButton;
