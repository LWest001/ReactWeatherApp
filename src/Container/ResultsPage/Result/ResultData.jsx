import { Skeleton, Typography } from "@mui/material";

export default function ResultData({ heading, data }) {
  function fullGridWidth() {
    return ["Feels like", "Weather", "Temperature"].includes(heading);
  }
  return (
    <Typography
      fontWeight="bold"
      className="data ResultData"
      fontSize={["1rem", "1rem", "19.2px"]}
      textAlign={!fullGridWidth() ? ["left", "left", "center"] : "center"}
      pl={!fullGridWidth() && 4}
    >
      {data}
    </Typography>
  );
}
