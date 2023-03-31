export default function hourBgColor(date, dates, dataView) {

  if (date === dates.tomorrow) {
    if (dataView !== "Hourly") {
      return "linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(255,255,0,0.05) 5%, rgba(255,255,0,0.3) 100%)";
    }
    return "linear-gradient(270deg, rgba(2,0,36,0) 0%, rgba(255,255,0,0.05) 5%, rgba(255,255,0,0.3) 100%)";
  } else if (date === dates.followingDay) {
    if (dataView !== "Hourly") {
      return "linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(0,255,8,0.05) 5%, rgba(0,255,8,.5) 100%)";
    }
    return "linear-gradient(270deg, rgba(2,0,36,0) 0%, rgba(0,255,8,0.05) 5%, rgba(0,255,8,.5) 100%)";
  } else return "initial";
}
