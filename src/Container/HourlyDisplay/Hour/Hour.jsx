import "./Hour.css";
import { useSelector } from "react-redux";
import { selectDataView } from "../../../app/appSlice";
export const Hour = (props) => {
  const dataView = useSelector(selectDataView);
  const { time, date, dates, icon, temp, weather } = props;
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
      <h4>{time}</h4>
      <img src={icon} alt={weather} />
      <p>{temp}</p>
      <p>{weather}</p>
    </div>
  );
};
