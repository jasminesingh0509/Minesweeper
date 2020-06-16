import React from "react";

//passed to minesweeper
//stateless componenet
const BoardHead = (props) => {
  let minutes = Math.floor(props.time / 60) || 0;
  let seconds = props.time - minutes * 60 || 0;

  let formattedSecs = seconds < 10 ? `0${seconds}` : seconds;
  let time = `${minutes}:${formattedSecs}`;

  //-----------------------------return---------------------------------------
  return (
    <div className="board-head">
      <div className="flag-count"> {props.flagCount} 🚩</div>
      <button className="reset" onClick={props.reset}>
        Reset
      </button>
      <div className="timer">
        {" "}
        <span></span>🕘 {time}
      </div>
    </div>
  );
};

export default BoardHead;
