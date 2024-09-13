import React from "react";
import './CommentShower.scss'
export default function ({ data, time ,name}) {
  return (
    <div className="mainContainer">
      <p className="timeShower">{time}</p>
      <h1 className="userName">{name}</h1>
      <p className="mainDataShower">{data}</p>
    </div>
  );
}
