import React, { useEffect } from "react";
import { Result } from "../Result/Result";
import "./ResultsPage.css";

export const ResultsPage = (props) => {
  const { toggleView, onClick, locationString, localWeatherData } = props;
  const display =
    toggleView === "ResultsPage" ? { display: "flex" } : { display: "none" };

  const ResultsGrid = () => {
    let resultsArray = [];
    let dataArray = Object.entries(localWeatherData);
    dataArray = dataArray.slice(0, 8);
    dataArray.forEach(([key, value]) => {
      resultsArray.push(
        <Result
          key={key}
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
    <div className="ResultsPage" style={display}>
      <h1 className="locationHeader">{locationString}</h1>
      <h2>
        {localWeatherData.Date} | {localWeatherData.Time}
      </h2>
      <div className="ResultsGrid">
        <ResultsGrid />
      </div>
      <button className="returnButton" onClick={onClick}>
        &larr; Return home
      </button>
    </div>
  );
};
