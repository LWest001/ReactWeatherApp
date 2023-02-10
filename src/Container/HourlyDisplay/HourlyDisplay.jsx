import { Hour } from "./Hour/Hour";
import "./HourlyDisplay.css";
import { useSelector } from "react-redux";
import { selectWeatherData, selectDataView } from "../../app/appSlice";

export const HourlyDisplay = ({ dates }) => {
  const { hourlyData } = useSelector(selectWeatherData);
  const dataView = useSelector(selectDataView);
  const HoursGrid = () => {
    let hoursArray = [];
    hourlyData.forEach((hour, i) => {
      hoursArray.push(
        <Hour
          key={hour.text.Time + hour.text.Date}
          index={i}
          date={hour.text.Date}
          dates={dates}
        />
      );
    });
    return hoursArray;
  };
  return (
    <div
      className="HourlyDisplay"
      style={dataView === "Hourly" ? { gridTemplateColumns: "1fr" } : {}}
    >
      <HoursGrid />
    </div>
  );
};
