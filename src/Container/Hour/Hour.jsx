import "./Hour.css";
export const Hour = (props) => {
  const { time, icon, temp, weather } = props;
  return (
    <div className="Hour">
      <h4>{time}</h4>
      <img src={icon} alt={weather} />
      <p>{temp}</p>
    </div>
  );
};
