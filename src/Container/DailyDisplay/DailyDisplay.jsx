import "./DailyDisplay.css";
import { Day } from "./Day/Day";

export const DailyDisplay = ({ dailyData, dataType }) => {
  const DaysGrid = () => {
    let daysArray = [];
    dailyData.forEach((day) => {
      daysArray.push(
        <Day
          key={day.text.Date}
          icon={day.icon}
          date={day.text.Date}
          weekDay={day.text.Weekday}
          min={day.text.Min}
          max={day.text.Max}
          weather={day.weather}
        />
      );
    });
    return daysArray;
  };
  return (
    <div className="DailyDisplay">
      <DaysGrid />
    </div>
  );
};
