import "./DailyDisplay.css";
import { Day } from "./Day/Day";

export const DailyDisplay = ({ dailyData }) => {
  let daysArray = [];
  dailyData.forEach((day, i) => {
    daysArray.push(<Day key={day.text.Date} index={i} />);
  });

  return <div className="DailyDisplay">{daysArray}</div>;
};
