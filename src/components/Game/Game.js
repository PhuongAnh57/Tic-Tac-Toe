import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Game.module.scss";

import Board from "../Board";

const cx = classNames.bind(styles);

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [location, setLocation] = useState([{row: null, col: null}]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isCheck, setIsCheck] = useState("asc");
  //   const currentSquares = history[history.length - 1];
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares, row, col) => {
    // setHistory([...history, nextSquares]);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //
    setXIsNext(!xIsNext);
    
    const nextLocation = [...location.slice(0, currentMove + 1), {row, col}];
    setLocation(nextLocation);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

  const renderHistoryDesc = (array) => {
    return array.map((squares, move) => {
      let description = "";
      if (move === array.length - 1) {
        description = "Go to game start";
      } else {
        description = `Go to move #${array.length - 1 - move} (${location[array.length - 1 - move].row}, ${location[array.length - 1 - move].col})`;
      }
      return (
        <li key={move}>
          {(currentMove === array.length - 1 - move) && (currentMove!==0) ? (
            <span onClick={() => jumpTo(array.length - 1 - move)}>
              You are at move #{array.length - 1 - move} ({location[array.length - 1 - move].row}, {location[array.length - 1 - move].col})
            </span>
          ) : (
            <button onClick={() => jumpTo(array.length - 1 - move)}>
              {description}
            </button>
          )}
        </li>
      );
    });
  };

  const renderHistoryAsc = (array) => {
    return array.map((squares, move) => {
      let description = "";
      // console.log(location);
      if (move > 0) {
        description = `Go to move #${move} (${location[move].row}, ${location[move].col})`;
      } else {
        description = "Go to game start";
      }
      return (
        <li key={move}>
          {currentMove === move && move!==0 ? (
            <span onClick={() => jumpTo(move)}>You are at move #{move} ({location[move].row}, {location[move].col})</span>
          ) : (
            <button onClick={() => jumpTo(move)}>{description}</button>
          )}
        </li>
      );
    });
  };

  return (
    <div className={cx("game")}>
      <div className={cx("game-board")}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className={cx("game-info")}>
        <label htmlFor="choice">Tùy chọn: </label>
        <input
          checked={"asc" === isCheck}
          id="choice"
          type="radio"
          name="choice"
          value="asc"
          onChange={(e) => setIsCheck(e.target.value)}
        />
        Tăng dần
        <input
          checked={"desc" === isCheck}
          id="choice"
          type="radio"
          name="choice"
          value="desc"
          onChange={(e) => setIsCheck(e.target.value)}
        />
        Giảm dần
        <ol>
          {isCheck === "desc"
            ? renderHistoryDesc(history.slice().reverse())
            : renderHistoryAsc(history)}
        </ol>
      </div>
    </div>
  );
}

export default Game;
