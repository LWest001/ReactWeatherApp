import { Paper } from "@mui/material";
import { Day } from "./Day/Day";

export const DailyDisplay = ({ dailyData }) => {
  let daysArray = dailyData.map((day, i) => {
    return <Day key={day.text.Date} index={i} />;
  });

  return (
    <Paper sx={{ bgcolor: "initial" }} className="DailyDisplay dataDisplay">
      {daysArray}
    </Paper>
  );
};
