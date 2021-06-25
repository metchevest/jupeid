import React from "react";

import ClassForm from "./ClassForm";

import { useClassHook } from "../Hooks/useClassHook";

const ClassNew = () => {
	const [createClass] = useClassHook();

	const submitNewClass = (e) => {
		createClass({
			variables: {
				date: e.date,
				hour: parseFloat(e.hour),
				name: e.name,
				activity: e.activity,
			},
		});
	};

	return (
		<ClassForm
			titleText="New Class:"
			buttonText="Add Class"
			onSubmit={(e) => submitNewClass(e)}
		/>
	);
};

export default ClassNew;
