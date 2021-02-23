import React from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_GROUP = gql`
	mutation createGroup($name: String!, $cost: Float!) {
		createGroup(name: $name, cost: $cost) {
			id
			name
			cost
		}
	}
`;

const NewGroup = () => {
	const [addGroup] = useMutation(ADD_GROUP);
	// , {
	// 	update(cache, { data: { createGroup } }) {
	// 		console.log("estoy en update cache");
	// 		console.log(cache);
	// 		console.log(createGroup);
	// 		cache.modify({
	// 			fields: {
	// 				allGroups(existingGroups = []) {
	// 					const newGroupRef = cache.writeFragment({
	// 						data: createGroup,
	// 						fragment: gql`
	// 							fragment NewGroup on allGroups {
	// 								id
	// 								cost
	// 							}
	// 						`,
	// 					});
	// 					return [...existingGroups, newGroupRef];
	// 				},
	// 			},
	// 		});
	// 	},
	// });

	const submitNewGroup = (e) => {
		e.preventDefault();
		addGroup({
			variables: {
				name: e.target.name.value,
				cost: parseFloat(e.target.cost.value),
			},
		}).then((e) => {
			console.log("Done--");
			console.log(e);
		});
	};

	return (
		<div>
			<h4 className="ui dividing header">New Group:</h4>
			<form className="ui form" onSubmit={(e) => submitNewGroup(e)}>
				<div className="field">
					<label>Name</label>
					<input type="text" name="name" placeholder="Enter a name" />
				</div>

				<div className="field">
					<label>Cost</label>
					<input type="number" name="cost" placeholder="Enter the cost" />
				</div>

				<button className="ui button" type="submit">
					Add Group
				</button>
			</form>
		</div>
	);
};

export default NewGroup;
