import { useSelector } from "react-redux";
import {
  selectCurrentWeatherData,
  selectLocation,
  selectDataView,
} from "../../app/appSlice";
import { Result } from "../Result/Result";
import "../ResultsPage/ResultsPage.css";

export function CurrentDisplay() {
  const currentData = useSelector(selectCurrentWeatherData);
  const { city, state } = useSelector(selectLocation);
  const dataView = useSelector(selectDataView);
  let dataArray = Object.entries(currentData.text);
  dataArray = dataArray.slice(0, 8);
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
    <div className="CurrentDisplay dataDisplay">
      <h1 className="locationHeader">
        {city}, {state}
      </h1>
      <h2 className="dateTime">
        {currentData.text.Date} | {currentData.text.Time}
      </h2>
      {dataView === "Now" && resultsArray}
    </div>
  );
}
