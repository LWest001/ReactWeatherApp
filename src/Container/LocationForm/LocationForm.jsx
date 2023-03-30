import { CountrySelector } from "../../Component/CountrySelector/CountrySelector";
import "./LocationForm.css";
// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Slice imports
import {
  // Selectors
  selectCoordinates,
  selectIsValidLocation,
  selectLocation,
  selectStatus,
  selectUnits,
  selectView,
  // fetchers
  getCoordinates,
  getLocalWeatherData,
  getLocationFromCoordinates,
  // setters
  setCoordinates,
  setIsValidLocation,
  setLocation,
  setStatus,
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

export const LocationForm = () => {
  const dispatch = useDispatch();

  /* ===== Selectors ===== */
  const { city, state, country, postalCode } = useSelector(selectLocation);
  const coordinates = useSelector(selectCoordinates);
  const status = useSelector(selectStatus);
  const location = useSelector(selectLocation);
  const units = useSelector(selectUnits);
  const view = useSelector(selectView);
  const isValidLocation = useSelector(selectIsValidLocation);

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
      units,
    };
    checked && localStorage.setItem("defaultCoordinates", JSON.stringify(data));
    dispatch(getLocalWeatherData(data));
    window.scrollTo(0, 0);
    !checked && localStorage.removeItem("defaultCoordinates");
  }

  // Set location data if default coordinates exist
  if (
    defaultCoordinates?.lat &&
    view === "LocationForm" &&
    status === "idle" &&
    !postalCode.length
  ) {
    const { lat, lon, city, state } = defaultCoordinates;
    dispatch(
      setCoordinates({
        lat,
        lon,
      })
    );
    dispatch(setLocation({ city, state, postalCode: "" }));
  }

  // Automatically fire weather data submission if new session
  useEffect(() => {
    if (!sessionStorage.getItem("session") && defaultCoordinates?.lat) {
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
    if (country.code === "US") {
      if (postalCode.length === 5) {
        dispatch(getCoordinates({ postalCode, countryCode: country.code }));
      } else {
        dispatch(setIsValidLocation(false));
        if (postalCode.length < 5) {
          dispatch(setStatus("idle"));
        } else {
          dispatch(setStatus("error"));
        }
      }
    }
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
    <Box
      className="LocationForm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "space-between",
        height: "90vh",
        m: 2,
      }}
    >
      <Box className="logoContainer">
        <img src="/favicon.svg" alt="WeatherNow logo" className="logo-image" />
        <Typography
          variant="h1"
          fontSize="2.2rem"
          height={0}
          position="relative"
          top="-55%"
        >
          WeatherNow
        </Typography>
      </Box>
      <Typography variant="h2" fontSize="1.5rem" my={1}>
        Get local weather information!
      </Typography>
      <Button
        variant="outlined"
        startIcon={<MyLocationIcon />}
        className="get-current-position"
        onClick={handleGeolocate}
        sx={{ width: "223px" }}
      >
        <Typography>Locate me</Typography>
      </Button>
      <Typography sx={{ my: 1 }}>or</Typography>
      <Stack component="form" onSubmit={handleSubmit}>
        <TextField
          label="US postal code"
          variant="outlined"
          id="postalCodeInput"
          type="number"
          max="99999"
          placeholder="Postal code (5-digit)"
          pattern="/^\d{5}$/"
          autoComplete="postal-code"
          sx={{ width: "223px" }}
          onChange={handleInputChange}
        ></TextField>
        {/* <label htmlFor="CountrySelector">Country or territory:</label> */}
        {/* <CountrySelector id="CountrySelector" /> */}
        <Button
          variant="contained"
          id="submit"
          type="submit"
          disabled={!isValidLocation}
          sx={{
            m: 1,
            width: "223px",
            bgcolor: "#ffab03",
            color: "black",
            "&:hover": { bgcolor: "#ffd480" },
          }}
        >
          <Typography>{submitButtonText()}</Typography>
        </Button>
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
    </Box>
  );
};
