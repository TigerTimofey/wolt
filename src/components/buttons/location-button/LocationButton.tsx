import React from "react";
import "./LocationButton.css";

interface LocationButtonProps {
  onFetchLocation: () => void;
  isLocationError: boolean;
}

const LocationButton: React.FC<LocationButtonProps> = ({
  onFetchLocation,
  isLocationError,
}) => {
  return (
    <button
      className={`location-button ${isLocationError ? "shake" : ""}`}
      onClick={onFetchLocation}
      data-test-id="getLocation"
    >
      Locate
    </button>
  );
};

export default LocationButton;
