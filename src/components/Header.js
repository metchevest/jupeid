import React from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";
import AuthGate from "./Auth/AuthGate";
import MessageBoard from "./MessageBoard";

const Header = ({ message }) => {
	return (
		<div>
			<div className="ju-header">
				<div>
					<Link to="/" className="ju-title first-step">
						{" "}
						Jupeid ?
					</Link>
				</div>
				<div>
					<AuthGate />
				</div>
			</div>

			<Menu />
			<MessageBoard />
		</div>
	);
};

export default Header;
