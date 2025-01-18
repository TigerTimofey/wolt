export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 1000);
};

export const calculateDeliveryFee = (
  distance: number,
  basePrice: number,
  distanceRanges: any
): number => {
  let deliveryFee = 0;

  for (let i = 0; i < distanceRanges.length; i++) {
    if (
      distance >= distanceRanges[i].min &&
      (distance < distanceRanges[i].max || distanceRanges[i].max === 0)
    ) {
      const a = distanceRanges[i].a;
      const b = distanceRanges[i].b;

      deliveryFee = basePrice + a + (b * distance) / 10;

      break;
    } else {
    }
  }

  return deliveryFee === 0 ? 0 : deliveryFee;
};
