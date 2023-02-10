import "./DailyDisplay.css";
import { Day } from "./Day/Day";

export const DailyDisplay = ({ dailyData }) => {
  const DaysGrid = () => {
    let daysArray = [];
    dailyData.forEach((day, i) => {
      daysArray.push(
        <Day
          key={day.text.Date}
          index={i}
          
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
