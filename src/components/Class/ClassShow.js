import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

import { CLASS_STUDENTS } from "../../queries/Classes/classes";

import { GET_ALL_STUDENTS } from "../../queries/Students/students";

import ListSecondaryItems from "../Helpers/ListSecondaryItems";

import Picker from "../Helpers/Picker";
import { filterToPicker } from "../Helpers/helperFunctions";
import { useClassHook } from "../Hooks/useClassHook";

const ClassShow = ({ match }) => {
	const id = match.params.id;

	const { loading, data } = useQuery(CLASS_STUDENTS, {
		variables: {
			id,
		},
		fetchPolicy: "cache-first",
	});

	const { data: dataStudents } = useQuery(GET_ALL_STUDENTS);
	const [addStudent, setAddStudent] = useState(false);

	const [, updateClassStudents] = useClassHook();

	if (loading) {
		return <p> Loading... </p>;
	}

	const renderstudents = () => {
		return (
			<div>
				<h2>Lista de estudiantes en la clase</h2>
				<ListSecondaryItems items={data.getClass.students} />;
			</div>
		);
	};

	const saveStudentsSelected = (selectedStudents) => {
		let studentsId = selectedStudents.map((aStudent) => {
			return aStudent.id;
		});

		updateClassStudents({
			variables: {
				classId: id,
				students: studentsId,
			},
		});
	};

	return (
		<div>
			<h2> This is Class Show.</h2>
			<p> El nombre es : {data.getClass.name}</p>
			<p> El id es: {data.getClass.name}</p>
			<p> El date es: {data.getClass.date}</p>
			<p> La activity es: {data.getClass.activity}</p>
			{renderstudents()}
			<p> The end.</p>
			<button onClick={() => setAddStudent(true)}>
				{" "}
				Add Student to the class
			</button>

			{addStudent ? (
				<Picker
					items={filterToPicker(dataStudents.students, data.getClass.students)}
					title="Select the students to add"
					onSave={(selectedStudents) => {
						console.log(selectedStudents);
						saveStudentsSelected(selectedStudents);
					}}
					onDismiss={() => setAddStudent(false)}
				/>
			) : null}
		</div>
	);
};

export default ClassShow;
