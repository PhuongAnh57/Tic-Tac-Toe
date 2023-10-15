import { useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Board.module.scss';

import Square from '../Square';

const cx = classNames.bind(styles);

function Board({ xIsNext, squares, onPlay }) {
    const isFullSquare = () => {
        for(let square of squares) {
            if(!square) return false;
        }
        return true;
    }

    const winner = calculateWinner(squares);
    let status = '';
    const positions = useRef();
    if(winner) {
        status = `Winner: ${winner.name}`;
        positions.current = winner.positions;
    } else if(isFullSquare() === true){
        status = 'Result: Draw';
    } else {
        status = `Next player: ${xIsNext?'X':'O'}`;
    }    

    const handleClick = (index) => {
        if(winner || squares[index]) return;

        const nextSquares = squares.slice();

        if(xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O";
        }

        // setSquares(nextSquares);
        // setXIsNext(!xIsNext);
        onPlay(nextSquares);
    }

    return (
        <>
            <h1 className={cx('status')}>{status}</h1>
            {/* onSquareClick={handleClick(0)} => luôn luôn gọi hàm handleClick => vòng lặp vô hạn */}
            {/* <div className={cx('board-row')}>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className={cx('board-row')}>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className={cx('board-row')}>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div> */}

            {Array(3).fill(null).map((row, i) => (
                <div key={i} className={cx('board-row')}>
                    {Array(3).fill(null).map((col, j) => (
                        <Square 
                            key={j} 
                            value={squares[i*3+j]}
                            color={winner && positions.current.includes(i*3+j)}
                            onSquareClick={() => handleClick(i*3+j)}/>
                    ))}
                </div>
            ))}
        </>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return {
                name: squares[a],
                positions: [a, b, c]
            }
        }
    }
    return null;
}

export default Board;