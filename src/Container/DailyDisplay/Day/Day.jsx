import "./Day.css";
import { useSelector } from "react-redux";
import { selectWeatherData } from "../../../app/appSlice";

export const Day = ({ index }) => {
  const { dailyData } = useSelector(selectWeatherData);
  const dayData = dailyData[index];
  return (
    <div className={"Day"}>
      <h4>{dayData.text.Weekday}</h4>
      <img src={dayData.icon} alt={dayData.weather} />
      <div className="minMax">
        <p>{dayData.text.Min}</p>
        <p>{dayData.text.Max}</p>
      </div>
      <p>{dayData.weather}</p>
    </div>
  );
};
