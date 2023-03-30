import "./Result.css";
import { useSelector } from "react-redux";
import { selectWeatherData } from "../../app/appSlice";
import { Skeleton } from "@mui/material";

export const Result = (props) => {
  const { display, styleDisplay } = props;
  const { currentData } = useSelector(selectWeatherData);
  const icon = currentData.icon;
  const { heading, data } = display;

  return (
    <div className={`Result ${heading}`} style={{ display: styleDisplay }}>
      <h4 className="heading">{data ? heading : <Skeleton animation="wave" height={38}/>}</h4>
      {heading === "Temperature" &&
        (icon ? (
          <img id="weatherIcon" src={icon} alt="icon of current weather" />
        ) : (
          <Skeleton
            id="weatherIcon"
            width={76}
            height={76}
            sx={{ mx: "auto" }}
            animation="wave"
          />
        ))}
      <p className="data">
        {data || (heading !== "Temperature" && <Skeleton animation="wave" height={38}/>)}
      </p>
    </div>
  );
};
