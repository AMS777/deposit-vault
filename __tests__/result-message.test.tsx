import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ResultMessage from '../src/components/deposit-funds/ResultMessage';

describe('ResultMessage', () => {
  it('shows no message when there is no events', () => {
    render(
      <ResultMessage
        isDepositingFunds={false}
        depositFundsStatus=''
        isDepositFundsSuccessful={false}
        transactionsSuccessful={[]}
        isDepositFundsFailed={false}
        depositFundsError=''
      />,
    );

    const text = screen.queryByRole('p');

    expect(text).not.toBeInTheDocument();
  });

  it('shows depositing message', () => {
    render(
      <ResultMessage
        isDepositingFunds={true}
        depositFundsStatus='depositing message'
        isDepositFundsSuccessful={false}
        transactionsSuccessful={[]}
        isDepositFundsFailed={false}
        depositFundsError=''
      />,
    );

    const message = screen.queryByTestId('depositing-funds-message');

    expect(message).toBeInTheDocument();
  });

  it('shows deposit successful message', () => {
    render(
      <ResultMessage
        isDepositingFunds={true}
        depositFundsStatus=''
        isDepositFundsSuccessful={true}
        transactionsSuccessful={[]}
        isDepositFundsFailed={false}
        depositFundsError=''
      />,
    );

    const message = screen.queryByTestId('deposit-funds-successful-message');

    expect(message).toBeInTheDocument();
  });

  it('shows deposit failed message', () => {
    render(
      <ResultMessage
        isDepositingFunds={true}
        depositFundsStatus=''
        isDepositFundsSuccessful={true}
        transactionsSuccessful={[]}
        isDepositFundsFailed={true}
        depositFundsError='error message'
      />,
    );

    const message = screen.queryByTestId('deposit-funds-failed-message');

    expect(message).toBeInTheDocument();
  });
});
