import React from "react";
import { Link } from "react-router-dom";

import Logout from "./Logout";
import { useUserQuery } from "./userQuery";

const AuthGate = () => {
	const userData = useUserQuery();

	if (userData.data) {
		return <Logout />;
	}
	return (
		<div>
			<ul>
				<Link to="/"> Log In </Link>
				<Link to="signup"> Sign Up </Link>
			</ul>
		</div>
	);
};

export default AuthGate;
