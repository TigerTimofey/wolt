import React, { useCallback } from "react";
import {
  fetchVenueStaticData,
  fetchVenueDynamicData,
} from "../../utils/fetch/api";
import {
  calculateDistance,
  calculateDeliveryFee,
} from "../../utils/calculations/mathUtils";
import {
  generateErrorMessage,
  isCartValueValid,
} from "../../components/error-message/errorMessageUtils";

const fetchVenueData = async (venueSlug: string) => {
  const venueStatic = await fetchVenueStaticData(venueSlug);
  const venueDynamic = await fetchVenueDynamicData(venueSlug);

  return { venueStatic, venueDynamic };
};

const calculateSurchargeAndValidate = (
  cartValueNum: number,
  minOrderNoSurcharge: number
) => {
  const surcharge =
    cartValueNum < minOrderNoSurcharge ? minOrderNoSurcharge - cartValueNum : 0;
  return surcharge;
};

const calculateDistanceAndValidate = (
  latitude: string,
  longitude: string,
  venueLocation: number[],
  distanceRanges: { max: number }[]
) => {
  const distance = calculateDistance(
    parseFloat(latitude),
    parseFloat(longitude),
    venueLocation[1],
    venueLocation[0]
  );
  const validRanges = distanceRanges.filter(
    (range: { max: number }) => range.max !== 0
  );
  const maxValidRange = validRanges[validRanges.length - 1].max;
  return { distance, maxValidRange };
};

export const useDeliveryCalculator = (
  venueSlug: string,
  cartValue: string,
  latitude: string,
  longitude: string
) => {
  const [smallOrderSurcharge, setSmallOrderSurcharge] =
    React.useState<number>(0);
  const [deliveryFee, setDeliveryFee] = React.useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = React.useState<number>(0);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [cartValueNum, setCartValueNum] = React.useState<number>(0);
  const [error, setError] = React.useState<string>("");
  const [deliveryNotAvailable, setDeliveryNotAvailable] =
    React.useState<boolean>(false);

  const handleCalculate = useCallback(async () => {
    const errorMessage = generateErrorMessage(
      venueSlug,
      cartValue,
      latitude,
      longitude
    );
    if (errorMessage) {
      setError(errorMessage);
      console.log(errorMessage);

      return;
    }
    setError("");

    if (!isCartValueValid(cartValue)) {
      setError("Invalid cart value.");
      return;
    }

    const cartValueNum = parseFloat(cartValue) * 100;
    setCartValueNum(cartValueNum);
    if (isNaN(cartValueNum) || cartValueNum <= 0) {
      setError("Invalid cart value.");
      return;
    }

    try {
      const { venueStatic, venueDynamic } = await fetchVenueData(venueSlug);

      const venueLocation = venueStatic.venue_raw.location.coordinates;
      const deliverySpecs = venueDynamic.venue_raw.delivery_specs;
      const minOrderNoSurcharge = deliverySpecs.order_minimum_no_surcharge;
      const basePrice = deliverySpecs.delivery_pricing.base_price;
      const distanceRanges = deliverySpecs.delivery_pricing.distance_ranges;

      const surcharge = calculateSurchargeAndValidate(
        cartValueNum,
        minOrderNoSurcharge
      );
      const { distance, maxValidRange } = calculateDistanceAndValidate(
        latitude,
        longitude,
        venueLocation,
        distanceRanges
      );

      const deliveryFeeCalc = calculateDeliveryFee(
        distance,
        basePrice,
        distanceRanges
      );

      if (distance >= maxValidRange || deliveryFeeCalc === 0) {
        setDeliveryNotAvailable(true);
        setTimeout(() => setDeliveryNotAvailable(false), 3000);
        return;
      }

      const total = cartValueNum + surcharge + deliveryFeeCalc;

      setSmallOrderSurcharge(surcharge);
      setDeliveryFee(deliveryFeeCalc);
      setDeliveryDistance(distance);
      setTotalPrice(total);
    } catch (err) {
      setError("Error fetching venue data.");
    }
  }, [venueSlug, cartValue, latitude, longitude]);

  return {
    smallOrderSurcharge,
    deliveryFee,
    deliveryDistance,
    totalPrice,
    cartValueNum,
    error,
    setError,
    deliveryNotAvailable,
    handleCalculate,
  };
};
