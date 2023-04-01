import { LocationForm } from "../Container/LocationForm/LocationForm";
import { useEffect } from "react";
import { ResultsPage } from "../Container/ResultsPage/ResultsPage";

import {
  // Fetch functions
  getLocationFromCoordinates,
  // State setters
  setBackgroundImage,
  setIsValidLocation,
  setStatus,
  setCoordinates,
  setLocation,
  setUnits,
  setView,
  setWeatherData,
  // State selectors
  selectCoordinates,
  selectLocation,
  selectView,
} from "./appSlice";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Container } from "@mui/material";

function App() {
  const dispatch = useDispatch();

  // selectors
  const { country, postalCode } = useSelector(selectLocation);
  const coordinates = useSelector(selectCoordinates);
  const view = useSelector(selectView);

  // Validate postal code
  useEffect(() => {
    if (postalCode === null) return;
    if (country?.code === "US") {
      if (postalCode.length === 5) return;
      dispatch(setIsValidLocation(false));
      if (postalCode.length > 5) {
        dispatch(setStatus("error"));
      } else if (postalCode.length < 5) {
        dispatch(setStatus("idle"));
      }
    }
  }, [postalCode]);

  // Set units to imperial for US, Liberia, and Myanmar
  useEffect(() => {
    setUnits(
      country?.code === "US" || country?.code === "LR" || country?.code === "MM"
        ? "imperial"
        : "metric"
    );
  }, [country]);

  // Get location when coordinates are valid
  useEffect(() => {
    if (coordinates?.lat) {
      const { lat, lon } = coordinates;
      dispatch(
        getLocationFromCoordinates({
          lat,
          lon,
        })
      );
    }
  }, [coordinates]);

  // Event handlers
  const handleReturnHome = () => {
    dispatch(setView("LocationForm"));
    dispatch(setCoordinates({ lat: null, lon: null }));
    dispatch(
      setWeatherData({
        currentData: {
          text: {
            Temperature: null,
            Weather: null,
            "Feels like": null,
            "Wind speed": null,
            "Wind direction": null,
            Humidity: null,
            Sunrise: null,
            Sunset: null,
            "UV index": null,
            Time: null,
            Date: null,
          },
          icon: null,
          daySegment: null,
          weatherType: null,
        },
        hourlyData: [],
        dailyData: [],
      })
    );
    dispatch(setBackgroundImage(null));
    dispatch(setStatus("idle"));
    dispatch(setIsValidLocation(false));
    dispatch(
      setLocation({
        postalCode: null,
        city: null,
        state: null,
        country: { name: "United States", code: "US" },
      })
    );
    window.scroll(0, 0);
  };

  return (
    <Container
      className="App"
      sx={{
        textAlign: "center",
      }}
    >
      {view === "LocationForm" && <LocationForm />}
      {view === "ResultsPage" && <ResultsPage onClick={handleReturnHome} />}
    </Container>
  );
}

export default App;
