import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Game.module.scss";

import Board from "../Board";

const cx = classNames.bind(styles);

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isCheck, setIsCheck] = useState("asc");
  //   const currentSquares = history[history.length - 1];
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    // setHistory([...history, nextSquares]);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    //
    setXIsNext(!xIsNext);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  };

//   const renderHistory = (array) => {
//     return array.map((squares, move) => {
//       let description = "";
//       if (move > 0) {
//         description = "Go to move #" + move;
//       } else {
//         description = "Go to game start";
//       }
//       return (
//         <li key={move}>
//           {currentMove === move ? (
//             <span onClick={() => jumpTo(move)}>You are at move #{move}</span>
//           ) : (
//             <button onClick={() => jumpTo(move)}>{description}</button>
//           )}
//         </li>
//       );
//     });
//   };

  const moves = history.map((squares, move) => {
    let description = "";
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {currentMove === move ? (
          <span onClick={() => jumpTo(move)}>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

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

        {/* <ol>{isCheck==='desc'?renderHistory(history.slice().reverse()):renderHistory(history)}</ol> */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
