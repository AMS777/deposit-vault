import React from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { useBalances } from '../../hooks/useBalances';

const WalletInfo = () => {
  const { isConnected, address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  const { balanceEth, balanceWeth, balanceReth } = useBalances();

  return (
    <div className="p-6 rounded shadow-lg self-stretch bg-gray-200 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-center">Wallet</h2>
      {!isConnected ? (
        <>
          <p className="mb-2">You need to connect a wallet to deposit funds.</p>
          <div className="flex justify-center">
            <ConnectButton label="Connect your wallet" />
          </div>
        </>
      ) : (
        <>
          <h3 className="mb-2">Your are connected with the wallet:</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium">Address:</label>
            <p className="mt-1 break-all">{address?.toString()}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Chain:</label>
            <p className="mt-1">{chain?.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Balance:</label>
            <p className="mt-1">
              {balanceEth?.formatted || '0'} {balanceEth?.symbol}
            </p>
            <p className="mt-1">
              {balanceWeth?.formatted || '0'} {balanceWeth?.symbol}
            </p>
            <p className="mt-1">
              {balanceReth?.formatted || '0'} {balanceReth?.symbol}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Please, keep in mind that this wallet will stay connected until you disconnect it.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            You can disconnect it manually in the wallet or with this button:
          </p>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none mt-4"
            onClick={() => disconnect()}
          >
            Disconnect wallet
          </button>
        </>
      )}
    </div>
  );
};

export default WalletInfo;
