import { CountrySelector_redux } from "../../Component/CountrySelector/CountrySelector_redux";
import "./LocationForm.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  selectCoordinates,
  selectLocation,
  selectStatus,
  setLocation,
} from "../../app/appSlice";

export const LocationForm_redux = (props) => {
  const dispatch = useDispatch();
  // selectors
  const { postalCode, city, state, country } = useSelector(selectLocation);
  const coordinates = useSelector(selectCoordinates);
  const status = useSelector(selectStatus);
  const location = useSelector(selectLocation);

  const { handleSubmit, handleGeolocate } = props;

  const displayInvalidPostalCode =
    postalCode.length >= 5 && !coordinates && status !== "loading"
      ? { display: "block" }
      : { display: "none" };

  function submitButtonText() {
    if (status === "loading") {
      return "Loading...";
    }
    if (status === "succeeded") {
      return `Get \n  ${city}, ${state} \nweather!`;
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
        <label htmlFor="CountrySelector">Country or territory:</label>
        <CountrySelector_redux id="CountrySelector" />
        <br />
        <input id="submit" type="submit" value={submitButtonText()}></input>
      </form>
    </div>
  );
};
