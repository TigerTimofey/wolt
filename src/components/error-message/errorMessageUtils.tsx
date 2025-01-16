export const generateErrorMessage = (
  venueSlug: string,
  cartValue: string,
  latitude: string,
  longitude: string
): string => {
  let errorMessage = "";

  if (!venueSlug) {
    errorMessage += "Venue is missing. ";
  }
  if (!cartValue) {
    errorMessage += "Cart value is missing. ";
  }
  if (!latitude || !longitude) {
    errorMessage += "Location is missing. ";
  }

  return errorMessage.trim();
};

export const isCartValueValid = (cartValue: string): boolean => {
  const cartValueNum = parseFloat(cartValue) * 100;
  return !isNaN(cartValueNum) && cartValueNum > 0;
};
