import "./Result.css";

export const Result = (props) => {
  const { display, icon, styleDisplay } = props;
  const { heading, data } = display;
  const bgImage = heading === "Weather" ? icon : "";
  return (
    <div
      className={`Result ${heading}`}
      style={{ backgroundImage: `url(${bgImage})`, display: styleDisplay }}
    >
      <p className="heading">{heading}</p>
      <p className="data">{data}</p>
    </div>
  );
};
