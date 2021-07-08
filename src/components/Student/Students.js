import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import StudentNew from "./StudentNew";
import StudentForm from "./StudentForm";

import { GET_ALL_STUDENTS } from "../../queries/Students/students";
import { useStudentHook } from "../Hooks/useStudentHook";

const Students = () => {
	const { loading, error, data } = useQuery(GET_ALL_STUDENTS, {
		fetchPolicy: "cache-first",
	});

	console.log("data en Students.js valee", data);
	const [addEditState, setAddEditState] = useState("add");
	const [edit, setEdit] = useState();

	const [, , , , , deleteStudent, updateStudent] = useStudentHook();

	const deleteAStudent = (id) => {
		deleteStudent({
			variables: { id: parseInt(id) },
		});
		//In case the deleted group is loaded on the form.
		setAddEditState("add");
	};

	const editStudent = (id, name, email) => {
		setEdit({ id, name, email });
		setAddEditState("edit");
	};

	const renderStudents = () => {
		return data.students.map(({ id, name, email }) => {
			return (
				<div key={id} className="ju-item-row">
					<Link to={`/student/${id}`}>
						<div className="inline-name-check">{name}</div>
					</Link>
					<div className="group_icon">
						<div onClick={() => editStudent(id, name, email)}>
							<i className="edit outline icon"></i>
						</div>
						<div onClick={() => deleteAStudent(id)}>
							<i className="trash alternate outline icon"> </i>
						</div>
					</div>
				</div>
			);
		});
	};

	const onSubmitEdit = ({ id, name, email }) => {
		setAddEditState("add");

		updateStudent({ variables: { id, name, email } });
	};

	const onCancelEdit = () => {
		setAddEditState("add");
	};

	const renderEdit = () => {
		return (
			<StudentForm
				titleText="Edit student"
				buttonText="Save student"
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
				<h1 className="ju-font_title">Your students</h1>
				<div className="ju-groups"> {renderStudents()}</div>
			</div>
			<div className="ju-form-position">
				{addEditState === "add" ? <StudentNew /> : renderEdit()}
			</div>
		</div>
	);
};

export default Students;
