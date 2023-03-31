import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
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

  const optionsArr = ["Now", "Hourly", "Daily"];

  return (
    <Toolbar
      className="DataBar"
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        maxWidth: ["640px", "640px", "1200px"],
        minHeight: ["42px", "42px", "50px"],
        maxHeight: "42px",
        background: "radial-gradient(ellipse at bottom, #ffab03 30%, #fff0d3)",
      }}
    >
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
          sx={{
            justifyContent: ["end", "end", "space-between"],
            width: "100%",
            px: [0, 0, 3],
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
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
  );
};
