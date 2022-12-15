import { CountrySelector } from "../../Component/CountrySelector/CountrySelector";
import "./LocationForm.css";

export const LocationForm = (props) => {
  const {
    handleSubmit,
    postalCode,
    setPostalCode,
    countryCode,
    setCountryCode,
    country,
    setCountry,
    coordinates,
    handleGeolocate,
  } = props;

  const displayInvalidPostalCode =
    coordinates !== "invalidZip" && postalCode.length <= 5
      ? { display: "none" }
      : { display: "block" };

  return (
    <div className="LocationForm">
      <h1>
        Enter your postal code and country to get local weather information!
      </h1>
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
          value={postalCode}
          pattern="/^\d{5}$/"
          autoComplete="postal-code"
          onChange={(e) => setPostalCode(e.target.value)}
          autoFocus
        ></input>
        <p className="invalidPostalCode" style={displayInvalidPostalCode}>
          Please enter a valid {country} postal code.
        </p>
        <label htmlFor="CountrySelector">Country or territory:</label>
        <CountrySelector
          id="CountrySelector"
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          setCountry={setCountry}
        />
        <br />
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
};
