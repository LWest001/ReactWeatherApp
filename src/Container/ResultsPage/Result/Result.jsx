import "./Result.css";
import { useSelector } from "react-redux";
import { selectWeatherData } from "../../../app/appSlice";
import { Box, Skeleton, Typography } from "@mui/material";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import WaterRoundedIcon from "@mui/icons-material/WaterRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ExploreIcon from "@mui/icons-material/Explore";
import ResultData from "./ResultData";

export const Result = ({ display }) => {
  const { currentData } = useSelector(selectWeatherData);
  const icon = currentData.icon;
  const { heading, data } = display;
  function fullGridWidth() {
    return ["Feels like", "Weather", "Temperature"].includes(heading);
  }

  return (
    <Box
      className={`Result ${heading} ${fullGridWidth() && "fullGridWidth"}`}
      sx={{
        padding: !fullGridWidth() && "0.5rem",
        display: !fullGridWidth() ? "grid" : "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        variant="h4"
        className="heading"
        sx={{
          display: "flex",
          justifyContent: ["initial", "initial", "center"],
          alignItems: "center",
          gap: 1,
        }}
      >
        {heading === "Sunrise" && <WbTwilightRoundedIcon />}
        {heading === "Sunset" && <BedtimeRoundedIcon fontSize="small" />}
        {heading === "Wind speed" && <AirRoundedIcon />}
        {heading === "Wind direction" && <ExploreIcon />}
        {heading === "Humidity" && <WaterRoundedIcon />}
        {heading === "UV index" && <WbSunnyRoundedIcon />}
        <Typography
          variant="h4"
          fontSize={["1rem", "1rem", "19.2px"]}
          display="inline-block"
          textAlign={["left", "left", "center"]}
        >
          {data ? heading : <Skeleton animation="wave" height={38} />}
        </Typography>
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
      {data !== null ? (
        <ResultData heading={heading} data={data} />
      ) : (
        heading !== "Temperature" && <Skeleton animation="wave" height={38} />
      )}
    </Box>
  );
};
