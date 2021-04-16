import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Board } from "./Board";
import { Players } from "./Players";

//create your first component
export function Home() {
	const [game, setGame] = useState({
		status: "starting", // starting: escogemos jugadores; 'playing', 'over'
		turn: null,
		winner: null // x, o, toe
	});
	const [players, setPlayers] = useState([
		{
			name: "",
			nature: "x"
		},
		{
			name: "",
			nature: "o"
		}
	]);
	return (
		<Container fluid className="bg-dark text-white h-100">
			<Row className="justify-content-center mb-4">
				<Col xs={8}>
					<h1 className="text-center display-1">
						{"Hello tic-tac-toe"}
					</h1>
				</Col>
			</Row>
			<Row className="justify-content-center my-2">
				{/* vista para escoger jugadores o el tablero */}
				{game.status == "starting" ? (
					<Players players={players} setPlayers={setPlayers} />
				) : (
					<Board players={players} game={game} setGame={setGame} />
				)}
			</Row>
			<Row className="justify-content-center">
				{game.status != "playing" && (
					<Button
						className="btn btn-success"
						onClick={e => {
							if (game.status == "over") {
								setGame({
									winner: null,
									turn: null,
									status: "starting"
								});
							} else {
								setGame({
									...game,
									turn: "x",
									status: "playing"
								});
							}
						}}
						disabled={
							players[0].name == "" || players[1].name == ""
						}>
						{"start playing!"}
					</Button>
				)}
			</Row>
		</Container>
	);
}
