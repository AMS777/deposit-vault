import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import { defineChain } from 'viem';

export const virtualArbitrumOne = defineChain({
  id: 42161,
  name: 'Virtual Arbitrum One',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://virtual.arbitrum.rpc.tenderly.co/a63a5990-ce6f-4822-b8ff-9c779ce13a23'] }
  },
  blockExplorers: {
    default: {
      name: 'Tenderly Explorer',
      url: 'https://virtual.arbitrum.rpc.tenderly.co/4265f31a-616a-4405-99df-d10b3299a156'
    }
  },
})

export const config = getDefaultConfig({
  appName: 'Vault App',
  projectId: 'Vault',
  chains: [
    virtualArbitrumOne,
    arbitrum,
    mainnet,
    polygon,
    optimism,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
  transports: {
    [virtualArbitrumOne.id]: http('https://virtual.arbitrum.rpc.tenderly.co/a63a5990-ce6f-4822-b8ff-9c779ce13a23')
  },
});
