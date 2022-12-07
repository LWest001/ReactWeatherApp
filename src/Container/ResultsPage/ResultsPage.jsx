import { Result } from "../Result/Result";
import "./ResultsPage.css";

export const ResultsPage = (props) => {
  const { toggleView, onClick, locationString, localWeatherData, icon } = props;
  const display = toggleView === "ResultsPage" ? "flex" : "none";

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
    <div className="ResultsPage" style={{ display: display }}>
      <div className="ResultsGrid">
        <h1 className="locationHeader">{locationString}</h1>
        <h2 className="dateTime">
          {localWeatherData.Date} | {localWeatherData.Time}
        </h2>
        <ResultsGrid />
      </div>
      <button className="returnButton" onClick={onClick}>
        &larr; Return home
      </button>
    </div>
  );
};
