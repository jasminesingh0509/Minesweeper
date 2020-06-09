import React, { Component } from "react";
import Board from "./components/Board";

class Minesweeper extends Component {
  state = {
    rows: 16,
    columns: 16,
    flags: 10,
    mines: 40,
  };
  render() {
    return (
      <div className="minesweeper">
        <Board rows={this.state.rows} columns={this.state.columns} />
      </div>
    );
  }
}
export default Minesweeper;
