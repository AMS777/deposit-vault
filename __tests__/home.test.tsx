import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages';
import { useAccount } from 'wagmi';
import { useBalances } from '../src/hooks/useBalances';

jest.mock('../src/hooks/useBalances');

describe('Home', () => {
  it('renders a heading', () => {
    (useAccount as jest.Mock).mockResolvedValue({ isConnected: true });
    (useBalances as jest.Mock).mockReturnValue({ formatted: 1000 });

    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
