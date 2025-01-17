import React from "react";
import "./LocationButton.css";

interface LocationButtonProps {
  onFetchLocation: () => void;
  isLocationError: boolean; // <-- add this prop
}

const LocationButton: React.FC<LocationButtonProps> = ({
  onFetchLocation,
  isLocationError,
}) => {
  return (
    <button
      className={`location-button ${isLocationError ? "shake" : ""}`} // <-- apply 'shake' class if there's a location error
      onClick={onFetchLocation}
      data-test-id="getLocation"
    >
      Locate
    </button>
  );
};

export default LocationButton;
