import React from 'react';

interface ResultMessageProps {
  isDepositingFunds: boolean;
  depositFundsStatus: string;
  isDepositFundsSuccessful: boolean;
  transactionsSuccessful: string[];
  isDepositFundsFailed: boolean;
  depositFundsError: string;
}

const ResultMessage = ({
  isDepositingFunds,
  depositFundsStatus,
  isDepositFundsSuccessful,
  transactionsSuccessful,
  isDepositFundsFailed,
  depositFundsError,
}: ResultMessageProps) => {
  return (
    <>
      {isDepositingFunds && (
        <p className="text-yellow-600 text-sm mt-4" data-testid="depositing-funds-message">
          {depositFundsStatus}
        </p>
      )}
      {isDepositFundsSuccessful && (
        <p className="text-green-500 text-sm mt-4" data-testid="deposit-funds-successful-message">
          Your funds have been deposited successfully.
        </p>
      )}
      {isDepositFundsFailed && (
        <p className="text-red-500 text-sm mt-4" data-testid="deposit-funds-failed-message">
          {depositFundsError}
        </p>
      )}
      {transactionsSuccessful.map((transaction, index) => (
        <p className="mt-2" key={index}>{transaction}</p>
      ))}
    </>
  );
};

export default ResultMessage;
