import { CountrySelector } from "../../Component/CountrySelector/CountrySelector";
import "./LocationForm.css";
import icon from "../../../public/favicon.svg";
import { useSelector } from "react-redux";
import { selectLocation } from "../../app/appSlice";

export const LocationForm = (props) => {
  const {
    handleSubmit,
    location,
    setLocation,
    countryCode,
    setCountryCode,
    country,
    setCountry,
    coordinates,
    handleGeolocate,
    locationString,
    status,
  } = props;

  const displayInvalidPostalCode =
    location.postalCode.length >= 5 && !coordinates && status !== "loading"
      ? { display: "block" }
      : { display: "none" };

  function submitButtonText() {
    if (status === "loading") {
      return "Loading...";
    }
    if (status === "succeeded") {
      return "Get \n" + locationString + " \nweather!";
    }
    if (status === "idle") {
      return "Enter a location";
    }
  }
  return (
    <div className="LocationForm">
      <h1>WeatherNow</h1>
      {/* <img src={icon} alt="WeatherNow icon" className="form-icon" /> */}
      <h2>
        Enter your postal code and country to get local weather information!
      </h2>
      <button
        className="get-current-position"
        onClick={() => handleGeolocate()}
      >
        Locate me
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postalCodeInput">Postal code:</label>
        <input
          id="postalCodeInput"
          type="number"
          max="99999"
          placeholder="Postal code (5-digit)"
          value={location.postalCode}
          pattern="/^\d{5}$/"
          autoComplete="postal-code"
          onChange={(e) =>
            setLocation({ ...location, postalCode: e.target.value })
          }
          autoFocus
        ></input>
        <p className="invalidPostalCode" style={displayInvalidPostalCode}>
          Please enter a valid {country} postal code.
        </p>
        <label htmlFor="CountrySelector">Country or territory:</label>
        <CountrySelector
          id="CountrySelector"
          country={location.country}
          countryCode={location.countryCode}
          setCountryCode={setCountryCode}
          setCountry={setCountry}
          location={location}
          setLocation={setLocation}
        />
        <br />
        <input id="submit" type="submit" value={submitButtonText()}></input>
      </form>
    </div>
  );
};
