import "./ResultsPage.css";
import { DataBar } from "../../Component/DataBar/DataBar";
import { HourlyDisplay } from "./HourlyDisplay/HourlyDisplay";
import { DailyDisplay } from "./DailyDisplay/DailyDisplay";
import { CurrentDisplay } from "./CurrentDisplay/CurrentDisplay";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWeatherData,
  selectDataView,
  setBackgroundImage,
} from "../../app/appSlice";
import { Stack } from "@mui/material";
import { backgroundSelector } from "../../functions/backgroundSelector";

export const ResultsPage = ({ onClick }) => {
  const dispatch = useDispatch();
  const { currentData, hourlyData, dailyData } = useSelector(selectWeatherData);
  const dataView = useSelector(selectDataView);
  const [dates, setDates] = useState({
    today: currentData.Date,
  });

  useEffect(() => {
    setDates({
      today: currentData.Date,
      tomorrow: hourlyData[24]?.Date,
      followingDay: hourlyData[47]?.Date,
      followingDayName: hourlyData[47]?.Weekday,
    });
  }, [currentData]);

  // Set background based on weather and day segment
  useEffect(() => {
    if (currentData.Temperature) {
      const background = backgroundSelector(
        currentData.weatherType,
        currentData.daySegment
      );
      dispatch(setBackgroundImage(background));
    }
  }, [currentData]);

  return (
    <Stack
      className="ResultsPage"
      alignItems="center"
      flexDirection="column"
      pt={["54px", "70px"]}
      alignSelf={dataView === "Hourly" && "start"}
      maxWidth="100%"
    >
      <DataBar onClick={onClick} />
      <CurrentDisplay />

      {dataView !== "Daily" && (
        <HourlyDisplay
          hourlyData={hourlyData}
          dates={dates}
          dataView={dataView}
        />
      )}
      {dataView === "Daily" && (
        <DailyDisplay dailyData={dailyData} dataView={dataView} />
      )}
    </Stack>
  );
};
