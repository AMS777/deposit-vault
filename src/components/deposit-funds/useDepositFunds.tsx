import { useEffect, useRef, useState } from 'react';

import { useAccount, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { vaultAbi, tokenAbi, helperAbi, resolverAbi, routerAbi } from '../../abi';
import { ROUTER, VAULT, HELPER, RESOLVER } from '../../config/addresses';
import { validateForm } from './validate-form';
import { WriteContractReturnType, Address } from 'viem';
import { useBalances } from '../../hooks/useBalances';

export const useDepositFunds = () => {
  const [validationErrorToken0, setValidationErrorToken0] = useState('');
  const [validationErrorToken1, setValidationErrorToken1] = useState('');

  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const { balanceWeth, balanceReth } = useBalances();

  const transactionsSuccessful = useRef<string[]>([]); // useState<string[]>([]) misbehaves due to inconsistency of re-renders between deposit funds steps that overwrite its value
  const [depositFundsStatus, setDepositFundsStatus] = useState('');
  const [isDepositingFunds, setIsDepositingFunds] = useState(false);
  const [isLoadingSmartContracts, setIsLoadingSmartContracts] = useState(true);
  const [isDepositFundsSuccessful, setIsDepositFundsSuccessful] = useState(false);
  const [isDepositFundsFailed, setIsDepositFundsFailed] = useState(false);
  const [depositFundsError, setDepositFundsError] = useState('');

  const [amountToken0, setAmountToken0] = useState('0');
  const [amountToken1, setAmountToken1] = useState('0');

  const [tokenAddress0, setTokenAddress0] = useState<Address | undefined>();
  const [tokenAddress1, setTokenAddress1] = useState<Address | undefined>();
  const [isEnabledGetTokenSymbols, setIsEnabledGetTokenSymbols] = useState(false);

  const [tokenSymbol0, setTokenSymbol0] = useState('');
  const [tokenSymbol1, setTokenSymbol1] = useState('');

  const [ratio, setRatio] = useState<number | null>(null);
  const [minAmountVaultShares, setMinAmountVaultShares] = useState<number | null>(null);
  const [isEnabledGetMintAmounts, setIsEnabledGetMintAmounts] = useState(false);

  const {
    data: vaultTokens,
    error: errorVaultTokens,
    isLoading: isLoadingVaultTokens,
    isSuccess: isSuccessVaultTokens,
    isError: isErrorVaultTokens,
  } = useReadContracts({
    contracts: [
      {
        functionName: 'token0',
        address: VAULT,
        abi: vaultAbi,
      },
      {
        functionName: 'token1',
        address: VAULT,
        abi: vaultAbi,
      },
    ],
  });
  useEffect(() => {
    if (isErrorVaultTokens) {
      setTokenAddress0(undefined);
      setTokenAddress1(undefined);
      setDepositFundsError(errorVaultTokens.message);
      setIsEnabledGetTokenSymbols(false);
      return;
    }
    if (!isLoadingVaultTokens && isSuccessVaultTokens) {
      setTokenAddress0(vaultTokens?.[0].result as Address);
      setTokenAddress1(vaultTokens?.[1].result as Address);
      setIsEnabledGetTokenSymbols(true);
      setDepositFundsError('');
    }
  }, [isLoadingVaultTokens, isSuccessVaultTokens, isErrorVaultTokens]);

  const {
    data: vaultTokensSymbols,
    error: errorVaultTokensSymbols,
    isLoading: isLoadingVaultTokensSymbols,
    isSuccess: isSuccessVaultTokensSymbols,
    isError: isErrorVaultTokensSymbols,
  } = useReadContracts({
    contracts: [
      {
        functionName: 'symbol',
        address: tokenAddress0,
        abi: tokenAbi,
      },
      {
        functionName: 'symbol',
        address: tokenAddress1,
        abi: tokenAbi,
      },
    ],
    query: {
      enabled: isEnabledGetTokenSymbols,
    },
  });
  useEffect(() => {
    setIsEnabledGetTokenSymbols(false);
  }, [isEnabledGetTokenSymbols]);
  useEffect(() => {
    if (isErrorVaultTokensSymbols) {
      setTokenSymbol0('');
      setTokenSymbol1('');
      setDepositFundsError(errorVaultTokensSymbols.message);
      return;
    }
    if (!isLoadingVaultTokensSymbols && isSuccessVaultTokensSymbols) {
      setTokenSymbol0(vaultTokensSymbols?.[0].result as string);
      setTokenSymbol1(vaultTokensSymbols?.[1].result as string);
      setDepositFundsError('');
    }
  }, [isLoadingVaultTokensSymbols, isSuccessVaultTokensSymbols, isErrorVaultTokensSymbols]);

  const {
    data: vaultTotalUnderlying,
    error: errorTotalUnderlying,
    isLoading: isLoadingVaultTotalUnderlying,
    isSuccess: isSuccessVaultTotalUnderlying,
    isError: isErrorVaultTotalUnderlying,
  } = useReadContract({
    functionName: 'totalUnderlying',
    address: HELPER,
    abi: helperAbi,
    args: [VAULT],
  });
  useEffect(() => {
    if (isErrorVaultTotalUnderlying) {
      setRatio(null);
      setDepositFundsError(errorTotalUnderlying.message);
      return;
    }
    if (
      !isLoadingVaultTotalUnderlying &&
      isSuccessVaultTotalUnderlying &&
      Array.isArray(vaultTotalUnderlying)
    ) {
      const vaultRatio = Number(vaultTotalUnderlying[1] / vaultTotalUnderlying[0]);
      setRatio(vaultRatio);
      setDepositFundsError('');
    }
  }, [isLoadingVaultTotalUnderlying, isSuccessVaultTotalUnderlying, isErrorVaultTotalUnderlying]);

  useEffect(() => {
    const isLoadingSmartContracts =
      isLoadingVaultTokens || isLoadingVaultTokensSymbols || isLoadingVaultTotalUnderlying;
    setIsLoadingSmartContracts(isLoadingSmartContracts);
  }, [isLoadingVaultTokens, isLoadingVaultTokensSymbols, isLoadingVaultTotalUnderlying]);

  const {
    data: vaultMintAmounts,
    error: errorVaultMintAmounts,
    isLoading: isLoadingVaultMintAmounts,
    isSuccess: isSuccessVaultMintAmounts,
    isError: isErrorVaultMintAmounts,
  } = useReadContract({
    functionName: 'getMintAmounts',
    address: RESOLVER,
    abi: resolverAbi,
    args: [VAULT, Math.floor(Number(amountToken0)), Math.floor(Number(amountToken1))],
    query: {
      enabled: isEnabledGetMintAmounts,
    },
  });
  useEffect(() => {
    setIsEnabledGetMintAmounts(false);
  }, [isEnabledGetMintAmounts]);
  useEffect(() => {
    if (isErrorVaultMintAmounts) {
      setMinAmountVaultShares(null);
      setDepositFundsError(errorVaultMintAmounts.message);
      console.error(errorVaultMintAmounts);
      return;
    }
    if (
      !isLoadingVaultMintAmounts &&
      isSuccessVaultMintAmounts &&
      Array.isArray(vaultMintAmounts)
    ) {
      setMinAmountVaultShares(vaultMintAmounts[2]);
      setDepositFundsError('');
      // the value must be passed as parameter, the useState value can't be taken because the hook has not yet been run at this point and it's not updated
      handleGetAmountSharesMinSuccess(vaultMintAmounts[2]);
    }
  }, [isLoadingVaultMintAmounts, isSuccessVaultMintAmounts, isErrorVaultMintAmounts]);

  useEffect(() => {
    if (ratio === null) {
      setDepositFundsError('Ratio for token pair not available.');
      return;
    }
    const amountToken0Number = Number(amountToken0);
    const amountToken1Number = amountToken0Number * ratio;
    setAmountToken1(String(amountToken1Number));
  }, [amountToken0]);

  useEffect(() => {
    if (ratio === null) {
      setDepositFundsError('Ratio for token pair not available.');
      return;
    }
    const amountToken1Number = Number(amountToken1);
    const amountToken0Number = amountToken1Number / ratio;
    setAmountToken0(String(amountToken0Number));
  }, [amountToken1]);

  // read tokens, calculate ratio

  // set allowance for both tokens

  // get shares

  const addTransactionSuccessful = (transactionMessage: string) => {
    transactionsSuccessful.current.push(transactionMessage);
  };

  const setAllowanceToken0 = () => {
    setDepositFundsStatus(`Setting allowance of first token (${tokenSymbol0})...`);

    writeContract(
      {
        functionName: 'allowance',
        address: tokenAddress0 as Address,
        abi: tokenAbi,
        args: [address, VAULT],
      },
      { onSuccess: handleAllowanceToken0Success, onError: handleError },
    );
  };
  const handleAllowanceToken0Success = (data: WriteContractReturnType) => {
    addTransactionSuccessful(
      `The allowance of first token (${tokenSymbol0}) is successful: ${data}`,
    );
    setAllowanceToken1();
  };

  const setAllowanceToken1 = () => {
    setDepositFundsStatus(`Setting allowance of second token (${tokenSymbol1})...`);
    writeContract(
      {
        functionName: 'allowance',
        address: tokenAddress1 as Address,
        abi: tokenAbi,
        args: [address, VAULT],
      },
      { onSuccess: handleAllowanceToken1Success, onError: handleError },
    );
  };
  const handleAllowanceToken1Success = (data: WriteContractReturnType) => {
    addTransactionSuccessful(
      `The allowance of second token (${tokenSymbol1}) is successful: ${data}`,
    );
    getAmountSharesMin();
  };

  const getAmountSharesMin = () => {
    setDepositFundsStatus(`Retrieving min amount of shares...`);
    setIsEnabledGetMintAmounts(true);
  };
  const handleGetAmountSharesMinSuccess = (minAmountVaultShares: number) => {
    addTransactionSuccessful(`The min amount of shares is retrieved successfully.`);
    addLiquidityToVault(minAmountVaultShares);
  };

  const addLiquidityToVault = (minAmountVaultShares: number) => {
    setDepositFundsStatus(`Adding the liquidity to the vault...`);

    const maxAmountToken0 = BigInt(Math.floor(Number(amountToken0)));
    const maxAmountToken1 = BigInt(Math.floor(Number(amountToken1)));
    const minAmountToken0 = BigInt(Math.round(Number(amountToken0) * 0.95));
    const minAmountToken1 = BigInt(Math.round(Number(amountToken1) * 0.95));

    const components = {
      amount0Max: maxAmountToken0,
      amount1Max: maxAmountToken1,
      amount0Min: minAmountToken0,
      amount1Min: minAmountToken1,
      amountSharesMin: minAmountVaultShares,
      vault: VAULT,
      receiver: address,
      gauge: address,
    };

    writeContract(
      {
        functionName: 'addLiquidity',
        address: ROUTER,
        abi: routerAbi,
        args: [components],
      },
      { onSuccess: handleAddLiquidityToVaultSuccess, onError: handleError },
    );
  };
  const handleAddLiquidityToVaultSuccess = (data: WriteContractReturnType) => {
    addTransactionSuccessful(`The liquidity has been added to the vault successfully: ${data}`);
    setIsDepositingFunds(false);
    setIsDepositFundsSuccessful(true);
    setIsDepositFundsFailed(false);
  };

  const handleError = (error: Error) => {
    setDepositFundsError(error.message);
    setIsDepositingFunds(false);
    setIsDepositFundsSuccessful(false);
    setIsDepositFundsFailed(true);
    console.error('error', error.message);
  };

  const depositFunds = async () => {
    try {
      setDepositFundsError('');
      setDepositFundsStatus('');
      transactionsSuccessful.current = [];
      setIsDepositingFunds(true);
      setIsDepositFundsSuccessful(false);
      setIsDepositFundsFailed(false);

      setAllowanceToken0();
    } catch (e) {
      setDepositFundsError('Error depositing funds. Please, try again.');
      setDepositFundsStatus('');
      setIsDepositingFunds(false);
      setIsDepositFundsSuccessful(false);
      setIsDepositFundsFailed(true);
    }
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = validateForm(
      Number(balanceWeth?.formatted),
      Number(balanceReth?.formatted),
      Number(amountToken0),
      setValidationErrorToken0,
      Number(amountToken1),
      setValidationErrorToken1,
    );

    if (!isFormValid) {
      return;
    }

    depositFunds();
  };

  return {
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
    balanceWeth: balanceWeth?.formatted,
    balanceReth: balanceReth?.formatted,
    isLoadingSmartContracts,
    ratio,
    depositFundsStatus,
    transactionsSuccessful: transactionsSuccessful.current,
    depositFundsError,
    tokenSymbol0,
    tokenSymbol1,
  };
};
