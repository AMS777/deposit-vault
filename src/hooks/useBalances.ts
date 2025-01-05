import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { WETH, RETH } from '../config/addresses';
import { virtualArbitrumOne } from '../wagmi';

export const useBalances = () => {
  const { address } = useAccount();

  const { data: balanceEth } = useBalance({ address, chainId: virtualArbitrumOne.id });

  const { data: balanceWeth } = useBalance({
    address,
    chainId: virtualArbitrumOne.id,
    token: WETH,
  });

  const { data: balanceReth } = useBalance({
    address,
    chainId: virtualArbitrumOne.id,
    token: RETH,
  });

  return { balanceEth, balanceWeth, balanceReth };
};
