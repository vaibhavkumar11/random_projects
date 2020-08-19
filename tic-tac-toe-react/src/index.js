import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
		const lines = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
				const [a, b, c] = lines[i];
				if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
						return squares[a];
				}
		}
		return null;
}

function Square({value, onClick}){
		return(
				<button 
						className="square" 
						onClick={() => onClick()}>
						{value}
				</button>
		);
}

function Board({squares, onClick}){
		function renderSquare(i){
				return (
						<Square 
								value={squares[i]}
								onClick={() => onClick(i)}
						/>
				);
		}

		return (
				<div>
						<div className="board-row">
								{renderSquare(0)}
								{renderSquare(1)}
								{renderSquare(2)}
						</div>
						<div className="board-row">
								{renderSquare(3)}
								{renderSquare(4)}
								{renderSquare(5)}
						</div>
						<div className="board-row">
								{renderSquare(6)}
								{renderSquare(7)}
								{renderSquare(8)}
						</div>
				</div>
		)
}

function Game(){
		const [squares, setSquares] = useState(Array(9).fill(null));
		const [xNext, setXNext] = useState(true);
		const [history, setHistory] = useState([{
				squares: squares,
		}]);

		function handleClick(i){
				const squares_cpy = squares.slice();
				if(calculateWinner(squares_cpy) || squares_cpy[i])
						return;
				squares_cpy[i] = xNext ? 'X' : 'O';
				setSquares(squares_cpy);
				setXNext(!xNext);
				setHistory(history.concat([{
						squares: squares_cpy,
				}]));
		}

		const winner = calculateWinner(squares);
		let status;
		if(winner){
				status = 'Winner: ' + winner;
		} else {
				status = 'Next Player: ' + (xNext ? 'X' : 'O');
		}

		return (
				<div className="game">
						<div className="game">
								<div className="game-board">
										<Board 
												squares = {squares}
												onClick = { (i) => handleClick(i)}
										/>
								</div>
								<div className="game-info">
										<div>{status}</div>
										<ol> {/* TODO */} </ol>
								</div>
						</div>
				</div>
		);
}

const rootElement = document.getElementById("root");
ReactDOM.render(
		<React.StrictMode>
				<Game />
		</React.StrictMode>,
		rootElement
);

