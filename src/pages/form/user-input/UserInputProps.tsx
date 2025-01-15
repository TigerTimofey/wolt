import React from "react";
import InputField from "../../../components/input-fields/InputField";
import LocationButton from "../../../components/buttons/location-button/LocationButton";
import CalculateButton from "../../../components/buttons/calculate-button/CalculateButton";
import SelectField from "../../../components/input-fields/SelectField";

import { venueOptions } from "../../../utils/venueOptions";

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
}) => (
  <>
    <div className="user-input">
      <SelectField
        label="Venue Slug"
        value={venueSlug}
        onChange={(e) => setVenueSlug(e.target.value)}
        testId="venueSlug"
        options={venueOptions}
      />

      <div className="input-field">
        <InputField
          label="Cart Value (EUR)"
          type="number"
          value={cartValue}
          onChange={(e) => setCartValue(e.target.value)}
          testId="cartValue"
        />
      </div>
      <div className="input-field">
        <InputField
          label="Latitude"
          type="number"
          value={latitude}
          onChange={() => {}}
          testId="userLatitude"
          disabled
        />
      </div>
      <div className="input-field">
        <InputField
          label="Longitude"
          type="number"
          value={longitude}
          onChange={() => {}}
          testId="userLongitude"
          disabled
        />
      </div>

      <div className="button-container">
        <LocationButton onFetchLocation={fetchLocation} />
        <CalculateButton onClick={handleCalculate} />
      </div>
    </div>
  </>
);

export default UserInput;
