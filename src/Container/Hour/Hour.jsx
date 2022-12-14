import "./Hour.css";
export const Hour = (props) => {
  const { time, date, currentDate, icon, temp, weather, dataType } = props;
  const bgColor = () => {
    if (date !== currentDate) {
      if (dataType !== "Hourly") {
        return {
          background:
            "linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(255,255,0,0.05) 5%, rgba(255,255,0,0.3) 100%)",
        };
      }
      return {
        background:
            "linear-gradient(270deg, rgba(2,0,36,0) 0%, rgba(255,255,0,0.05) 5%, rgba(255,255,0,0.3) 100%)",
      }
    } else {
      return { backgroundColor: "" };
    }
  };
  return (
    <div className={"Hour " + dataType} style={bgColor()}>
      <h4>{time}</h4>
      <img src={icon} alt={weather} />
      <p>{temp}</p>
      <p>{weather}</p>
    </div>
  );
};
