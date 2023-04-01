import "./Day.css";
import { useSelector } from "react-redux";
import { selectWeatherData } from "../../../../app/appSlice";
import { Paper, Typography } from "@mui/material";

export const Day = ({ index }) => {
  const { dailyData } = useSelector(selectWeatherData);
  const { Weekday, Min, Max } = dailyData[index];
  const { icon, weather } = dailyData[index];

  return (
    <div className={"Day"}>
      <Typography fontWeight="bold">
        {index !== 0 ? Weekday : "Today"}
      </Typography>
      <img src={icon} alt={weather} />
      <Paper
        sx={{
          background:
            "linear-gradient(90deg,rgba(117, 192, 234, 0.5) 0%,rgba(237, 27, 36, 0.5) 100%)",
        }}
        className="minMax"
      >
        <p>{Min}</p>
        <p>{Max}</p>
      </Paper>
      <p>{weather}</p>
    </div>
  );
};
