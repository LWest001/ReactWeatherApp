import "./Hour.css";
import { useSelector } from "react-redux";
import { selectDataView, selectWeatherData } from "../../../app/appSlice";
import hourBgColor from "../../../functions/hourBgColor";
export const Hour = (props) => {
  const { date, dates, index } = props;
  const dataView = useSelector(selectDataView);
  const { hourlyData } = useSelector(selectWeatherData);
  const hourData = hourlyData[index];

  return (
    <div
      className={"Hour " + dataView}
      style={{ background: hourBgColor(date, dates, dataView) }}
    >
      <h4>{hourData.text.Time}</h4>
      <img src={hourData.icon} alt={hourData.weather} />
      <p>{hourData.text.Temperature}</p>
      <p>{hourData.weather}</p>
    </div>
  );
};
