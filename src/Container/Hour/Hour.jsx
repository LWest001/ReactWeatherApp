import "./Hour.css";
export const Hour = (props) => {
  const { time, date, currentDate, icon, temp, weather } = props;
  const bgColor =
    date !== currentDate ? { background: "linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(255,255,0,0.05) 5%, rgba(255,255,0,0.3) 100%)" } : { backgroundColor: "" };
  return (
    <div className="Hour" style={bgColor}>
      <h4>{time}</h4>
      <img src={icon} alt={weather} />
      <p>{temp}</p>
    </div>
  );
};
