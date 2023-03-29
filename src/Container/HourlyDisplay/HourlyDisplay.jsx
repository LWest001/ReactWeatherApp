import { Hour } from "./Hour/Hour";
import "./HourlyDisplay.css";
import { useSelector } from "react-redux";
import { selectWeatherData, selectDataView } from "../../app/appSlice";

export const HourlyDisplay = ({ dates }) => {
  const { hourlyData } = useSelector(selectWeatherData);
  const dataView = useSelector(selectDataView);

  let hoursArray = hourlyData.map((hour, i) => {
    return (
      <Hour
        key={hour.text.Time + hour.text.Date}
        index={i}
        date={hour.text.Date}
        dates={dates}
      />
    );
  });

  return (
    <div
      className="HourlyDisplay dataDisplay"
      style={dataView === "Hourly" ? { gridTemplateColumns: "1fr" } : {}}
    >
      {hoursArray}
    </div>
  );
};
