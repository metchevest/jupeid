import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ALL_GROUPS } from "../../queries/Groups/groups";
import { GET_ALL_CLASSES } from "../../queries/Classes/classes";
import { GET_STUDENT } from "../../queries/Students/students";

import Picker from "../Helpers/Picker";
import ListSecondaryItems from "../Helpers/ListSecondaryItems";
import { useStudentHook } from "../Hooks/useStudentHook";
import { filterToPicker } from "../Helpers/helperFunctions";
import { usePaymentHook } from "../Hooks/usePaymentHook";

const StudentShow = ({ match }) => {
	const studentId = match.params.id;

	const [addGroup, setAddGroup] = useState(false);
	const [addClass, setAddClass] = useState(false);

	//Mejorar, ver si esta data no la puedo traer directo de la cache
	//a partir de las consutlas que ya tengo hechas
	const { data: dataGroups } = useQuery(GET_ALL_GROUPS);

	const { data: dataClasses } = useQuery(GET_ALL_CLASSES);

	const [
		,
		updateStudentGroups,
		updateStudentClasses,
		deleteStudentClass,
		deleteStudentGroup,
	] = useStudentHook();

	const [createPayment] = usePaymentHook();

	const { loading, data } = useQuery(GET_STUDENT, {
		variables: {
			id: studentId,
		},
		fetchPolicy: "cache-first",
	});

	if (loading) {
		return <p> Loading...</p>;
	}

	const saveGroupsSelected = (selectedGroups) => {
		const idGroups = selectedGroups.map((group) => {
			return { id: parseInt(group.id) };
		});

		updateStudentGroups({
			variables: {
				studentId,
				groups: idGroups,
			},
		});
	};

	const saveClassSelected = (selectedClasses) => {
		const idClasses = selectedClasses.map((aClass) => {
			return { id: aClass.id };
		});

		updateStudentClasses({
			variables: {
				studentId,
				classes: idClasses,
			},
		});
	};

	const deleteGroupFromStudent = (groupId) => {
		deleteStudentGroup({
			variables: {
				studentId,
				groupId,
			},
		});
	};

	const deleteFromClass = (classId) => {
		deleteStudentClass({
			variables: {
				studentId,
				classId,
			},
		});
	};

	const setPayment = () => {
		createPayment({
			variables: {
				studentId,
				month: 1,
			},
		});
	};

	return (
		<div>
			<p>This is student Show</p>
			<p>Email: {data.getStudent.email}</p>
			<p>id: {data.getStudent.id}</p>
			<p>name: {data.getStudent.name}</p>

			<button onClick={() => setPayment()}> Register Payment</button>
			<button onClick={() => setAddGroup(true)}> Add to a Group Picker</button>
			{addGroup ? (
				<Picker
					items={filterToPicker(dataGroups.groups, data.getStudent.groups)}
					title="Select the groups:"
					onSave={(selectedGroups) => {
						console.log("onSave ", selectedGroups);
						saveGroupsSelected(selectedGroups);
						setAddGroup(false);
					}}
					onDismiss={() => {
						setAddGroup(false);
					}}
				/>
			) : null}

			<button onClick={() => setAddClass(true)}> Add to a Class </button>
			{addClass ? (
				<Picker
					items={filterToPicker(dataClasses.classes, data.getStudent.classes)}
					title="Select the classes to add:"
					onSave={(selectedClasses) => {
						console.log("onSave ", selectedClasses);
						saveClassSelected(selectedClasses);
						setAddClass(false);
					}}
					onDismiss={() => {
						setAddClass(false);
					}}
				/>
			) : null}

			<h2> Student's Groups: </h2>

			<ListSecondaryItems
				items={data.getStudent.groups}
				onDelete={deleteGroupFromStudent}
			/>
			<h2> Student's Classes </h2>

			<ListSecondaryItems
				items={data.getStudent.classes}
				onDelete={deleteFromClass}
			/>
		</div>
	);
};

export default StudentShow;
