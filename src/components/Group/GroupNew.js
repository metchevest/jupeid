import React from "react";

import GroupForm from "./GroupForm";

import { useGroupHook } from "../Hooks/useGroupHook";
const NewGroup = () => {
	const [createGroup] = useGroupHook();

	const submitNewGroup = (e) => {
		createGroup({
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
			onSubmit={(e) => submitNewGroup(e)}
		/>
	);
};

export default NewGroup;
