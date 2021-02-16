import React from "react";
import { useQuery, gql } from "@apollo/client";

const allUsers = gql`
	query allUsers {
		allUsers {
			id
			name
		}
	}
`;

const Home = () => {
	const { loading, error, data } = useQuery(allUsers);

	if (loading) return <p> Loading---</p>;

	if (error) return <p> Error ---: </p>;
	console.log(data);
	const renderUsers = () => {
		return data.allUsers.map(({ id, name }) => (
			<div key={id}>
				{id} {name}
			</div>
		));
	};

	return (
		<div>
			<h3> This is home.</h3>
			{renderUsers()}
		</div>
	);
};

export default Home;
