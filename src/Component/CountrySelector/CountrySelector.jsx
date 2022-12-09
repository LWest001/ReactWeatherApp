import { useEffect } from "react";
import countriesData from "../../assets/data/countries.json";

export const CountrySelector = (props) => {
  const { countryCode, setCountryCode, setCountry } = props;
  const CountriesOptions = () => {
    let optionsArray = [];
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

    useEffect(() => {
      const options = document.querySelectorAll("option");
      for (const option of options) {
        if (option.id !== "US") {
          option.disabled = "true";
        }
      }
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
