import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ALL_GROUPS } from "../../queries/Groups/groups";
import { GET_ALL_CLASSES } from "../../queries/Classes/classes";
import {
	GET_STUDENT,
	GET_STUDENT_DETAILS,
} from "../../queries/Students/students";

import Picker from "../Generic/Picker";
import ListSecondaryItems from "../Generic/ListSecondaryItems";
import { useStudentHook } from "../Hooks/useStudentHook";
import { filterToPicker } from "../Helpers/helperFunctions";
import { usePaymentHook } from "../Hooks/usePaymentHook";
import PaymentPicker from "./PaymentPicker";

const StudentShow = ({ match }) => {
	const id = match.params.id;

	const [addGroup, setAddGroup] = useState(false);
	const [addClass, setAddClass] = useState(false);

	const { data: dataGroups } = useQuery(GET_ALL_GROUPS);

	const { data: dataClasses } = useQuery(GET_ALL_CLASSES);

	const [
		,
		updateStudentGroups,
		updateStudentClasses,
		deleteClassFromStudent,
		deleteGroupFromStudent,
	] = useStudentHook();

	const [createPayment] = usePaymentHook();

	const { loading, data } = useQuery(GET_STUDENT, {
		variables: {
			id,
		},
		fetchPolicy: "cache-first",
	});

	const { loading: loadingDetails, data: dataDetails } = useQuery(
		GET_STUDENT_DETAILS,
		{
			variables: {
				id,
			},
		}
	);

	if (loading) {
		return <p> Loading...</p>;
	}

	const saveGroupsSelected = (selectedGroups) => {
		const idGroups = selectedGroups.map((group) => {
			return { id: parseInt(group.id) };
		});

		updateStudentGroups({
			variables: {
				studentId: id,
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
				studentId: id,
				classes: idClasses,
			},
		});
	};

	const deleteGroupFrom = (groupId) => {
		deleteGroupFromStudent({
			variables: {
				studentId: id,
				groupId,
			},
		});
	};

	const deleteClassFrom = (classId) => {
		deleteClassFromStudent({
			variables: {
				studentId: id,
				classId,
			},
		});
	};

	const savePayment = (value) => {
		createPayment({
			variables: {
				studentId: id,
				month: 1,
				year: 2021,
			},
		});
		console.log("en save payment", value);
	};

	const renderDetails = () => {
		if (!loadingDetails) {
			return (
				<div>
					<h2> Student's Groups: </h2>
					<ListSecondaryItems
						items={dataDetails.student.groups}
						onDelete={deleteGroupFrom}
					/>
					<h2> Student's Classes </h2>

					<ListSecondaryItems
						items={dataDetails.student.classes}
						onDelete={deleteClassFrom}
					/>

					<h2> Student's Payments </h2>

					<ListSecondaryItems items={dataDetails.student.payments} />
				</div>
			);
		}
	};

	return (
		<div>
			<p>This is student Show</p>
			<p>Email: {data.student.email}</p>
			<p>id: {data.student.id}</p>
			<p>name: {data.student.name}</p>

			<PaymentPicker savePayment={savePayment} />
			<button onClick={() => setAddGroup(true)}> Add to a Group Picker</button>
			{addGroup ? (
				<Picker
					items={filterToPicker(dataGroups.groups, data.student.groups)}
					title="Select the groups:"
					onSave={(selectedGroups) => {
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
					items={filterToPicker(dataClasses.classes, data.student.classes)}
					title="Select the classes to add:"
					onSave={(selectedClasses) => {
						saveClassSelected(selectedClasses);
						setAddClass(false);
					}}
					onDismiss={() => {
						setAddClass(false);
					}}
				/>
			) : null}
			{renderDetails()}
		</div>
	);
};

export default StudentShow;
