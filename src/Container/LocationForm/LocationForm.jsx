import { CountrySelector } from "../../Component/CountrySelector/CountrySelector";
import "./LocationForm.css";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Slice imports
import {
  // Selectors
  selectCoordinates,
  selectLocation,
  selectStatus,
  selectUnits,
  // fetchers
  getCoordinates,
  getLocalWeatherData,
  getLocationFromCoordinates,
  // setters
  setCoordinates,
  setLocation,
  setView,
} from "../../app/appSlice";

// MUI components
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SubmitButton from "./SubmitButton";

export const LocationForm = () => {
  const dispatch = useDispatch();

  /* ===== Selectors ===== */
  const { city, state, country, postalCode } = useSelector(selectLocation);
  const coordinates = useSelector(selectCoordinates);
  const status = useSelector(selectStatus);
  const location = useSelector(selectLocation);
  const units = useSelector(selectUnits);

  const [checked, setChecked] = useState(true);

  // Find default coordinates
  const defaultCoordinates = JSON.parse(
    localStorage.getItem("defaultCoordinates")
  );

  /* ===== Event handlers ===== */
  function handleGeolocate() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lon } = position.coords;
      dispatch(
        setCoordinates({
          lat,
          lon,
        })
      );
      dispatch(
        getLocationFromCoordinates({
          lat,
          lon,
        })
      );
    });
  }

  // Handler for submit button, and auto-fire if new session & default coords
  function handleSubmit(e) {
    e.preventDefault();
    sessionStorage.setItem("session", Date.now());
    const { lat, lon } = coordinates;
    const data = {
      lat,
      lon,
      city,
      state,
      country,
      units,
    };

    if (checked && data?.lat) {
      localStorage.setItem("defaultCoordinates", JSON.stringify(data));
    }

    dispatch(getLocalWeatherData(data));
    window.scrollTo(0, 0);
    !checked && localStorage.removeItem("defaultCoordinates");
  }

  // Set location data if default coordinates exist
  if (defaultCoordinates?.lat && !coordinates.lat && !postalCode) {
    const { lat, lon, city, state, country } = defaultCoordinates;
    dispatch(
      setCoordinates({
        lat,
        lon,
      })
    );
    dispatch(setLocation({ city, state, postalCode: null, country }));
  }

  // Automatically fire weather data submission if new session
  useEffect(() => {
    if (
      !sessionStorage.getItem("session") &&
      defaultCoordinates?.lat &&
      coordinates?.lat
    ) {
      dispatch(setView("ResultsPage"));
      handleSubmit(new Event("click"));
    }
  }, [coordinates]);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  function handleInputChange(e) {
    const postalCode = e.target.value;
    dispatch(setLocation({ ...location, postalCode }));
    if (country?.code === "US") {
      if (postalCode.length === 5) {
        dispatch(getCoordinates({ postalCode, countryCode: country.code }));
      }
    }
  }

  return (
    <Stack
      className="LocationForm"
      sx={{
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
        m: 2,
        color: "background.contrastText",
      }}
    >
      <Box className="logoContainer">
        <img src="/favicon.svg" alt="WeatherNow logo" className="logo-image" />
        <Typography
          variant="h1"
          position="relative"
          top="-50%"
          className="logoMark"
        >
          WeatherNow
        </Typography>
      </Box>
      <Typography variant="h2" my={1}>
        Get local weather information!
      </Typography>
      <Button
        variant="contained"
        startIcon={<MyLocationIcon />}
        className="get-current-position"
        onClick={handleGeolocate}
        sx={{ width: "223px" }}
      >
        Locate me
      </Button>
      <Typography sx={{ my: 1 }}>or</Typography>
      <Stack component="form" onSubmit={handleSubmit} alignItems="center">
        <TextField
          autoComplete="postal-code"
          error={status === "error"}
          id="postalCodeInput"
          label="US postal code"
          pattern="/^\d{5}$/"
          placeholder="Postal code (5-digit)"
          type="number"
          variant="outlined"
          sx={{ width: "223px" }}
          onChange={handleInputChange}
        ></TextField>
        {/* <label htmlFor="CountrySelector">Country or territory:</label> */}
        {/* <CountrySelector id="CountrySelector" /> */}

        <SubmitButton />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Use as default location"
        />
      </Stack>
    </Stack>
  );
};
