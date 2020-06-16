import React, { Component } from "react";
import Row from "../Row";

//passed to minesweeper
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createBoard(props),
    };
  }
  //passing the state to the reset
  componentWillReceiveProps(nextProps) {
    if (
      this.props.openCells > nextProps.openCells ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        rows: this.createBoard(nextProps),
      });
    }
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
        // if a mine is already present, go through again
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return board;
  };

  //function to check if the cell is open
  open = (cell) => {
    //if status is ended, start again
    if (this.props.status === "ended") {
      return;
    }
    // function counts mines around an open cell asynchronously, using promise.
    let asyncCountMines = new Promise((resolve) => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    asyncCountMines.then((numberOfMines) => {
      let rows = this.state.rows;
      let current = rows[cell.y][cell.x];
      //if the current cell has a mine, end the game
      if (current.hasMine) {
        current.isOpen = true;
        this.props.endGame();
      } else {
        if (!cell.hasFlag && !current.isOpen) {
          this.props.openCellClick();
          current.isOpen = true;
          current.count = numberOfMines;
          this.setState({ rows });
          // if the current does not have a flag, and is not a bomb, open the surrounding cells
          if (!current.hasMine && numberOfMines === 0) {
            this.findAroundCell(cell);
          }
          //if the current cell has a mine, end the game
          if (cell.hasMine && this.props.openCells !== 0) {
            this.props.endGame();
          }
        }
      }
    });
  };

  // if a cell is not open, add a flag and decrememnt the amount of flags left
  flag = (cell) => {
    if (this.props.status === "ended") {
      return;
    }
    if (!cell.isOpen) {
      let rows = this.state.rows;
      cell.hasFlag = !cell.hasFlag;
      this.setState({ rows });
      this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
    }
  };

  //function to check if mines are surrounding a single cell, 8 cells surrounding each cell.
  findMines = (cell) => {
    let minesProximity = 0;
    //first loop through rows, position -1 to 1.
    for (let row = -1; row <= 1; row++) {
      //loop through columns, position -1 to 1
      for (let col = -1; col <= 1; col++) {
        //check if the cell is at the edge
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.rows.length &&
            cell.x + col < this.state.rows[0].length
          ) {
            if (
              // if the cell has a mine or not and if it is at the end
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
    //first loop through rows, position -1 to 1.
    for (let row = -1; row <= 1; row++) {
      //loop through columns, position -1 to 1
      for (let col = -1; col <= 1; col++) {
        //check if the cell is at the edge
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

    let gameOver = this.props.gameOver ? (
      <div className="game-over"> Game Over 👎🏽 Click Reset to start again!</div>
    ) : (
      ""
    );

    return (
      <div className="board">
        {gameOver}
        {rows}
      </div>
    );
  }
}
export default Board;
