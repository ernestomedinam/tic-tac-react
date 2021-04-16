import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import { MyBadge } from "./MyBadge";

export const Board = props => {
	const [board, setBoard] = useState([
		[null, null, null],
		[null, null, null],
		[null, null, null]
	]);
	const handlePlay = (row, column) => {
		if (board[row][column] == null && props.game.status == "playing") {
			// cambio el valor y hago setBoard
			let newBoard = [...board];
			newBoard[row][column] = props.game.turn;
			setBoard(newBoard);
			props.setGame({
				...props.game,
				turn: props.game.turn == "x" ? "o" : "x"
			});
		}
	};
	useEffect(() => {
		// si estan todas las celdas llenas
		const checkIfFull = () => {
			for (let row of board) {
				for (let cell of row) {
					if (cell == null) {
						return false;
					}
				}
			}
			return true;
		};
		// verificar si alguien ganó
		const checkIfWinner = () => {
			let columns = [[], [], []];
			for (let row of board) {
				if (row[0] == row[1] && row[1] == row[2] && row[0] != null) {
					return row[0];
				}
				columns[0].push(row[0]);
				columns[1].push(row[1]);
				columns[2].push(row[2]);
			}
			for (let column of columns) {
				if (
					column[0] == column[1] &&
					column[1] == column[2] &&
					column[0] != null
				) {
					return column[0];
				}
			}
			if (
				(board[1][1] == board[0][0] &&
					board[1][1] == board[2][2] &&
					board[1][1] != null) ||
				(board[1][1] == board[0][2] &&
					board[1][1] == board[2][0] &&
					board[1][1] != null)
			) {
				return board[1][1];
			}
			return false;
		};
		let winner = checkIfWinner();
		if (winner != false) {
			props.setGame({
				status: "over",
				turn: null,
				winner: winner
			});
		} else if (checkIfFull()) {
			props.setGame({
				status: "over",
				turn: null,
				winner: "toe"
			});
		}
	}, [board]);

	return (
		<div className="col-8">
			<h2 className="display-4">
				{props.game.winner
					? props.game.winner != "toe"
						? `CONGRATULATIONS ${
								props.players.find(
									player => player.nature == props.game.winner
								).name
						  }!!`
						: "The toe is the winner..."
					: `It's ${
							props.players.find(
								player => player.nature == props.game.turn
							).name
					  } turn (${props.game.turn})`}
			</h2>
			<div className="d-flex flex-wrap board">
				{board.map((row, rowIndex) => {
					return (
						<React.Fragment key={rowIndex}>
							{row.map((cell, colIndex) => {
								return (
									<Col
										xs={4}
										key={`${rowIndex}-${colIndex}`}
										className="cell"
										onClick={e => {
											handlePlay(rowIndex, colIndex);
										}}>
										{cell != null && (
											<MyBadge
												nature={cell}
												mini={true}
											/>
										)}
									</Col>
								);
							})}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

Board.propTypes = {
	players: PropTypes.array,
	game: PropTypes.object,
	setGame: PropTypes.func
};
