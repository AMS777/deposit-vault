export const validateForm = (
  balanceWeth: number,
  balanceReth: number,
  amountToken0: number,
  setValidationErrorToken0: (s: string) => void,
  amountToken1: number,
  setValidationErrorToken1: (s: string) => void,
): boolean => {

  if (amountToken0 <= 0 || amountToken0 > balanceWeth) {
    setValidationErrorToken0(`The amount of WETH must be greater than 0 and less or equal to your wallet balance (${balanceWeth})`);
    return false;
  }
  setValidationErrorToken0('');

  if (amountToken1 <= 0 || amountToken1 > balanceReth) {
    setValidationErrorToken1(`The amount of rETH must be greater than 0 and less or equal to your wallet balance (${balanceReth})`);
    return false;
  }
  setValidationErrorToken1('');

  return true;
};
