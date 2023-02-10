import "./Hour.css";
import { useSelector } from "react-redux";
import { selectDataView, selectWeatherData } from "../../../app/appSlice";
export const Hour = (props) => {
  const { date, dates, index } = props;
  const dataView = useSelector(selectDataView);
  const { hourlyData } = useSelector(selectWeatherData);
  const hourData = hourlyData[index];
  const bgColor = () => {
    if (date === dates.tomorrow) {
      if (dataView !== "Hourly") {
        return {
          background:
            "linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(255,255,0,0.05) 5%, rgba(255,255,0,0.3) 100%)",
        };
      }
      return {
        background:
          "linear-gradient(270deg, rgba(2,0,36,0) 0%, rgba(255,255,0,0.05) 5%, rgba(255,255,0,0.3) 100%)",
      };
    } else if (date === dates.followingDay) {
      if (dataView !== "Hourly") {
        return {
          background:
            "linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(0,255,8,0.05) 5%, rgba(0,255,8,.5) 100%)",
        };
      }
      return {
        background:
          "linear-gradient(270deg, rgba(2,0,36,0) 0%, rgba(0,255,8,0.05) 5%, rgba(0,255,8,.5) 100%)",
      };
    } else {
      return { backgroundColor: "" };
    }
  };
  return (
    <div className={"Hour " + dataView} style={bgColor()}>
      <h4>{hourData.text.Time}</h4>
      <img src={hourData.icon} alt={hourData.weather} />
      <p>{hourData.text.Temperature}</p>
      <p>{hourData.weather}</p>
    </div>
  );
};
