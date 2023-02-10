import "./Result.css";
import { useSelector } from "react-redux";
import { selectWeatherData } from "../../app/appSlice";

export const Result = (props) => {
  const { display, styleDisplay } = props;
  const {currentData} = useSelector(selectWeatherData)
  const icon = currentData.icon
  const { heading, data } = display;
  const iconImg =
    heading === "Temperature" ? (
      <img id="weatherIcon" src={icon} alt="icon of current weather" />
    ) : (
      ""
    );
  return (
    <div className={`Result ${heading}`} style={{ display: styleDisplay }}>
      <h4 className="heading">{heading}</h4>
      {iconImg}
      <p className="data">{data}</p>
    </div>
  );
};
