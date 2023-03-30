import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
import { setDataView } from "../../app/appSlice";

export const DataBar = ({ onChange, onClick }) => {
  const [value, setValue] = useState("Now");
  const dispatch = useDispatch();
  const handleValue = (e) => {
    setValue(e.target.value);
    dispatch(setDataView(e.target.value));
  };

  return (
    <Toolbar
      className="DataBar"
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        maxWidth: ["640px", "1200px"],
        minHeight: "42px",
        maxHeight: "42px",
        background: "radial-gradient(ellipse at bottom, #ffab03 30%, #fff0d3)",
      }}
    >
      <IconButton sx={{ mr: [1, 4] }} tabIndex={0} onClick={onClick}>
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
            justifyContent: ["end", "space-between"],
            width: "100%",
            px: [0, 3],
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <FormControlLabel
            value="Now"
            control={<Radio />}
            label="Now"
            tabIndex={1}
          />
          <FormControlLabel
            value="Hourly"
            control={<Radio />}
            label="Hourly"
            tabIndex={2}
          />
          <FormControlLabel
            value="Daily"
            control={<Radio />}
            label="Daily"
            tabIndex={3}
          />
        </RadioGroup>
      </FormControl>
    </Toolbar>
  );
};