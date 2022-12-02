import React from "react";
import "./Result.css";

export const Result = (props) => {
  const { display } = props;
  const { heading, data } = display;
  return (
    <div className={`Result ${heading}`}>
      <p className="heading">{heading}</p>
      <p className="data">{data}</p>
    </div>
  );
};
