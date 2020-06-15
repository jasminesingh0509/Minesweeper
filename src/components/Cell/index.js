import React from "react";

//stateless componenet
//cell is passed to row
const Cell = (props) => {
  let renderCell = () => {
    if (props.data.isOpen) {
      if (props.data.hasMine) {
        return (
          <div
            className="cell open"
            onClick={() => props.open(props.data)}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            {" "}
            💣
          </div>
        );
      }
      if (props.data.count === 0) {
        return (
          <div
            className="cell open"
            onClick={() => props.open(props.data)}
            // puts a flag in the cell when right click instead of showing menu
            onContextMenu={(e) => {
              e.preventDefault();
              props.flag(props.data);
            }}
          ></div>
        );
      } else {
        return (
          <div
            className="cell open"
            onClick={() => props.open(props.data)}
            // puts a flag in the cell when right click instead of showing menu
            onContextMenu={(e) => {
              e.preventDefault();
              props.flag(props.data);
            }}
          >
            {" "}
            {props.data.count}
          </div>
        );
      }
    } else if (props.data.hasFlag) {
      return (
        <div
          className="cell"
          onClick={() => props.open(props.data)}
          // puts a flag in the cell when right click instead of showing menu
          onContextMenu={(e) => {
            e.preventDefault();
            props.flag(props.data);
          }}
        >
          {" "}
          🚩
        </div>
      );
    } else {
      return (
        <div
          className="cell"
          onClick={() => props.open(props.data)}
          // puts a flag in the cell when right click instead of showing menu
          onContextMenu={(e) => {
            e.preventDefault();
            props.flag(props.data);
          }}
        ></div>
      );
    }
  };
  return renderCell();
};

export default Cell;
