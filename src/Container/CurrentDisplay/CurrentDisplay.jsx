import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectCurrentWeatherData,
  selectLocation,
  selectDataView,
} from "../../app/appSlice";
import { Result } from "../Result/Result";
import "../ResultsPage/ResultsPage.css";
import stateCodes from "../../assets/data/stateCodes.json";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export function CurrentDisplay() {
  const currentData = useSelector(selectCurrentWeatherData);
  const { city, state } = useSelector(selectLocation);
  const dataView = useSelector(selectDataView);
  let dataArray = Object.entries(currentData.text);
  dataArray = dataArray.slice(0, 9);
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
        <Stack
          flexDirection="row"
          justifyContent="space-evenly"
          alignItems="center"
          className="dateTime"
        >
          <Typography
            variant="h2"
            display="inline-block"
            gap={1}
            sx={{ display: "flex" }}
          >
            <CalendarMonthIcon />
            {currentData.text.Date}
          </Typography>
          <Typography
            gap={1}
            variant="h2"
            display="inline-block"
            sx={{ display: "flex" }}
          >
            <AccessTimeIcon />
            {currentData.text.Time}
          </Typography>
        </Stack>
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
