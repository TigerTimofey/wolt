// export const fetchVenueStaticData = async (venueSlug: string) => {
//   const response = await fetch(
//     `${import.meta.env.VITE_API_URL}/${venueSlug}/static`
//   );
//   return await response.json();
// };

// export const fetchVenueDynamicData = async (venueSlug: string) => {
//   const response = await fetch(
//     `${import.meta.env.VITE_API_URL}/${venueSlug}/dynamic`
//   );
//   return await response.json();
// };

export const fetchVenueStaticData = async (venueSlug: string) => {
  const response = await fetch(
    `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`
  );
  return await response.json();
};

export const fetchVenueDynamicData = async (venueSlug: string) => {
  const response = await fetch(
    `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`
  );
  return await response.json();
};
