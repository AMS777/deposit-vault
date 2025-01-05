import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DepositFunds } from '../src/components/deposit-funds';
import { useDepositFunds } from '../src/components/deposit-funds/useDepositFunds';

jest.mock('../src/components/deposit-funds/useDepositFunds');

describe('DepositFunds', () => {
  it('renders a heading', () => {
    (useDepositFunds as jest.Mock).mockReturnValue({ transactionsSuccessful: [] });

    render(<DepositFunds />);

    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('shows no validation error at loading', () => {
    (useDepositFunds as jest.Mock).mockReturnValue({ transactionsSuccessful: [] });

    render(<DepositFunds />);

    const message = screen.queryByTestId('deposit-funds-validation-token0-error');

    expect(message).not.toBeInTheDocument();
  });
});
