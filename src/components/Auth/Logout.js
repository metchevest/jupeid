import React from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { LOG_OUT } from "../../queries/User/user";

import history from "../../history";

const Logout = () => {
	const apolloClient = useApolloClient();

	// // const logFrontOut = async () => {
	// const logFrontOut = () => {

	// 	// removeAuthToken();
	// };

	const [logout] = useMutation(LOG_OUT, {
		onCompleted: () => {
			console.log("ahora navego a home");
			history.push("/");
		},
	});

	const logOut = () => {
		logout();
		// apolloClient.cache.evict({ id: "User:1" });
		apolloClient.clearStore();
		apolloClient.resetStore();
		console.log("salgo de logout");
	};

	return (
		<Link to="/" onClick={() => logOut()}>
			Log Out
		</Link>
	);
};

export default Logout;
