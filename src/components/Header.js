import React from "react";

import Menu from "./Menu";

const Header = () => {
	return (
		<div>
			<div className="ju-header">
				<h1 className="title"> Jupeid</h1>
				<div className="inline field">
					<label className="switch">
						<input type="checkbox" />
						<span className="slider"></span>
					</label>
				</div>
			</div>

			<Menu />
		</div>
	);
};

export default Header;
