import { useEffect } from "react";
import countriesData from "../../assets/data/countries.json";

export const CountrySelector = (props) => {
  const { countryCode, setCountryCode, setCountry } = props;
  const CountriesOptions = () => {
    const optionsArray = [];
    countriesData.forEach((country) => {
      optionsArray.push(
        <option
          value={country.code}
          id={country.code}
          key={country.code}
          label={country.name}
        >
          {country.name}
        </option>
      );
    });
    return optionsArray;
  };

  useEffect(() => {
    setCountry(document.getElementById(countryCode).label);
  }, [countryCode]);

  return (
    <select
      name="country"
      id="countrySelector"
      value={countryCode}
      onChange={(e) => {
        setCountryCode(e.target.value);
      }}
    >
      <CountriesOptions />
    </select>
  );
};
