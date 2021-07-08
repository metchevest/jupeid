import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Tour from "reactour";

import ClassNew from "./ClassNew";
import ClassForm from "./ClassForm";

import { GET_ALL_CLASSES } from "../../queries/Classes/classes";
import { useClassHook } from "../Hooks/useClassHook";

import { classSteps } from "../Tour/steps";

const Classes = () => {
	const { loading, error, data } = useQuery(GET_ALL_CLASSES, {
		fetchPolicy: "cache-first",
	});

	const [isTourOpen, setIsTourOpen] = useState(true);

	const [, , deleteClass, updateClass] = useClassHook();

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
				<div className="ju-item-row" key={id}>
					<Link to={`/class/${id}`}>
						<div className="inline-name-check">{name}</div>
					</Link>
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
				<h1 className="ju-font_title first-step-class">Your Classes</h1>
				<div className="ju-groups"> {renderClasses()}</div>
			</div>
			<div className="ju-form-position">
				{addEditState === "add" ? <ClassNew /> : renderEdit()}
			</div>
			<Tour
				steps={classSteps}
				isOpen={isTourOpen}
				onRequestClose={() => setIsTourOpen(false)}
			/>
		</div>
	);
};

export default Classes;
