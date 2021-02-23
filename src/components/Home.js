import React from "react";
import { useQuery, gql } from "@apollo/client";

import Signup from "./Auth/Signup";

const allUsers = gql`
	query allUsers {
		allUsers {
			id
			email
		}
	}
`;

const Home = () => {
	const { loading, error, data } = useQuery(allUsers);

	if (loading) return <p> Loading---</p>;

	if (error) return <p> Error ---: </p>;
	console.log(data);
	const renderUsers = () => {
		return data.allUsers.map(({ id, email }) => (
			<div key={id}>
				{id} {email}
			</div>
		));
	};

	return (
		<div className="ju-central-panel">
			<div>
				<h3> Welcome to Jupeid !!! </h3>
				{renderUsers()}
			</div>

			<Signup />
		</div>
	);
};

export default Home;
