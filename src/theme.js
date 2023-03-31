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

theme.typography.h1 = {
  [theme.breakpoints.up('xs')]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: "2.2rem",
  },
  [theme.breakpoints.up('md')]: {
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

export default theme;
