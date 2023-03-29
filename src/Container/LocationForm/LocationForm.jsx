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
} from "../../app/appSlice";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Stack } from "@mui/system";

export const LocationForm = ({ isValidLocation }) => {
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
    <Box
      className="LocationForm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "space-between",
        height: "90vh",
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
        onClick={() => handleGeolocate()}
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
          onChange={(e) =>
            dispatch(setLocation({ ...location, postalCode: e.target.value }))
          }
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
      </Stack>
    </Box>
  );
};
