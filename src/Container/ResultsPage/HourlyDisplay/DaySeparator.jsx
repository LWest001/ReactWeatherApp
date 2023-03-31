import { Box } from "@mui/material";
import hourBgColor from "../../../functions/hourBgColor";

export default function DaySeparator({date, dates, dataView, displayText}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        p: 1,
        gap: 1,
        fontWeight: "bold",
        background: hourBgColor(date, dates, dataView),
      }}
    >
      {/* <TodayIcon fontSize="large"/> */}
      {displayText}
    </Box>
  );
}
