import { Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectCurrentWeatherData,
  selectLocation,
  selectDataView,
} from "../../../app/appSlice";
import { Result } from "../Result/Result";
import "../ResultsPage.css";
import stateCodes from "../../../assets/data/stateCodes.json";
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
      <Typography variant="h1" className="locationHeader fullGridWidth">
        {city}, {stateCodes[state]}
      </Typography>
      {currentData.text.Date ? (
        <Stack
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          className="dateTime fullGridWidth"
          gap={2}
          my={["0.5rem", "0.5rem", "1.5rem"]}
        >
          <Typography
            variant="h2"
            display="inline-block"
            gap={1}
            sx={{ display: "flex", fontSize: ["1.2rem", "1.3rem", "1.5rem"] }}
          >
            <CalendarMonthIcon />
            {currentData.text.Date}
          </Typography>
          <Typography
            gap={1}
            variant="h2"
            display="inline-block"
            sx={{ display: "flex", fontSize: ["1.2rem", "1.3rem", "1.5rem"] }}
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
