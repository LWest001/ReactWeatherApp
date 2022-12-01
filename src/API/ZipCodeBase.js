import { zipcodebaseKey as apiKey } from "../assets/data/config";

const zipcodebaseUrl = "https://app.zipcodebase.com/api/v1/search?";
const authQuery = `apikey=${apiKey}`;

/*Return string name of location being processed to display onscreen*/
export const getLocationString = async (zipCode, countryCode) => {
  const fetchUrl = `${zipcodebaseUrl}${authQuery}&codes=${zipCode}&country=${countryCode}`;

  try {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const responseObject = await response.json();
      const locationData = responseObject["results"][`${zipCode}`][0];
      return `${locationData["city"]}, ${locationData["state_code"]}`;
    }
  } catch (error) {
    console.log(error);
  }
};
