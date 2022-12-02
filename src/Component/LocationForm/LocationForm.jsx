import { CountrySelector } from "../CountrySelector/CountrySelector";
import React, { useEffect } from "react";
import "./LocationForm.css";

export const LocationForm = (props) => {
  const {
    toggleView,
    handleSubmit,
    postalCode,
    setPostalCode,
    countryCode,
    setCountryCode,
    country,
    setCountry,
    isValidPostalCode,
  } = props;

  const displayForm =
    toggleView === "LocationForm" ? { display: "flex" } : { display: "none" };

  const displayInvalidPostalCode =
    isValidPostalCode || postalCode.length < 5
      ? { display: "none" }
      : { display: "block" };

  return (
    <div className="LocationForm" style={displayForm}>
      <h1>
        Enter your postal code and country to get local weather information!
      </h1>
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
        ></input>
        <p className="invalidPostalCode" style={displayInvalidPostalCode}>
          Please enter a valid {country} postal code.
        </p>
        <label htmlFor="CountrySelector">Country or territory:</label>
        <CountrySelector
          id="CountrySelector"
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          country={country}
          setCountry={setCountry}
        />
        <br />
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
};
