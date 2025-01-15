import { useState } from "react";

const useLocation = () => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        () => setError("Unable to retrieve location.")
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return { latitude, longitude, fetchLocation, error };
};

export default useLocation;
