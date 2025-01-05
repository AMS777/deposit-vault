export const useAccount = jest.fn(() => ({address: ''}));
export const useBalance = jest.fn( () => ({ data: jest.fn() }));
export const useDisconnect = jest.fn( () => ({ disconnect: jest.fn() }));
export const useReadContract = jest.fn();
export const useReadContracts = jest.fn();
export const useWriteContract = jest.fn( () => ({ writeContractAsync: jest.fn() }));
export const http = jest.fn();
