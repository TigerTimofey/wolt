export const fetchVenueStaticData = async (venueSlug: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${venueSlug}/static`
  );
  return await response.json();
};

export const fetchVenueDynamicData = async (venueSlug: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${venueSlug}/dynamic`
  );
  return await response.json();
};
