import React, { useEffect, useState } from 'react';
import { useDepositFunds } from './useDepositFunds';
import ResultMessage from './ResultMessage';

const DepositFunds = () => {
  const {
    amountToken0,
    setAmountToken0,
    amountToken1,
    setAmountToken1,
    validationErrorToken0,
    validationErrorToken1,
    handleSubmit,
    isDepositingFunds,
    isDepositFundsSuccessful,
    isDepositFundsFailed,
    balanceWeth,
    balanceReth,
    isLoadingSmartContracts,
    ratio,
    depositFundsStatus,
    transactionsSuccessful,
    depositFundsError,
    tokenSymbol0,
    tokenSymbol1,
  } = useDepositFunds();

  return (
    <div className="p-6 rounded shadow-lg self-stretch bg-gray-200 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4">Deposit Funds</h2>
      {isLoadingSmartContracts ? (
        <p className="mb-2">Please wait while smart contracts are loading...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <p className="mb-2">The ratio between tokens is: {ratio}</p>
            <div className="mb-4">
              <label htmlFor="number" className="block text-sm font-medium">
                {tokenSymbol0}
              </label>
              <input
                type="number"
                step="any"
                id="amountToken0"
                name="amountToken0"
                value={amountToken0}
                onChange={e => setAmountToken0(e.target.value)}
                min="1"
                max={Number(balanceWeth || 0)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            {validationErrorToken0 && (
              <p
                className="text-red-500 text-sm mt-2"
                data-testid="deposit-funds-validation-token0-error"
              >
                {validationErrorToken0}
              </p>
            )}
            <div className="mb-4">
              <label htmlFor="number" className="block text-sm font-medium">
                {tokenSymbol1}
              </label>
              <input
                type="number"
                id="amountToken1"
                name="amountToken1"
                value={amountToken1}
                onChange={e => setAmountToken1(e.target.value)}
                min="1"
                max={Number(balanceReth || 0)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            {validationErrorToken1 && (
              <p
                className="text-red-500 text-sm mt-2"
                data-testid="deposit-funds-validation-token1-error"
              >
                {validationErrorToken1}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none mt-4 disabled:bg-gray-400"
              disabled={isDepositingFunds}
            >
              {isDepositingFunds ? 'Depositing funds...' : 'Deposit funds'}
            </button>
          </form>
          <ResultMessage
            isDepositingFunds={isDepositingFunds}
            depositFundsStatus={depositFundsStatus}
            isDepositFundsSuccessful={isDepositFundsSuccessful}
            transactionsSuccessful={transactionsSuccessful}
            isDepositFundsFailed={isDepositFundsFailed}
            depositFundsError={depositFundsError}
          />
        </>
      )}
    </div>
  );
};

export default DepositFunds;
