import { createTheme } from "@mui/material";
export function getDesignTokens(mode) {
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
              default: "whitesmoke",
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
              contrastText: "white",
            },
          }),
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage:
              mode === "light"
                ? "radial-gradient(ellipse at top, #e7e7e7, transparent), radial-gradient(ellipse at bottom, #c0c0c0, transparent)"
                : "radial-gradient(ellipse at top, rgba(23,24,59,1), transparent), radial-gradient(ellipse at bottom, #c0c0c0, transparent)",
          },
        },
      },
    },
  };
}

export const breakpoints = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 350,
      md: 500,
      lg: 900,
      xl: 1200,
    },
  },
};

export function typography(theme) {
  return {
    typography: {
      h1: {
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
      },
      h2: {
        fontWeight: "bold",
        [theme.breakpoints.up("xs")]: {
          fontSize: "1.2rem",
        },
        [theme.breakpoints.up("sm")]: {
          fontSize: "1.3rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "1.5rem",
        },
      },
      h4: { fontSize: "19.2px", fontWeight: "normal" },
    },
  };
}

// export default theme;
