import React, { Component } from "react";
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";

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
        <BoardHead time={this.state.time} flagCount={this.state.flags} />
        <Board
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
        />
      </div>
    );
  }
}
export default Minesweeper;
