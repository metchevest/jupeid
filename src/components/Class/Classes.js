import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import ClassNew from "./ClassNew";
import ClassForm from "./ClassForm";

import { GET_ALL_CLASSES } from "../../queries/Classes/classes";
import { DELETE_CLASS } from "../../queries/Classes/classes";
import { EDIT_CLASS } from "../../queries/Classes/classes";

const Classes = (props) => {
	const { loading, error, data } = useQuery(GET_ALL_CLASSES, {
		fetchPolicy: "cache-first",
	});

	if (data) {
		console.log("las clases son ", data);
	}

	const [deleteClass] = useMutation(DELETE_CLASS, {
		update(cache, { data: { deleteClass: classDeleted } }) {
			const existingClasses = cache.readQuery({
				query: GET_ALL_CLASSES,
			});

			cache.writeQuery({
				query: GET_ALL_CLASSES,
				data: {
					classes: existingClasses?.classes.filter(
						(aClass) => aClass.id !== classDeleted.id
					),
				},
			});

			const idNormalized = cache.identify({
				id: classDeleted.id,
				__typename: "Class",
			});

			cache.evict({ id: idNormalized });
			cache.gc();
		},
	});

	const [updateClass] = useMutation(EDIT_CLASS);
	const [addEditState, setAddEditState] = useState("add");
	const [edit, setEdit] = useState();

	const deleteAClass = (id) => {
		deleteClass({ variables: { id: parseInt(id) } });

		//In case the deleted group is loaded on the form.
		setAddEditState("add");
	};

	const editClass = (id, name, hour, date, activity) => {
		setEdit({ id, name, hour, date, activity });
		setAddEditState("edit");
	};

	const renderClasses = () => {
		return data.classes.map(({ id, name, hour, date, activity }) => {
			return (
				<div key={id} className="ju-item-row">
					<div className="inline-name-check">
						{name} {id}
					</div>
					<div>
						<i className="dollar sign icon"></i> {}
					</div>
					<div className="group_icon">
						<div onClick={() => editClass(id, name, hour, date, activity)}>
							<i className="edit outline icon"></i>
						</div>
						<div onClick={() => deleteAClass(id)}>
							<i className="trash alternate outline icon"> </i>
						</div>
					</div>
				</div>
			);
		});
	};

	const onSubmitEdit = ({ id, name, hour, date, activity }) => {
		setAddEditState("add");
		updateClass({ variables: { id, name, hour, date, activity } });
	};

	const onCancelEdit = () => {
		setAddEditState("add");
	};

	const renderEdit = () => {
		return (
			<ClassForm
				titleText="Edit Class"
				buttonText="Save Class"
				values={edit}
				onCancel={() => onCancelEdit()}
				onSubmit={(e) => {
					onSubmitEdit(e);
				}}
			/>
		);
	};

	if (loading) return <p> Loading... </p>;

	if (error) {
		console.log(error);
		return <p> Error </p>;
	}

	return (
		<div className="ju-central-panel">
			<div>
				<h1 className="ju-font_title">Your Classes</h1>
				<div className="ju-groups"> {renderClasses()}</div>
			</div>
			<div className="ju-form-position">
				{addEditState === "add" ? <ClassNew /> : renderEdit()}
			</div>
		</div>
	);
};

export default Classes;
