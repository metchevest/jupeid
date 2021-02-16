import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
	return (
		<div className="menu-ju">
			<Link to="/assistants" className="blackie">
				<div className="menu-item"> Assistants</div>
			</Link>
			<Link to="/groups" className="blackie">
				<div className="menu-item">Grups</div>
			</Link>
			<Link to="/classes" className="blackie">
				<div className="menu-item"> Classes</div>
			</Link>
		</div>
	);
};

export default Menu;
