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
    let lighter;

    if (rowIsEven && columnIsEven) {
      lighter = true;
    } else if (!rowIsEven && !columnIsEven) {
      lighter = true;
    } else {
      lighter = false;
    }

    if (props.data.isOpen) {
      className = "cell open";

      if (props.data.hasMine) {
        content = <span role="img"> 💣</span>;
        onContextMenu = (e) => {
          e.preventDefault();
        };
      } else if (props.data.count > 0) {
        content = props.data.count;
        className += props.data.count;
      }
      if (lighter) {
        className += " lighter";
      }
    } else {
      // If closed
      if (props.data.hasFlag) {
        content = <span role="img"> 🚩</span>;
      }
      if (lighter) {
        className += " lighter";
      } else {
        className = "cell";
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
