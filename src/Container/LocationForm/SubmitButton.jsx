import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectIsValidLocation,
  selectLocation,
  selectStatus,
} from "../../app/appSlice";

export default function SubmitButton() {
  const { city, country } = useSelector(selectLocation);
  const disabled = !useSelector(selectIsValidLocation);
  const status = useSelector(selectStatus);
  function submitButtonText() {
    if (status === "loading") {
      return "Loading...";
    }
    if (status === "succeeded") {
      return (
        <>
          Get weather for{" "}
          <Typography variant="span" fontWeight="bold">
            {city}
          </Typography>
        </>
      );
    }
    if (status === "idle") {
      return "Enter a location";
    }
    if (status === "error") {
      return `Invalid ${country.name} postal code`;
    }
  }
  return (
    <Button
      variant="contained"
      id="submit"
      type="submit"
      disabled={disabled}
      sx={{
        m: 1,
        width: "223px",
        color: "black",
        "&:hover": { bgcolor: "primary.dark" },
      }}
    >
      <Typography color={status === "error" ? "red" : "black"}>
        {submitButtonText()}
      </Typography>
    </Button>
  );
}
