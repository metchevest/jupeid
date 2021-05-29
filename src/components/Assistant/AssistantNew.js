import React from "react";
import { useMutation } from "@apollo/client";

import AssistantForm from "./AssistantForm";
import { GET_ALL_ASSISTANTS } from "../../queries/Assistants/assistants";
import { ADD_ASSISTANT } from "../../queries/Assistants/assistants";

const AssistantNew = () => {
	const [addAssistant] = useMutation(ADD_ASSISTANT, {
		update(cache, { data }) {
			const newAssistantFromResponse = data?.createAssistant;
			const existingAssistants = cache.readQuery({
				query: GET_ALL_ASSISTANTS,
			});

			console.log("en el update de assistantNew");
			console.log(existingAssistants);
			console.log(newAssistantFromResponse);
			if (existingAssistants && newAssistantFromResponse) {
				cache.writeQuery({
					query: GET_ALL_ASSISTANTS,
					data: {
						assistants: [
							...existingAssistants.assistants,
							newAssistantFromResponse,
						],
					},
				});
			}
		},
	});

	const submitNewAsistant = (e) => {
		addAssistant({
			variables: {
				name: e.name,
				email: e.email,
			},
		});
	};

	return (
		<AssistantForm
			titleText="New Assistant"
			buttonText="Add Assistant"
			values={{ name: "", email: "" }}
			onSubmit={(e) => submitNewAsistant(e)}
		/>
	);
};

export default AssistantNew;
