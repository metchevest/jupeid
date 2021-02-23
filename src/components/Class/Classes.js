import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import NewClass from "./NewClass";

const FETCH_CLASSES = gql`
	query getClasses {
		allClasses {
			id
			name
		}
	}
`;

const Classes = () => {
	const { loading, error, data } = useQuery(FETCH_CLASSES);

	const renderClasses = () => {
		return data.allClasses.map(({ id, name }) => {
			return (
				<div key={id} className="two wide column border">
					{name}
				</div>
			);
		});
	};

	if (loading) return <p> Loading... </p>;
	console.log(error);
	if (error) return <p> Error </p>;

	return (
		<div className="ju-central-panel">
			{" "}
			<h1 className="ju-font">Your classes for today:</h1>
			<div className="ui grid container">{renderClasses()}</div>
			<NewClass />
		</div>
	);
};

export default Classes;
