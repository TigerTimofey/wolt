import { useState } from "react";

const useLocation = () => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // tallin 0,27 km
          // setLongitude((24.755136).toString());
          // setLatitude((59.440084).toString());
          // tallin 0,45  km
          // setLongitude((24.759395).toString());
          // setLatitude((59.43869).toString());
          // tallin 1,03 km
          setLongitude((24.769556).toString());
          setLatitude((59.439106).toString());
          // tallin 1,56 km
          // setLongitude((24.778842).toString());
          // setLatitude((59.439986).toString());
          // tallin 7,03 km
          // setLongitude((24.7941).toString());
          // setLatitude((59.443327).toString());
          // setLatitude(position.coords.latitude.toString());
          // setLongitude(position.coords.longitude.toString());
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
