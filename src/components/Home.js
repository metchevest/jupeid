import React from "react";
import { useQuery, gql } from "@apollo/client";

import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import { GET_ALL_USERS } from "../queries/User/user";

const Home = () => {
	const { loading, error, data } = useQuery(GET_ALL_USERS);

	if (loading) return <p> Loading---</p>;

	if (error) {
		console.log(error);
		return <p> Error ---: </p>;
	}

	const renderUsers = () => {
		return data.allUsers.map(({ id, email }) => (
			<div key={id}>
				<p> ID : </p>
				{id}
				<p> Email: </p> {email}
			</div>
		));
	};

	return (
		<div className="ju-central-panel">
			<div>
				<h3> Welcome to Jupeid !!! </h3>
				<p> List of users in the app, just for testing</p>
				{renderUsers()}
			</div>

			<div>
				<SignIn />
			</div>
		</div>
	);
};

export default Home;
