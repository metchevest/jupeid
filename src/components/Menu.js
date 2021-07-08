import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
	return (
		<div className="ju-menu">
			<Link to="/classes" className="ju-item second-step">
				<div className="menu-item"> Classes</div>
			</Link>
			<Link to="/payments" className="ju-item third-step">
				<div className="menu-item">Payments</div>
			</Link>
			<Link to="/students" className="ju-item fourth-step">
				<div className="menu-item"> Students</div>
			</Link>
			<Link to="/groups" className="ju-item fifth-step">
				<div className="menu-item">Grups</div>
			</Link>
		</div>
	);
};

export default Menu;
