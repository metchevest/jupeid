import React from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_GROUP = gql`
	mutation createGroup($userId: ID!) {
		createGroup(cost: 15.5, userId: $userId) {
			id
			cost
		}
	}
`;

const NewGroup = () => {
	let input;
	const [addGroup, { data }] = useMutation(ADD_GROUP, {
		update(cache, { data: { createGroup } }) {
			cache.modify({
				fields: {
					allGroups(existingGroups = []) {
						const newGroupRef = cache.writeFragment({
							data: createGroup,
							fragment: gql`
								fragment NewGroup on allGroups {
									id
									cost
								}
							`,
						});
						return [...existingGroups, newGroupRef];
					},
				},
			});
		},
	});

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log("Here we go");
					console.log(input.value);
					addGroup({ variables: { userId: parseInt(input.value) } }).then(
						() => {
							console.log("Nani lo hizo");
						}
					);
					input.value = "";
				}}
			>
				<input placeholder="Enter a name" />
				<input
					ref={(node) => {
						input = node;
					}}
				/>
				<button type="submit">Add Group</button>
			</form>
		</div>
	);
};

export default NewGroup;
