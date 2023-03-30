import { CountrySelector } from "../../Component/CountrySelector/CountrySelector";
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
  selectView,
  getLocationFromCoordinates,
  getCoordinates,
  setStatus,
  setIsValidLocation,
  selectIsValidLocation,
} from "../../app/appSlice";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Stack } from "@mui/system";
import { useState } from "react";

export const LocationForm = () => {
  const dispatch = useDispatch();
  // selectors
  const { city, state, country } = useSelector(selectLocation);
  const coordinates = useSelector(selectCoordinates);
  const status = useSelector(selectStatus);
  const location = useSelector(selectLocation);
  const units = useSelector(selectUnits);
  const view = useSelector(selectView);
  const isValidLocation = useSelector(selectIsValidLocation);
  const { postalCode } = location;

  const [checked, setChecked] = useState(true);

  // Event handlers
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

  function handleSubmit(e) {
    e.preventDefault();
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

  const defaultCoordinates = JSON.parse(
    localStorage.getItem("defaultCoordinates")
  );

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
