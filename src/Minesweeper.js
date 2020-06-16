import React, { Component } from "react";
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";

// this is the parent component
class Minesweeper extends Component {
  constructor() {
    super();
    this.intervals = [];

    this.state = {
      rows: 16,
      columns: 16,
      flags: 40,
      mines: 40,
      status: "waiting", //status can be waiting runnning or ended
      openCells: 0,
      time: 0,
    };
    this.baseState = this.state;
  }

  endGame = () => {
    this.setState({
      status: "ended",
    });
  };

  //reset the board, when you loose, clear intervals
  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState));
  };

  //function to add time when game is running, when open cells are greater than 0 start the clock
  tick = () => {
    if (this.state.openCells > 0 && this.state.status === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  // function to handle when a cell is clicked on, check time and status, this function is passed into board
  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.status !== "running") {
      this.setState(
        {
          status: "running",
        },
        () => {
          //starts the clock
          this.setInterval(this.tick, 1000);
        }
      );
    }

    // add this to stop timer
    this.setState((prevState) => {
      return { openCells: prevState.openCells + 1 };
    });
  };

  //reduce the amount of flags available.
  changeFlagAmount = (amount) => {
    this.setState({ flags: this.state.flags + amount });
  };

  render() {
    return (
      <div className="minesweeper">
        <BoardHead
          time={this.state.time}
          flagCount={this.state.flags}
          reset={this.reset}
        />
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          openCellClick={this.handleCellClick}
          endGame={this.endGame}
          gameOver={this.state.status === "ended"}
          changeFlagAmount={this.changeFlagAmount}
          status={this.state.status}
        />
      </div>
    );
  }
}
export default Minesweeper;
