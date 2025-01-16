import React, { useState } from "react";
import PriceSummary from "../../components/price-summary/PriceSummary";
import useLocation from "../../hooks/useLocation";
import { fetchVenueStaticData, fetchVenueDynamicData } from "../../utils/api";
import {
  calculateDistance,
  calculateDeliveryFee,
} from "../../utils/calculations/mathUtils";
import {
  generateErrorMessage,
  isCartValueValid,
} from "../../components/error-message/errorMessageUtils";
import UserInput from "../form/user-input/UserInputProps";

import "./CalculatorPage.css";
import ErrorMessage from "../../components/error-message/ErrorMessageProps";

const CalculatorPage: React.FC = () => {
  const [venueSlug, setVenueSlug] = useState<string>("");
  const [cartValue, setCartValue] = useState<string>("");
  const [smallOrderSurcharge, setSmallOrderSurcharge] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartValueNum, setCartValueNum] = useState<number>(0);
  const {
    latitude,
    longitude,
    fetchLocation,
    error: locationError,
  } = useLocation();
  const [error, setError] = useState<string>("");
  const [deliveryNotAvailable, setDeliveryNotAvailable] =
    useState<boolean>(false);

  const handleCalculate = async () => {
    const errorMessage = generateErrorMessage(
      venueSlug,
      cartValue,
      latitude,
      longitude
    );
    if (errorMessage) {
      setError(errorMessage);
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
      const venueStatic = await fetchVenueStaticData(venueSlug);
      const venueDynamic = await fetchVenueDynamicData(venueSlug);

      const venueLocation = venueStatic.venue_raw.location.coordinates;
      const deliverySpecs = venueDynamic.venue_raw.delivery_specs;
      const minOrderNoSurcharge = deliverySpecs.order_minimum_no_surcharge;
      const basePrice = deliverySpecs.delivery_pricing.base_price;
      const distanceRanges = deliverySpecs.delivery_pricing.distance_ranges;
      console.log("distanceRanges", distanceRanges);

      const surcharge =
        cartValueNum < minOrderNoSurcharge
          ? minOrderNoSurcharge - cartValueNum
          : 0;

      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        venueLocation[1],
        venueLocation[0]
      );

      // Check if the distance exceeds the maximum allowed distance in distance ranges
      const validRanges = distanceRanges.filter(
        (range: { max: number }) => range.max !== 0
      );
      const maxValidRange = validRanges[validRanges.length - 1].max;

      console.log("maxValidRange", maxValidRange);
      console.log("distance", distance);

      const deliveryFeeCalc = calculateDeliveryFee(
        distance,
        basePrice,
        distanceRanges
      );

      if (distance >= maxValidRange || deliveryFeeCalc === 0) {
        // setError("Delivery not available for this distance.");
        setDeliveryNotAvailable(true);
        setTimeout(() => {
          setDeliveryNotAvailable(false);
        }, 3000);
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
  };

  return (
    <div className="delivery-calculator">
      <h1>Delivery Calculator</h1>
      <div className="divider"></div>
      <div className="content">
        <UserInput
          venueSlug={venueSlug}
          setVenueSlug={setVenueSlug}
          cartValue={cartValue}
          setCartValue={setCartValue}
          latitude={latitude}
          longitude={longitude}
          fetchLocation={fetchLocation}
          handleCalculate={handleCalculate}
        />

        <PriceSummary
          cartValue={cartValueNum}
          smallOrderSurcharge={smallOrderSurcharge}
          deliveryFee={deliveryFee}
          deliveryDistance={deliveryDistance}
          totalPrice={totalPrice}
          deliveryNotAvailable={deliveryNotAvailable}
        />
        <ErrorMessage
          message={error || locationError}
          onClose={() => setError("")}
        />
      </div>
    </div>
  );
};

export default CalculatorPage;
