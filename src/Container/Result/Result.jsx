import React from "react";
import "./Result.css";

export const Result = (props) => {
  const { display, icon } = props;
  const { heading, data } = display;
  const bgImage = heading === "Weather" ? icon : "";
  return (
    <div
      className={`Result ${heading}`}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <p className="heading">{heading}</p>
      <p className="data">{data}</p>
    </div>
  );
};
