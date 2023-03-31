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
import { Box } from "@mui/material";
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
      today: currentData.text.Date,
      tomorrow: hourlyData[24]?.text.Date,
      followingDay: hourlyData[47]?.text.Date,
    });
  }, [currentData]);

  // Set background based on weather and day segment
  useEffect(() => {
    if (currentData.text.Temperature) {
      const background = backgroundSelector(
        currentData.weather,
        currentData.daySegment
      );
      dispatch(setBackgroundImage(background));
    }
  }, [currentData]);

  return (
    <Box className="ResultsPage">
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
    </Box>
  );
};
