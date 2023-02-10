import "./DailyDisplay.css";
import { Day } from "./Day/Day";

export const DailyDisplay = ({ dailyData }) => {
  let daysArray = dailyData.map((day, i) => {
    return <Day key={day.text.Date} index={i} />;
  });

  return <div className="DailyDisplay">{daysArray}</div>;
};
