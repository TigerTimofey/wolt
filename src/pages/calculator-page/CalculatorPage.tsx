import React, { useState } from "react";
import PriceSummary from "../../components/price-summary/PriceSummary";
import useLocation from "../../hooks/useLocation";
import { fetchVenueStaticData, fetchVenueDynamicData } from "../../utils/api";
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

  const handleCalculate = async () => {
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

    if (errorMessage) {
      setError(errorMessage.trim());
      return;
    }

    setError("");

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
      // const maxRange = distanceRanges[distanceRanges.length - 1].max;
      // if (maxRange === 0 || distance >= maxRange) {
      //   setError("Delivery not available for this distance.");
      //   return;
      // }

      const deliveryFeeCalc = calculateDeliveryFee(
        distance,
        basePrice,
        distanceRanges
      );

      if (deliveryFeeCalc === 0) {
        setError("Delivery not available for this distance.");
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

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
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

  const calculateDeliveryFee = (
    distance: number,
    basePrice: number,
    distanceRanges: any
  ) => {
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
      }
    }
    if (deliveryFee === 0) {
      return 0;
    }

    return deliveryFee;
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
