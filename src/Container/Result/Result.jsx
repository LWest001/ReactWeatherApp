import "./Result.css";

export const Result = (props) => {
  const { display, icon, styleDisplay } = props;
  const { heading, data } = display;
  const iconImg = heading === "Temperature" ? <img id="weatherIcon" src={icon} alt="icon of current weather"/> : "";
  return (
    <div
      className={`Result ${heading}`}
      style={{ display: styleDisplay }}
    >
      <h4 className="heading">{heading}</h4>
      {iconImg}
      <p className="data">{data}</p>
    </div>
  );
};
