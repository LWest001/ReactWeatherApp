import { Hour } from "./Hour/Hour";
import "./HourlyDisplay.css";
import { useSelector } from "react-redux";
import { selectWeatherData, selectDataView } from "../../../app/appSlice";
import { Paper } from "@mui/material";
import DaySeparator from "./DaySeparator";

export const HourlyDisplay = ({ dates }) => {
  const { hourlyData } = useSelector(selectWeatherData);
  const dataView = useSelector(selectDataView);
  const { today, tomorrow, followingDay, followingDayName } = dates;

  // Create Hour elements array
  let hoursArray = hourlyData.map((hour, i) => {
    return (
      <Hour
        key={hour.Time + hour.Date}
        index={i}
        date={hour.Date}
        dates={dates}
        type="hour"
      />
    );
  });

  // Add DaySeparator boxes

  // Today
  hoursArray.splice(
    0,
    0,
    <DaySeparator
      date={today}
      dates={dates}
      dataView={dataView}
      displayText="Today"
      type="separator"
      key="seperatorToday"
    />
  );

  // Tomorrow
  const tomorrowIndex = hoursArray.findIndex(
    (hour) => hour.props.type === "hour" && hour.props.date === tomorrow
  );

  hoursArray.splice(
    tomorrowIndex,
    0,
    <DaySeparator
      date={tomorrow}
      dates={dates}
      dataView={dataView}
      displayText="Tomorrow"
      key="seperatorTomorrow"
    />
  );

  // Following day
  const followingDayIndex = hoursArray.findIndex(
    (hour) => hour.props.type === "hour" && hour.props.date === followingDay
  );

  hoursArray.splice(
    followingDayIndex,
    0,
    <DaySeparator
      date={followingDay}
      dates={dates}
      dataView={dataView}
      displayText={followingDayName}
      key="separatorFollowing"
    />
  );

  return (
    <Paper
      className="HourlyDisplay dataDisplay"
      sx={{
        gridTemplateColumns: dataView === "Hourly" && "1fr",
        bgcolor: "initial",
      }}
    >
      {hoursArray}
    </Paper>
  );
};
