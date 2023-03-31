import "./Result.css";
import { useSelector } from "react-redux";
import { selectWeatherData } from "../../app/appSlice";
import { Box, Skeleton, Typography } from "@mui/material";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import WaterRoundedIcon from "@mui/icons-material/WaterRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";

export const Result = (props) => {
  const { display, styleDisplay } = props;
  const { currentData } = useSelector(selectWeatherData);
  const icon = currentData.icon;
  const { heading, data } = display;
  const fullGridWidth = ["Feels like", "Weather", "Temperature"];

  return (
    <div
      className={`Result ${heading} ${
        fullGridWidth.includes(heading) && "fullGridWidth"
      }`}
      style={{ display: styleDisplay }}
    >
      <Box
        variant="h4"
        className="heading"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h4" display="inline-block">
          {data ? heading : <Skeleton animation="wave" height={38} />}
        </Typography>
        {heading === "Sunrise" && <WbTwilightRoundedIcon />}
        {heading === "Sunset" && <BedtimeRoundedIcon fontSize="small" />}
        {heading === "Wind speed" && <AirRoundedIcon />}
        {heading === "Humidity" && <WaterRoundedIcon />}
        {heading === "UV index" && <WbSunnyRoundedIcon />}
      </Box>
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
        {data ||
          (heading !== "Temperature" && (
            <Skeleton animation="wave" height={38} />
          ))}
      </p>
    </div>
  );
};
