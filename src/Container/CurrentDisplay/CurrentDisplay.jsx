import { Paper, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectCurrentWeatherData,
  selectLocation,
  selectDataView,
} from "../../app/appSlice";
import { Result } from "../Result/Result";
import "../ResultsPage/ResultsPage.css";
import stateCodes from "../../assets/data/stateCodes.json";

export function CurrentDisplay() {
  const currentData = useSelector(selectCurrentWeatherData);
  const { city, state } = useSelector(selectLocation);
  const dataView = useSelector(selectDataView);
  let dataArray = Object.entries(currentData.text);
  dataArray = dataArray.slice(0, 8);
  let resultsArray = dataArray.map(([key, value]) => {
    return (
      <Result
        key={key}
        icon={currentData.icon}
        display={{
          heading: key,
          data: value,
        }}
      />
    );
  });
  return (
    <Paper sx={{ bgcolor: "initial" }} className="CurrentDisplay dataDisplay">
      <h1 className="locationHeader">
        {city}, {stateCodes[state]}
      </h1>
      {currentData.text.Date ? (
        <h2 className="dateTime">
          {currentData.text.Date} | {currentData.text.Time}
        </h2>
      ) : (
        <Skeleton
          animation="wave"
          className="dateTime"
          width={210}
          height={32}
          sx={{ mx: "auto" }}
        />
      )}
      {dataView === "Now" && resultsArray}
    </Paper>
  );
}
