const zipcodebaseUrl = "https://app.zipcodebase.com/api/v1/search?";

/*Return string name of location being processed to display onscreen*/
export const getLocationString = async (zipCode, countryCode) => {
  try {
    const url = `/.netlify/functions/fetch-zipCodeBase?zipCode=${zipCode}&countryCode=${countryCode}`;
    const response = await fetch(url);
    if (response.ok) {
      const responseObject = await response.json();
      return `${responseObject.city}, ${responseObject.state_code}`;
    }
  } catch (error) {
    console.log(error);
  }
};
