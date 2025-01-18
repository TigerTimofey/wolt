import React from "react";
import PriceSummary from "../../components/price-summary/PriceSummary";
import useLocation from "../../hooks/useLocation";
import UserInput from "../../components/form/user-input/UserInputProps";
import ErrorMessage from "../../components/error-message/ErrorMessageProps";
import { useDeliveryCalculator } from "../../utils/calculations/useDeliveryCalculator";

import "./CalculatorPage.css";

const CalculatorPage: React.FC = () => {
  const [venueSlug, setVenueSlug] = React.useState<string>("");
  const [cartValue, setCartValue] = React.useState<string>("");

  const {
    latitude,
    longitude,
    fetchLocation,
    error: locationError,
  } = useLocation();

  const {
    smallOrderSurcharge,
    deliveryFee,
    deliveryDistance,
    totalPrice,
    cartValueNum,
    error,
    deliveryNotAvailable,
    handleCalculate,
    setError,
  } = useDeliveryCalculator(venueSlug, cartValue, latitude, longitude);

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
          isLocationError={error.includes("Location is missing")}
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
