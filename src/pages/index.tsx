import type { NextPage } from 'next';

import React from 'react';
import { ThemeSwitch } from '../components/theme-switch';
import { WalletInfo } from '../components/wallet-info';
import { useAccount } from 'wagmi';
import { DepositFunds } from '../components/deposit-funds';

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <div
      className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-50"
      suppressHydrationWarning
    >
      <div className="flex flex-col space-y-4 items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Deposit Funds into Vault</h1>
        <ThemeSwitch />
        <WalletInfo />
        {isConnected && <DepositFunds />}
      </div>
    </div>
  );
};

export default Home;
