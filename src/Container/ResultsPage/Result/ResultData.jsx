import { Skeleton, Typography } from "@mui/material";

export default function ResultData({ data, fullGridWidth }) {
  return (
    <Typography
      fontWeight="bold"
      className="ResultData"
      fontSize={["1rem", "1rem", "19.2px"]}
      textAlign={!fullGridWidth ? ["left", "left", "center"] : "center"}
      pl={!fullGridWidth && 4}
    >
      {data}
    </Typography>
  );
}
