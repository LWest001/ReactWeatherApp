import { Result } from "../Result/Result";
import "./ResultsPage.css";
import { DataTypeSlider } from "../../Component/DataTypeSlider/DataTypeSlider";
import { HourlyDisplay } from "../HourlyDisplay/HourlyDisplay";
import { DailyDisplay } from "../DailyDisplay/DailyDisplay";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWeatherData,
  selectDataView,
  selectLocation,
} from "../../app/appSlice";
import { setDataView } from "../../app/appSlice";

export const ResultsPage_redux = ({ onClick }) => {
  const { currentData, hourlyData, dailyData } = useSelector(selectWeatherData);
  const dataView = useSelector(selectDataView);
  const { city, state } = useSelector(selectLocation);

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
    console.log(e, dataView);
    dispatch(setDataView(dataView));
  };

  const ResultsGrid = () => {
    let resultsArray = [];
    let dataArray = Object.entries(currentData.text);
    dataArray = dataArray.slice(0, 8);
    dataArray.forEach(([key, value]) => {
      resultsArray.push(
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

    return resultsArray;
  };

  return (
    <div className="ResultsPage">
      <DataTypeSlider onChange={slideHandler} />
      <div className="ResultsGrid">
        <h1 className="locationHeader">
          {city}, {state}
        </h1>
        <h2 className="dateTime">
          {currentData.text.Date} | {currentData.text.Time}
        </h2>
        {dataView === "Now" && <ResultsGrid />}
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
      </div>
      <button className="returnButton" onClick={onClick}>
        &larr; Return home
      </button>
    </div>
  );
};
