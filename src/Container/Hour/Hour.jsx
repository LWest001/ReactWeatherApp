import "./Hour.css";
export const Hour = (props) => {
  const { time, date, currentDate, icon, temp, weather } = props;
  const bgColor =
    date !== currentDate ? { backgroundColor: "red" } : { backgroundColor: "" };
  return (
    <div className="Hour" style={bgColor}>
      <h4>{time}</h4>
      <img src={icon} alt={weather} />
      <p>{temp}</p>
    </div>
  );
};
