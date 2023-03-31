import "./Day.css";
import { useSelector } from "react-redux";
import { selectWeatherData } from "../../../../app/appSlice";
import { Paper, Typography } from "@mui/material";

export const Day = ({ index }) => {
  const { dailyData } = useSelector(selectWeatherData);
  const { Weekday, Min, Max } = dailyData[index].text;
  const { icon, weather } = dailyData[index];

  return (
    <div className={"Day"}>
      <Typography fontWeight="bold">
        {index !== 0 ? Weekday : "Today"}
      </Typography>
      <img src={icon} alt={weather} />
      <Paper sx={{ bgcolor: "initial" }} className="minMax">
        <p>{Min}</p>
        <p>{Max}</p>
      </Paper>
      <p>{weather}</p>
    </div>
  );
};