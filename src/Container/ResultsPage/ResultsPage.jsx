import "./ResultsPage.css";
import { DataBar } from "../../Component/DataBar/DataBar";
import { HourlyDisplay } from "../HourlyDisplay/HourlyDisplay";
import { DailyDisplay } from "../DailyDisplay/DailyDisplay";
import { CurrentDisplay } from "../CurrentDisplay/CurrentDisplay";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWeatherData,
  selectDataView,
  selectLocation,
} from "../../app/appSlice";
import { setDataView } from "../../app/appSlice";
import { Box } from "@mui/material";

export const ResultsPage = ({ onClick }) => {
  const { currentData, hourlyData, dailyData } = useSelector(selectWeatherData);
  const dataView = useSelector(selectDataView);

  const dispatch = useDispatch();
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

  const slideHandler = (e) => {
    let dataView;
    if (e == 0) {
      dataView = "Now";
    }
    if (e == 50) {
      dataView = "Hourly";
    }
    if (e == 100) {
      dataView = "Daily";
    }
    dispatch(setDataView(e.target.value));
  };

  return (
    <Box className="ResultsPage">
      <DataBar onChange={slideHandler} onClick={onClick} />
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
