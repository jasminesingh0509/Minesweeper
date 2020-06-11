import React, { Component } from "react";
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";

// this is the parent component
class Minesweeper extends Component {
  constructor() {
    super();
    this.intervals = [];
  }

  state = {
    rows: 16,
    columns: 16,
    flags: 10,
    mines: 40,
    status: "waiting",
    openCells: 0,
  };

  //function to add time when game is running
  tick = () => {
    if (this.state.openCells > 0 && this.state.status === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  // function to handle when a cell is clicked on, check time and status
  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.status !== "running") {
      this.setState(
        {
          status: "running",
        },
        () => {
          this.setInterval(this.tick, 1000);
        }
      );
    }
  };

  render() {
    return (
      <div className="minesweeper">
        {/* <h1>Minesweeper</h1> */}
        <BoardHead time={this.state.time} flagCount={this.state.flags} />
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          openCellClick={this.handleCellClick}
        />
      </div>
    );
  }
}
export default Minesweeper;
