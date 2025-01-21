export const allowOnlyNumbersAndDot = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  const inputValue = e.target.value;
  if (/^\d*\.?\d*$/.test(inputValue)) {
    callback(e);
  }
};
