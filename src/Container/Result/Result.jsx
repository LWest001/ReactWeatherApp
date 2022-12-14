import "./Result.css";

export const Result = (props) => {
  const { display, icon, styleDisplay } = props;
  const { heading, data } = display;
  const bgImage = heading === "Temperature" ? icon : "";
  return (
    <div
      className={`Result ${heading}`}
      style={{ backgroundImage: `url(${bgImage})`, display: styleDisplay }}
    >
      <h4 className="heading">{heading}</h4>
      <p className="data">{data}</p>
    </div>
  );
};
