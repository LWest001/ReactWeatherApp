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
import {
  Container,
  createTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";

function App() {
  const dispatch = useDispatch();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  let theme = useMemo(() => createTheme(getDesignTokens(prefersDarkMode)), [
    prefersDarkMode,
  ]);

  theme = createTheme(theme, {
    values: {
      xs: 0,
      sm: 350,
      md: 500,
      lg: 900,
      xl: 1200,
    },
  });

  theme.typography.h1 = {
    margin: "inherit",
    [theme.breakpoints.up("xs")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5rem",
    },
  };

  theme.typography.h2 = {
    // fontSize: "1.2rem",
    fontWeight: "bold",
  };
  theme.typography.h4 = {
    fontSize: "19.2px",
    fontWeight: "normal",
  };

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
    <ThemeProvider theme={theme}>
      <Container
        className="App"
        sx={{
          textAlign: "center",
        }}
      >
        {view === "LocationForm" && <LocationForm />}
        {view === "ResultsPage" && <ResultsPage onClick={handleReturnHome} />}
      </Container>
    </ThemeProvider>
  );
}

function getDesignTokens(mode) {
  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: "#ffab03",
              light: "rgb(255, 187, 53)",
              dark: "rgb(178, 119, 2)",
            },
            secondary: {
              main: "#640061",
            },
            background: {
              default: "d3d3d3",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#ffab03",
              light: "rgb(255, 187, 53)",
            },
            secondary: {
              main: "#640061",
            },
            background: {
              default: "darkslategrey",
            },
          }),
    },
  };
}

export const { theme } = App;

export default App;
