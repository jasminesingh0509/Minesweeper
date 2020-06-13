import React, { Component } from "react";
import Row from "../Row";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createBoard(props),
    };
  }
  //nested for loop to add colums at each row
  createBoard = (props) => {
    let board = [];
    for (let i = 0; i < props.rows; i++) {
      board.push([]);

      for (let j = 0; j < props.columns; j++) {
        board[i].push({
          x: j,
          y: i,
          count: 0,
          isOpen: false,
          hasMine: false,
          hasFlag: false,
        });
      }
    }

    //after the board is created, add the mines randomly
    for (let i = 0; i < props.mines; i++) {
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomColumn = Math.floor(Math.random() * props.columns);

      let cell = board[randomRow][randomColumn];
      if (cell.hasMine) {
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return board;
  };

  //function to check if the cell is open
  open = (cell) => {
    console.log("STATUS: " + this.props.status);
    if (this.props.status === "ended") {
      return;
    }
    // function counts mines around an open cell, using promise.
    let asyncCountMines = new Promise((resolve) => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    asyncCountMines.then((numberOfMines) => {
      console.log("Be careful", numberOfMines, "mines near by!");
      let rows = this.state.rows;
      let current = rows[cell.y][cell.x];

      if (current.hasMine) {
        console.log("The cell has a mine, you lose. Restart!");
        console.log(current.hasMine);
        this.open(cell);
        this.props.endGame();
        current.isOpen = true;
        this.props.openCellClick();
      } else {
        if (!cell.hasFlag && !current.isOpen) {
          this.props.openCellClick();

          current.isOpen = true;
          current.count = numberOfMines;

          this.setState({ rows });
          if (!current.hasMine && numberOfMines === 0) {
            this.findAroundCell(cell);
          }
          if (cell.hasMine && this.props.openCells !== 0) {
            this.props.endGame();
          }
        }
      }
    });
  };

  flag = (cell) => {
    if (this.props.status === "ended") {
      return;
    }
    let rows = this.state.rows;
    cell.hasFlag = !cell.hasFlag;
    this.setState({ rows });
    this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
  };

  //function to check if mines are surrounding a single cell
  findMines = (cell) => {
    let minesProximity = 0;
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.rows.length &&
            cell.x + col < this.state.rows[0].length
          ) {
            if (
              this.state.rows[cell.y + row][cell.x + col].hasMine &&
              !(row === 0 && col === 0)
            ) {
              minesProximity++;
            }
          }
        }
      }
    }
    return minesProximity;
  };

  // go through each cell and open one by one until we find one with a mine
  findAroundCell = (cell) => {
    let rows = this.state.rows;

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (cell.y + row < rows.length && cell.x + col < rows[0].length) {
            if (
              !rows[cell.y + row][cell.x + col].hasMine &&
              !rows[cell.y + row][cell.x + col].isOpen
            ) {
              this.open(rows[cell.y + row][cell.x + col]);
            }
          }
        }
      }
    }
  };

  render() {
    let rows = this.state.rows.map((row, index) => {
      return <Row cells={row} key={index} open={this.open} flag={this.flag} />;
    });
    return <div className="board"> {rows}</div>;
  }
}
export default Board;
