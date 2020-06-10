import React from "react";

const Cell = (props) => {
  let renderCell = () => {
    if (props.data.isOpen) {
      return (
        <div className="cell open" onClick={() => props.open(props.data)}></div>
      );
    } else {
      return (
        <div className="cell" onClick={() => props.open(props.data)}></div>
      );
    }
  };
  return renderCell();
};

export default Cell;
