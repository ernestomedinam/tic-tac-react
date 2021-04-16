import React from "react";
import PropTypes from "prop-types";

export const MyBadge = props => {
	return (
		<div
			className={`d-flex justify-content-center align-items-center badge${
				props.mini ? " mini" : ""
			}`}>
			<p className="m-0">{props.nature == "x" ? "✖" : "⭕"}</p>
		</div>
	);
};

MyBadge.propTypes = {
	nature: PropTypes.oneOf(["x", "o"]),
	mini: PropTypes.bool
};
