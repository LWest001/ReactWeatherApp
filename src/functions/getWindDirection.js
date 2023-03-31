export default function getWindDirection(degrees) {
  if (degrees >= 337.5 || degrees < 22.5) {
    return "North";
  } else if (degrees >= 22.5 && degrees < 67.5) {
    return "Northeast";
  } else if (degrees >= 67.5 && degrees < 112.5) {
    return "East";
  } else if (degrees >= 112.5 && degrees < 157.5) {
    return "Southeast";
  } else if (degrees >= 157.5 && degrees < 202.5) {
    return "South";
  } else if (degrees >= 202.5 && degrees < 247.5) {
    return "Southwest";
  } else if (degrees >= 247.5 && degrees < 292.5) {
    return "West";
  } else if (degrees >= 292.5 && degrees < 337.5) {
    return "Northwest";
  } else return;
}
