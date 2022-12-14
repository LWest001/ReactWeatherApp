import "./Hour.css";
export const Hour = (props) => {
  const { time, date, icon, temp, weather } = props;
  const bgColor = { backgroundColor: "red" };
  return (
    <div className="Hour" style={bgColor}>
      <h4>{time}</h4>
      <img src={icon} alt={weather} />
      <p>{temp}</p>
    </div>
  );
};
