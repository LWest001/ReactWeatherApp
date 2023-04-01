import {
  AppBar,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { setDataView } from "../../app/appSlice";
import DataBarLabel from "./DataBarLabel";

export const DataBar = ({ onClick }) => {
  const [value, setValue] = useState("Now");
  const dispatch = useDispatch();
  const handleValue = (e) => {
    setValue(e.target.value);
    dispatch(setDataView(e.target.value));
  };

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? /* THEMING */
      "dark"
    : "light";

  const optionsArr = ["Now", "Hourly", "Daily"];

  return (
    <AppBar
      sx={{
        background:
          prefersDarkMode === "light"
            ? "radial-gradient(circle at left, #fff0d3, #ffd177)"
            : "none",
      }}
    >
      <Toolbar className="DataBar">
        <IconButton sx={{ mr: [1, 1, 4] }} tabIndex={0} onClick={onClick}>
          <HomeIcon />
        </IconButton>
        <FormControl fullWidth>
          <RadioGroup
            defaultValue="Now"
            name="radio-buttons-group"
            row
            onChange={handleValue}
            value={value}
            sx={{ justifyContent: "space-between" }}
          >
            {optionsArr.map((option) => {
              return (
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={<DataBarLabel label={option} />}
                  tabIndex={1}
                  key={"DataBar" + option}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};
