import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

import InputField from "./input-fields/InputField";
import LocationButton from "../../buttons/location-button/LocationButton";
import CalculateButton from "../../buttons/calculate-button/CalculateButton";
import SelectField from "./input-fields/SelectField";

import { venueOptions } from "../../../utils/fetch/venueOptions";

import "./UserInputProps.css";

interface UserInputProps {
  venueSlug: string;
  setVenueSlug: React.Dispatch<React.SetStateAction<string>>;
  cartValue: string;
  setCartValue: React.Dispatch<React.SetStateAction<string>>;
  latitude: string;
  longitude: string;

  handleCalculate: () => void;
  fetchLocation: () => void;
  isLocationError: boolean;
  isVenueError: boolean;
  isCartError: boolean;
}

const UserInput: React.FC<UserInputProps> = ({
  venueSlug,
  setVenueSlug,
  cartValue,
  setCartValue,
  latitude,
  longitude,
  fetchLocation,
  handleCalculate,
  isLocationError,
  isVenueError,
  isCartError,
}) => {
  const [prevCartValue, setPrevCartValue] = useState(cartValue);
  const [prevVenueSlug, setPrevVenueSlug] = useState(venueSlug);

  // Обработчик с debounce для calculate
  const debouncedCalculate = useCallback(
    debounce(() => {
      if (cartValue !== prevCartValue || venueSlug !== prevVenueSlug) {
        handleCalculate();
        setPrevCartValue(cartValue);
        setPrevVenueSlug(venueSlug);
      }
    }, 2000),
    [cartValue, venueSlug, prevCartValue, prevVenueSlug, handleCalculate]
  );

  // Следим за изменением данных
  useEffect(() => {
    debouncedCalculate();
    return debouncedCalculate.cancel; // Отмена дебаунса при размонтировании
  }, [cartValue, venueSlug, debouncedCalculate]);

  return (
    <>
      <div className="user-input">
        <div className={`input-field ${isVenueError ? "error" : ""}`}>
          <SelectField
            label="Venue Slug"
            value={venueSlug}
            onChange={(e) => setVenueSlug(e.target.value)}
            testId="venueSlug"
            options={venueOptions}
            aria-label="Select venue"
          />
        </div>

        <div className={`input-field ${isCartError ? "error" : ""}`}>
          <InputField
            label="Cart Value (EUR)"
            type="number"
            value={cartValue}
            onChange={(e) => setCartValue(e.target.value)}
            testId="cartValue"
            aria-label="cart value"
          />
        </div>

        <div className={`input-field ${isLocationError ? "error" : ""}`}>
          <InputField
            label="Latitude"
            type="number"
            value={latitude}
            onChange={() => {}}
            testId="userLatitude"
            aria-label="user latitude"
            disabled
          />
        </div>
        <div className={`input-field ${isLocationError ? "error" : ""}`}>
          <InputField
            label="Longitude"
            type="number"
            value={longitude}
            onChange={() => {}}
            testId="userLongitude"
            aria-label="user longitude"
            disabled
          />
        </div>

        <div className="button-container">
          <LocationButton
            onFetchLocation={fetchLocation}
            isLocationError={isLocationError}
          />
          <CalculateButton onClick={handleCalculate} />
        </div>
      </div>
    </>
  );
};

export default UserInput;
