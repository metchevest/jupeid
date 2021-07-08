import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_CLASS } from "../../queries/Classes/classes";

import ListSecondaryItems from "../Generic/ListSecondaryItems";

import { useClassHook } from "../Hooks/useClassHook";
import { GET_CLASS_DETAILS } from "../../queries/Classes/classes";
import { GET_ALL_STUDENTS } from "../../queries/Students/students";

import { filterToPicker } from "../Helpers/helperFunctions";
import PaymentForMany from "../Generic/PaymentForMany";
import Picker from "../Generic/Picker";

const ClassShow = ({ match }) => {
	const id = match.params.id;

	const { loading, data } = useQuery(GET_CLASS, {
		variables: {
			id,
		},
		fetchPolicy: "cache-first",
	});

	const [addStudent, setAddStudent] = useState(false);

	const [, addStudentsToClass, , , deleteStudentFromClass] = useClassHook();

	const { loading: loadingDetails, data: classDetails } = useQuery(
		GET_CLASS_DETAILS,
		{
			variables: {
				id,
			},
			fetchPolicy: "network-only",
		}
	);

	const { data: dataStudents } = useQuery(GET_ALL_STUDENTS);

	if (loading) {
		return <p> Loading... </p>;
	}

	const onDeleteStudentFromClass = (itemId) => {
		deleteStudentFromClass({
			variables: {
				classId: id,
				studentId: itemId,
			},
		});
	};

	const renderstudents = () => {
		if (!loadingDetails) {
			return (
				<div>
					<h2>Lista de estudiantes en la clase</h2>
					<ListSecondaryItems
						items={classDetails.class.students}
						onDelete={onDeleteStudentFromClass}
					/>
					;
				</div>
			);
		}
	};

	const saveStudentsSelected = (selectedStudents) => {
		let studentsId = selectedStudents.map((student) => {
			return { id: student.id };
		});

		addStudentsToClass({
			variables: {
				classId: id,
				students: studentsId,
			},
		});

		setAddStudent(false);
	};

	const renderPaymentForMany = () => {
		if (!loadingDetails) {
			return (
				<PaymentForMany
					items={classDetails.class.students}
					title="Set Payment for the class"
				/>
			);
		}
	};

	const renderAddStudentsToClass = () => {
		if (!loadingDetails && addStudent) {
			return (
				<Picker
					items={filterToPicker(
						dataStudents.students,
						classDetails.class.students
					)}
					title="Select the students to add"
					onSave={(selectedStudents) => {
						saveStudentsSelected(selectedStudents);
					}}
					onDismiss={() => setAddStudent(false)}
				/>
			);
		}
	};
	return (
		<div>
			<h2> This is Class Show.</h2>
			<p> El nombre es : {data.class.name}</p>
			<p> El id es: {data.class.id}</p>
			<p> El date es: {data.class.date}</p>
			<p> La activity es: {data.class.activity}</p>
			{renderstudents()}
			<p> The end.</p>
			<button onClick={() => setAddStudent(true)}>
				Add Student to the class
			</button>
			{renderPaymentForMany()}

			{renderAddStudentsToClass()}
		</div>
	);
};

export default ClassShow;
