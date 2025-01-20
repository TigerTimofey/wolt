const apiUrl = process.env.VITE_REACT_API_URL

export const fetchVenueStaticData = async (venueSlug: string) => {
  const response = await fetch(
    `${apiUrl}/${venueSlug}/static`
  );
  return await response.json();
};

export const fetchVenueDynamicData = async (venueSlug: string) => {
  const response = await fetch(
    `${apiUrl}/${venueSlug}/dynamic`
  );
  return await response.json();
};
