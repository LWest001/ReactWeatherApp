import "./Result.css";
import { useSelector } from "react-redux";
import { selectWeatherData } from "../../../app/appSlice";
import { Box, Skeleton } from "@mui/material";
import ResultData from "./ResultData";
import ResultHeading from "./ResultHeading";

export const Result = ({ display }) => {
  const { currentData } = useSelector(selectWeatherData);
  const icon = currentData.icon;
  const { heading, data } = display;
  function fullGridWidth() {
    return ["Feels like", "Weather", "Temperature"].includes(heading);
  }

  return (
    <Box
      className={`Result ${heading}${
        fullGridWidth() ? " fullGridWidth" : ""
      }`}
      sx={{
        padding: !fullGridWidth() && "0.5rem",
        display: !fullGridWidth() ? "grid" : "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data !== null ? (
        <ResultHeading heading={heading} />
      ) : (
        <Skeleton animation="wave" height={38} />
      )}

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
        <ResultData data={data} fullGridWidth={fullGridWidth()} />
      ) : (
        heading !== "Temperature" && <Skeleton animation="wave" height={38} />
      )}
    </Box>
  );
};
