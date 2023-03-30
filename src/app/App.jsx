import "./App.css";
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
  const { country } = useSelector(selectLocation);
  const coordinates = useSelector(selectCoordinates);
  const view = useSelector(selectView);

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
    dispatch(setCoordinates({ lat: "", lon: "" }));
    dispatch(
      setWeatherData({
        currentData: {
          text: {
            Temperature: "",
            Weather: "",
            "Feels like": "",
            "Wind speed": "",
            Humidity: "",
            Sunrise: "",
            Sunset: "",
            "UV index": "",
            Time: "",
            Date: "",
          },
          icon: "",
          daySegment: "",
          weatherType: "",
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
        postalCode: "",
        city: "",
        state: "",
        country: { name: "United States", code: "US" },
      })
    );
    window.scroll(0, 0);
  };

  return (
    <Container className="App">
      {view === "LocationForm" && <LocationForm />}
      {view === "ResultsPage" && <ResultsPage onClick={handleReturnHome} />}
    </Container>
  );
}

export default App;
