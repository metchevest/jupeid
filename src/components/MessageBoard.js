import React, { useContext } from "react";

import { MessageContext } from "./Context/MessageContext";

const MessageBoard = () => {
	const value = useContext(MessageContext);

	let className = "";
	if (value.positive) {
		className = "ui success message";
	} else {
		className = "ui negative message";
	}

	if (value.messageTop !== "") {
		return (
			<div
				className={className}
				onClick={() => {
					value.setMessage({
						top: "",
						bottom: "",
						positive: true,
					});
				}}
			>
				<i className="close icon"></i>
				<div className="header">{value.messageTop}</div>
				<p> {value.messageBottom}</p>
			</div>
		);
	} else {
		return null;
	}
};

export default MessageBoard;
