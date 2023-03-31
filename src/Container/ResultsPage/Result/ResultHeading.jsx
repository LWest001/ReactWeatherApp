import { Box, Skeleton, Typography } from "@mui/material";
import WbTwilightRoundedIcon from "@mui/icons-material/WbTwilightRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import AirRoundedIcon from "@mui/icons-material/AirRounded";
import WaterRoundedIcon from "@mui/icons-material/WaterRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import ExploreIcon from "@mui/icons-material/Explore";

export default function ResultHeading({ heading }) {
  return (
    <Box
      variant="h4"
      className="heading ResultHeading"
      sx={{
        display: "flex",
        justifyContent: ["initial", "initial", "center"],
        alignItems: "center",
        gap: 1,
      }}
    >
      {heading === "Sunrise" && <WbTwilightRoundedIcon />}
      {heading === "Sunset" && <BedtimeRoundedIcon fontSize="small" />}
      {heading === "Wind speed" && <AirRoundedIcon />}
      {heading === "Wind direction" && <ExploreIcon />}
      {heading === "Humidity" && <WaterRoundedIcon />}
      {heading === "UV index" && <WbSunnyRoundedIcon />}
      <Typography
        variant="h4"
        fontSize={["1rem", "1rem", "19.2px"]}
        display="inline-block"
        textAlign={["left", "left", "center"]}
      >
        {heading}
      </Typography>
    </Box>
  );
}
