import { useEffect } from "react";
import countriesData from "../../assets/data/countries.json";
import { useSelector } from "react-redux";
import { selectLocation } from "../../app/appSlice";
import { useDispatch } from "react-redux";
import { setLocation } from "../../app/appSlice";

export const CountrySelector = () => {
  const dispatch = useDispatch();
  const { country } = useSelector(selectLocation);
  const location = useSelector(selectLocation);
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
    dispatch(
      setLocation({
        ...location,
        country: {
          ...location.country,
          name: document.getElementById(country.code).label,
        },
      })
    );
  }, [country.code]);

  return (
    <select
      name="country"
      id="countrySelector"
      value={country.code}
      onChange={(e) => {
        dispatch(
          setLocation({
            ...location,
            country: {
              code: e.target.value,
            },
          })
        );
      }}
    >
      <CountriesOptions />
    </select>
  );
};
