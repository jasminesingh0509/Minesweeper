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
    time: 0,
  };

  endGame = () => {
    this.setState({
      status: "ended",
    });
  };

  componentWillMount() {
    this.intervals = [];
  }
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
    //console.log("click", this.state);
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
        {/* <h1>Minesweeper</h1> */}
        <BoardHead time={this.state.time} flagCount={this.state.flags} />
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          openCellClick={this.handleCellClick}
          endGame={this.endGame}
          changeFlagAmount={this.changeFlagAmount}
          status={this.state.status}
        />
      </div>
    );
  }
}
export default Minesweeper;
