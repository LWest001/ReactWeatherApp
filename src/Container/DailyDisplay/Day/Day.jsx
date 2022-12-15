import "./Day.css";

export const Day = (props) => {
  const { weekDay, icon, min, max, weather } = props;
  return (
    <div className={"Day"}>
      <h4>{weekDay}</h4>
      <img src={icon} alt={weather} />
      <div className="minMax">
        <p>{min}</p>
        <p>{max}</p>
      </div>
      <p>{weather}</p>
    </div>
  );
};
