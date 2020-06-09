import React from "react";

//stateless componenet
const BoardHead = (props) => {
  let minutes = Math.floor(props.time / 60) || 0;
  let seconds = props.time - minutes * 60 || 0;

  let formattedSecs = seconds < 10 ? `0${seconds}` : seconds;
  let time = `${minutes}:${formattedSecs}`;
  return (
    <div className="board-head">
      <div className="timer">{time}</div>
    </div>
  );
};

export default BoardHead;
