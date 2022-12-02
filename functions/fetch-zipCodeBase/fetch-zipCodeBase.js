const axios = require("axios");

const handler = async (event) => {
  const apiKey = process.env.zipcodebaseKey;
  const { zipCode, countryCode } = event.queryStringParameters;
  const url = `https://app.zipcodebase.com/api/v1/search?&apikey=${apiKey}&codes=${zipCode}&country=${countryCode}`;
  try {
    console.log(await axios.get(url));
    console.log(url);
    const { data } = await axios.get(url, {
      headers: {
        "Accept-Encoding": "application/json",
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data.results[`${zipCode}`][0]),
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
