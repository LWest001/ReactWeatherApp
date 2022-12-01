import { CountrySelector } from "../CountrySelector/CountrySelector";
import React, { useEffect } from "react";
import "./LocationForm.css";

export const LocationForm = (props) => {
  const {
    toggleView,
    handleSubmit,
    postalCode,
    setPostalCode,
    country,
    setCountry,
  } = props;
  const display =
    toggleView === "LocationForm" ? { display: "flex" } : { display: "none" };

  return (
    <div className="LocationForm" style={display}>
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
          onChange={(e) => setPostalCode(e.target.value)}
        ></input>
        <label htmlFor="CountrySelector">Country or territory:</label>
        <CountrySelector
          id="CountrySelector"
          value={country}
          onChange={setCountry}
        />
        <br />
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
};
