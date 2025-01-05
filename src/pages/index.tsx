import type { NextPage } from 'next';

import React, { useState } from 'react';
import { ThemeSwitch } from '../components/theme-switch';
import { WalletInfo } from '../components/wallet-info';

const Home: NextPage = () => {

  return (
    <div
      className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-50"
      suppressHydrationWarning
    >
      <div className="flex flex-col space-y-4 items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Deposit Funds into Vault</h1>
        <ThemeSwitch />
        <WalletInfo />
        </div>
    </div>
  );
};

export default Home;
