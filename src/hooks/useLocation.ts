import React from "react";

const useLocation = () => {
  const [latitude, setLatitude] = React.useState<string>("");
  const [longitude, setLongitude] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const fetchLocation = () => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: Infinity,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          //     // tallin 0,45  km
          setLongitude((24.759395).toString());
          setLatitude((59.43869).toString());
          //     // tallin 1,03 km
          //     setLongitude((24.769556).toString());
          //     setLatitude((59.439106).toString());

          // setLatitude(position.coords.latitude.toString());
          // setLongitude(position.coords.longitude.toString());
        },
        () => setError("Unable to retrieve location."),
        options
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return { latitude, longitude, fetchLocation, error };
};

export default useLocation;
