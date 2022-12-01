import React, { useEffect } from "react";
import { Result } from "../Result/Result";
import "./ResultsPage.css";

export const ResultsPage = (props) => {
  const { toggleView, onClick, locationString, localWeatherData } = props;
  const display =
    toggleView === "ResultsPage" ? { display: "flex" } : { display: "none" };

  /*  const ResultsGrid = [];
  useEffect(() => {
    Object.entries(localWeatherData).forEach((entry) => {
      ResultsGrid.push(<Result display={`${entry}`} />);
    });
  }, [localWeatherData]);
*/
  const ResultsGrid = () => {
    const resultsArray = [];
    const dataArray = Object.entries(localWeatherData);
    dataArray.forEach(([key, value]) => {
      resultsArray.push(<Result key={key} display={`${key}: ${value}`} />);
    });
    return resultsArray;
  };

  return (
    <div className="ResultsPage" style={display}>
      <button onClick={onClick}>&larr; Return home</button>
      <h1>{locationString}</h1>
      <div className="ResultsGrid">
        <ResultsGrid />
      </div>
    </div>
  );
};
