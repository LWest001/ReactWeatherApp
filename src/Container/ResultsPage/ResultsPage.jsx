import { Result } from "../Result/Result";
import "./ResultsPage.css";
import { DataTypeSlider } from "../../Component/DataTypeSlider/DataTypeSlider";
import { HourlyDisplay } from "../HourlyDisplay/HourlyDisplay";
import { DailyDisplay } from "../DailyDisplay/DailyDisplay";
import { useState, useEffect } from "react";

export const ResultsPage = (props) => {
  const {
    onClick,
    locationString,
    localWeatherData,
    icon,
    dataType,
    setDataType,
    hourlyData,
  } = props;

  const [dates, setDates] = useState({
    today: localWeatherData.Date,
  });

  useEffect(() => {
    setDates({
      today: localWeatherData.Date,
      tomorrow: hourlyData[24].text.Date,
      followingDay: hourlyData[47].text.Date,
    });
  }, [localWeatherData]);

  const slideHandler = (e) => {
    setDataType(() => {
      switch (e) {
        case "0": {
          return "Now";
        }
        case "50": {
          return "Hourly";
        }
        case "100": {
          return "Daily";
        }
      }
    });
  };

  const ResultsGrid = () => {
    let resultsArray = [];
    let dataArray = Object.entries(localWeatherData);
    dataArray = dataArray.slice(0, 8);
    dataArray.forEach(([key, value]) => {
      resultsArray.push(
        <Result
          key={key}
          icon={icon}
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
      <DataTypeSlider onChange={slideHandler} value={dataType} />
      <div className="ResultsGrid">
        <h1 className="locationHeader">{locationString}</h1>
        <h2 className="dateTime">
          {localWeatherData.Date} | {localWeatherData.Time}
        </h2>
        {dataType === "Now" && <ResultsGrid />}
        {dataType !== "Daily" && (
          <HourlyDisplay
            hourlyData={hourlyData}
            dates={dates}
            dataType={dataType}
          />
        )}
        {dataType === "Daily" && <DailyDisplay />}
      </div>
      <button className="returnButton" onClick={onClick}>
        &larr; Return home
      </button>
    </div>
  );
};
