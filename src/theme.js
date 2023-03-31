import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 350,
      md: 500,
      lg: 900,
      xl: 1200,
    },
  },
});

theme.components.MuiContainer = {};

theme.typography.h2 = {
  fontSize: "19.2px",
  fontWeight: "bold",
};
theme.typography.h4 = {
  fontSize: "19.2px",
  fontWeight: "normal",
};

export default theme;
