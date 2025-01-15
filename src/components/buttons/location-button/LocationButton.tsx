import React from "react";
import "./LocationButton.css";

interface LocationButtonProps {
  onFetchLocation: () => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onFetchLocation }) => {
  return (
    <button
      className="location-button"
      onClick={onFetchLocation}
      data-test-id="getLocation"
    >
      Locate
    </button>
  );
};

export default LocationButton;
