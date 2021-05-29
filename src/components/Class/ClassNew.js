import React from "react";
import { useMutation } from "@apollo/client";

import ClassForm from "./ClassForm";
import { GET_ALL_CLASSES } from "../../queries/Classes/classes";
import { ADD_CLASS } from "../../queries/Classes/classes";

const ClassNew = () => {
	const [addClass] = useMutation(ADD_CLASS, {
		update(cache, { data }) {
			const newClassFromResponse = data?.createClass;
			const existingClasses = cache.readQuery({
				query: GET_ALL_CLASSES,
			});

			console.log(cache);
			if (existingClasses && newClassFromResponse) {
				cache.writeQuery({
					query: GET_ALL_CLASSES,
					data: {
						classes: [...existingClasses.classes, newClassFromResponse],
					},
				});
			}
		},
	});

	const submitNewClass = (e) => {
		addClass({
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
			values={{ name: "", hour: "", activity: "", date: "" }}
			onSubmit={(e) => submitNewClass(e)}
		/>
	);
};

export default ClassNew;
