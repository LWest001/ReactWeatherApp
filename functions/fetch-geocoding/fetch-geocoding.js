// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require("axios");

const handler = async (event) => {
  const apiKey = process.env.openWeatherKey;
  const { lat, lon, limit } = event.queryStringParameters;
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=$apiKey}`;
  try {
    const { data } = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };
