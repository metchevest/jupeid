import React from "react";
import { useMutation } from "@apollo/client";

import GroupForm from "./GroupForm";
import { GET_ALL_GROUPS } from "../../queries/Groups/groups";
import { ADD_GROUP } from "../../queries/Groups/groups";

const NewGroup = (props) => {
	const [addGroup] = useMutation(ADD_GROUP, {
		update(cache, { data }) {
			const newGroupFromResponse = data?.createGroup;
			const existingGroups = cache.readQuery({
				query: GET_ALL_GROUPS,
			});

			if (existingGroups && newGroupFromResponse) {
				cache.writeQuery({
					query: GET_ALL_GROUPS,
					data: {
						groups: [...existingGroups.groups, newGroupFromResponse],
					},
				});
			}
		},
	});

	const submitNewGroup = (e) => {
		addGroup({
			variables: {
				name: e.name,
				cost: parseFloat(e.cost),
			},
		});
	};

	return (
		<GroupForm
			titleText="New Group:"
			buttonText="Add Group"
			values={{ name: "", cost: "0.00" }}
			onSubmit={(e) => submitNewGroup(e)}
		/>
	);
};

export default NewGroup;
