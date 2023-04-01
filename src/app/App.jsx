import { LocationForm } from "../Container/LocationForm/LocationForm";
import { useEffect } from "react";
import { ResultsPage } from "../Container/ResultsPage/ResultsPage";

import {
  // Fetch functions
  getLocationFromCoordinates,
  // State setters
  setIsValidLocation,
  setStatus,
  setUnits,
  // State selectors
  selectCoordinates,
  selectLocation,
  selectView,
  resetState,
  initialState,
  selectBackgroundImage,
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
import { breakpoints, getDesignTokens, typography } from "../theme";

function App() {
  const dispatch = useDispatch();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? /* THEMING */
      "dark"
    : "light";

  let theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens(prefersDarkMode),
        ...breakpoints,
      }),
    [prefersDarkMode]
  );

  theme = createTheme({ ...theme, ...typography(theme) });

  // SELECTORS
  const { country, postalCode } = useSelector(selectLocation);
  const coordinates = useSelector(selectCoordinates);
  const view = useSelector(selectView);
  const backgroundImage = useSelector(selectBackgroundImage);

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

  useEffect(() => {
    document.querySelector(
      ":root"
    ).style.backgroundImage = `url(${backgroundImage})`;
  }, [backgroundImage]);

  // Event handlers
  const handleReturnHome = () => {
    dispatch(resetState(initialState));
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

export const { theme, prefersDarkMode } = App;

export default App;
