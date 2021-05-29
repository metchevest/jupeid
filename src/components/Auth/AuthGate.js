import React from "react";
import { Link } from "react-router-dom";

// import { useAuthToken } from "./AuthToken";
import Logout from "./Logout";
import { useUserQuery } from "./userQuery";

const AuthGate = () => {
	// const [authToken, ,] = useAuthToken();

	const userData = useUserQuery();
	console.log(userData);
	if (userData.data) {
		console.log("En AuthGate", userData);
		return <Logout />;
	}
	return (
		<div>
			<ul>
				<Link to="/"> Log In </Link>
				<Link to="Signup"> Sign Up </Link>
			</ul>
		</div>
	);
};

export default AuthGate;
