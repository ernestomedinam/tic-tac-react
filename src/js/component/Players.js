import React from "react";
import PropTypes from "prop-types";
import { Col, Form } from "react-bootstrap";
import { MyBadge } from "./MyBadge";

// props = {
//     players: [],
//     setPlayers: () => {}
// }

export const Players = ({ players, setPlayers }) => {
	return (
		<React.Fragment>
			{players.map((player, index, playersArray) => {
				return (
					<Col
						key={index}
						xs={4}
						className="d-flex flex-column justify-content-center align-items-center">
						<Form.Control
							type="input"
							placeholder="input your name"
							className="my-input"
							value={player.name}
							onChange={e => {
								let newPlayers = [];
								for (let p of playersArray) {
									if (p.nature == player.nature) {
										newPlayers.push({
											name: e.target.value,
											nature: player.nature
										});
									} else {
										newPlayers.push(p);
									}
								}
								setPlayers(newPlayers);
							}}
						/>
						<MyBadge nature={player.nature} className="mt-5" />
					</Col>
				);
			})}
		</React.Fragment>
	);
};

Players.propTypes = {
	players: PropTypes.array,
	setPlayers: PropTypes.func
};
