import { Result } from "../Result/Result";
import "./ResultsPage.css";
import { DataTypeSlider } from "../../Component/DataTypeSlider/DataTypeSlider";
import { HourlyDisplay } from "../HourlyDisplay/HourlyDisplay";
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
  
  const [currentDate, setCurrentDate] = useState(localWeatherData.Date);

  useEffect(() => {
    setCurrentDate(localWeatherData.Date);
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
        <HourlyDisplay hourlyData={hourlyData} currentDate={currentDate} />
      </div>
      <button className="returnButton" onClick={onClick}>
        &larr; Return home
      </button>
    </div>
  );
};
