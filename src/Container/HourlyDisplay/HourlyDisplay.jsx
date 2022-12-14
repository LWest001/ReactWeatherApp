import { Hour } from "../Hour/Hour";
import "./HourlyDisplay.css";

export const HourlyDisplay = (props) => {
  const { hourlyData, currentDate } = props;
  const HoursGrid = () => {
    let hoursArray = [];
    hourlyData.forEach((hour) => {
      hoursArray.push(
        <Hour
          key={hour.text.Time + hour.text.Date}
          icon={hour.icon}
          time={hour.text.Time}
          date={hour.text.Date}
          currentDate={currentDate}
          temp={hour.text.Temperature}
          weather={hour.weather}
        />
      );
    });
    return hoursArray;
  };
  return (
    <div className="HourlyDisplay">
      <HoursGrid />
    </div>
  );
};
