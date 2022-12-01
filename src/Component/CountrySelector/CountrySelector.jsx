import React from "react";
import countriesData from "../../assets/data/countries.json";

export const CountrySelector = (props) => {
  const CountriesOptions = () => {
    const optionsArray = [];
    countriesData.forEach((country) => {
      optionsArray.push(
        <option value={country.code} key={country.code}>
          {country.name}
        </option>
      );
    });
    return optionsArray;
  };
  
  return (
    <select
      name="country"
      id="countrySelector"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <CountriesOptions />
    </select>
  );
};
