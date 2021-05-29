import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { useAuthToken } from "./AuthToken";
import { LOG_OUT } from "../../queries/User/user";

import history from "../../history";

const Logout = () => {
	const [, _, removeAuthToken] = useAuthToken();
	const apolloClient = useApolloClient();

	// // const logFrontOut = async () => {
	// const logFrontOut = () => {

	// 	// removeAuthToken();
	// };

	const [logout] = useMutation(LOG_OUT);

	const logOut = () => {
		logout();
		apolloClient.clearStore();
		apolloClient.resetStore();
		// console.log()
		history.push("/");
	};

	return (
		<Link to="/" onClick={() => logOut()}>
			Log Out
		</Link>
	);
};

export default Logout;
