export const convertToEUR = (valueInCents: number): string => {
  const valueInEUR = valueInCents / 100;
  return valueInEUR.toFixed(2);
};

export const convertToKm = (valueInMeters: number): string => {
  const valueInKm = valueInMeters / 1000;
  return valueInKm.toFixed(2);
};
