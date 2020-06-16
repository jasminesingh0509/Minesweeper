import React from "react";

//stateless componenet
//cell is passed to row
const Cell = (props) => {
  let renderCell = () => {
    let className = "cell";
    let content = "";
    let onContextMenu = (e) => {
      e.preventDefault();
      props.flag(props.data);
    };
    let rowIsEven = props.data.y % 2 === 0;
    let columnIsEven = props.data.x % 2 === 0;

    if (props.data.isOpen) {
      if (props.data.hasMine) {
        className = "cell open";
        content = <span role="img"> 💣</span>;
        onContextMenu = (e) => {
          e.preventDefault();
        };
      } else if (props.data.count === 0) {
        className = "cell open";
        content = " ";
      } else if (props.data.count > 0) {
        className = "cell open" + props.data.count;
        content = props.data.count;
      } else {
        className = "cell open ";
        content = "";
      }
    } else {
      // If closed
      if (props.data.hasFlag) {
        content = <span role="img"> 🚩</span>;
      }
      if (rowIsEven && columnIsEven) {
        className += " lighter";
      } else if (rowIsEven && !columnIsEven) {
        className = "cell";
      } else if (!rowIsEven && !columnIsEven) {
        className += " lighter";
      }
    }

    return (
      <div
        className={className}
        onClick={() => props.open(props.data)}
        onContextMenu={onContextMenu}
      >
        {content}
      </div>
    );
  };
  return renderCell();
};

export default Cell;
