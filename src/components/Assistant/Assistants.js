import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import AssistantNew from "./AssistantNew";
import AssistantForm from "./AssistantForm";

import { GET_ALL_ASSISTANTS } from "../../queries/Assistants/assistants";
import { DELETE_ASSISTANT } from "../../queries/Assistants/assistants";
import { EDIT_ASSISTANT } from "../../queries/Assistants/assistants";

const Assistants = (props) => {
	const { loading, error, data } = useQuery(GET_ALL_ASSISTANTS, {
		fetchPolicy: "cache-first",
	});

	const [deleteAssistant] = useMutation(DELETE_ASSISTANT, {
		update(cache, { data: { deleteAssistant: assistantDeleted } }) {
			const existingAssistants = cache.readQuery({
				query: GET_ALL_ASSISTANTS,
			});

			cache.writeQuery({
				query: GET_ALL_ASSISTANTS,
				data: {
					assistants: existingAssistants?.assistants.filter(
						(assistant) => assistant.id !== assistantDeleted.id
					),
				},
			});

			const idNormalized = cache.identify({
				id: assistantDeleted.id,
				__typename: "Assistant",
			});

			cache.evict({ id: idNormalized });
			cache.gc();
		},
	});

	const [updateAssistant] = useMutation(EDIT_ASSISTANT);
	const [addEditState, setAddEditState] = useState("add");
	const [edit, setEdit] = useState();

	const deleteAnAssistant = (id) => {
		deleteAssistant({
			variables: { id: parseInt(id) },
		});
		//In case the deleted group is loaded on the form.
		setAddEditState("add");
	};

	const editAssistant = (id, name, email) => {
		setEdit({ id, name, email });
		setAddEditState("edit");
	};

	const renderAssistants = () => {
		return data.assistants.map(({ id, name, email }) => {
			return (
				<div key={id} className="ju-item-row">
					<div className="inline-name-check">
						{name} {id} {email}
					</div>

					<div className="group_icon">
						<div onClick={() => editAssistant(id, name, email)}>
							<i className="edit outline icon"></i>
						</div>
						<div onClick={() => deleteAnAssistant(id)}>
							<i className="trash alternate outline icon"> </i>
						</div>
					</div>
				</div>
			);
		});
	};

	const onSubmitEdit = ({ id, name, email }) => {
		setAddEditState("add");
		console.log(id, name, email);
		updateAssistant({ variables: { id, name, email } });
	};

	const onCancelEdit = () => {
		setAddEditState("add");
	};

	const renderEdit = () => {
		return (
			<AssistantForm
				titleText="Edit Assistant"
				buttonText="Save Assistant"
				values={edit}
				onCancel={() => onCancelEdit()}
				onSubmit={(e) => onSubmitEdit(e)}
			/>
		);
	};

	if (loading) return <p> Loading... </p>;

	if (error) {
		return <p> Error </p>;
	}

	return (
		<div className="ju-central-panel">
			<div>
				<h1 className="ju-font_title">Your Assistants</h1>
				<div className="ju-groups"> {renderAssistants()}</div>
			</div>
			<div className="ju-form-position">
				{addEditState === "add" ? <AssistantNew /> : renderEdit()}
			</div>
		</div>
	);
};

export default Assistants;
