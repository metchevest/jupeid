import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Picker from "../Helpers/Picker";
import ListSecondaryItems from "../Helpers/ListSecondaryItems";
import { filterToPicker } from "../Helpers/helperFunctions";
import { GET_ALL_STUDENTS } from "../../queries/Students/students";
import { GET_GROUP } from "../../queries/Groups/groups";
import { useGroupHook } from "../Hooks/useGroupHook";

const GroupShow = ({ match }) => {
	const groupId = match.params.id;

	const { data, loading, error } = useQuery(GET_GROUP, {
		variables: {
			id: groupId,
		},
		fetchPolicy: "cache-first",
	});

	const { data: dataAllStudents } = useQuery(GET_ALL_STUDENTS);

	const [addStudents, setAddStudents] = useState(false);

	const [
		,
		deleteGroup,
		updateGroup,
		addStudentsToGroup,
		deleteStudentFromGroup,
	] = useGroupHook();

	if (loading) {
		return "Loading...";
	}

	if (error) {
		return "Error..";
	}

	const renderAffiliates = () => {
		return data.getGroup.students.map((student) => {
			return <div key={student.id}> Student id : {student.id}</div>;
		});
	};

	const toggleSelect = () => {
		setAddStudents(!addStudents);
	};

	const deleteStudentGroup = (studentId) => {
		console.log("groupId", groupId);
		console.log("studentId", studentId);
		deleteStudentFromGroup({
			variables: {
				groupId,
				studentId,
			},
		});
	};

	const saveStudentsSelected = (selectedStudents) => {
		const idStudents = selectedStudents.map((student) => {
			return { id: student.id };
		});

		addStudentsToGroup({
			variables: {
				groupId,
				students: idStudents,
			},
		});
	};

	return (
		<div>
			<p> This is GroupShow </p>
			<p> Name: {data.getGroup.name} </p>
			<p>Cost: {data.getGroup.cost} </p>
			<div>{renderAffiliates()}</div>
			<button onClick={() => deleteGroup(groupId)}> Delete Group</button>
			<button
				onClick={() => {
					toggleSelect();
				}}
			>
				Add Student
			</button>
			<div>
				{addStudents ? (
					<Picker
						items={filterToPicker(
							dataAllStudents.students,
							data.getGroup.students
						)}
						title="Select the students to add:"
						onSave={(selectedStudents) => {
							saveStudentsSelected(selectedStudents);
							toggleSelect();
						}}
						onDismiss={() => {
							toggleSelect();
						}}
					/>
				) : null}
			</div>
			<div>
				<h2> Group's Students</h2>
				<ListSecondaryItems
					items={data.getGroup.students}
					onDelete={deleteStudentGroup}
				/>
			</div>
		</div>
	);
};

export default GroupShow;
