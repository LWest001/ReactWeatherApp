import { CountrySelector_redux } from "../../Component/CountrySelector/CountrySelector_redux";
import "./LocationForm.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  selectCoordinates,
  selectLocation,
  selectStatus,
  setLocation,
  setCoordinates,
  getLocalWeatherData,
  selectUnits,
} from "../../app/appSlice";

export const LocationForm_redux = () => {
  const dispatch = useDispatch();
  // selectors
  const { postalCode, city, state, country } = useSelector(selectLocation);
  const coordinates = useSelector(selectCoordinates);
  const status = useSelector(selectStatus);
  const location = useSelector(selectLocation);
  const units = useSelector(selectUnits);

  const displayInvalidPostalCode =
    postalCode.length >= 5 && !coordinates && status !== "loading"
      ? { display: "block" }
      : { display: "none" };

  function handleGeolocate(e) {
    navigator.geolocation.getCurrentPosition((position) =>
      dispatch(
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      )
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      getLocalWeatherData({
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        units: units,
      })
    );
    window.scroll(0, 0);
  }
  function submitButtonText() {
    if (status === "loading") {
      return "Loading...";
    }
    if (status === "succeeded") {
      return `Get weather for ${city}!`;
    }
    if (status === "idle") {
      return "Enter a location";
    }
    if (status === "error") {
      return `Invalid ${country.name} postal code`;
    }
  }
  return (
    <div className="LocationForm">
      <div className="logoContainer">
        <img src="/favicon.svg" alt="WeatherNow logo" className="logo-image" />
        <h1>WeatherNow</h1>
      </div>
      <h2>Get local weather information!</h2>
      <button
        className="get-current-position"
        onClick={() => handleGeolocate()}
      >
        Locate me
      </button>
      <span className="locationForm">or</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postalCodeInput">US postal code:</label>
        <input
          id="postalCodeInput"
          type="number"
          max="99999"
          placeholder="Postal code (5-digit)"
          pattern="/^\d{5}$/"
          autoComplete="postal-code"
          onChange={(e) =>
            dispatch(setLocation({ ...location, postalCode: e.target.value }))
          }
          autoFocus
        ></input>
        <p className="invalidPostalCode" style={displayInvalidPostalCode}>
          Please enter a valid {country.name} postal code.
        </p>
        {/* <label htmlFor="CountrySelector">Country or territory:</label> */}
        {/* <CountrySelector_redux id="CountrySelector" /> */}
        <input id="submit" type="submit" value={submitButtonText()} />
      </form>
    </div>
  );
};
