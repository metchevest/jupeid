import React from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";
import AuthGate from "./Auth/AuthGate";

const Header = () => {
	return (
		<div>
			<div className="ju-header">
				<div>
					<Link to="/" className="ju-title">
						{" "}
						Jupeid ?
					</Link>
				</div>
				<div>
					<AuthGate />
				</div>
			</div>

			<Menu />
		</div>
	);
};

export default Header;
