import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import Picker from "../Generic/Picker";
import ListSecondaryItems from "../Generic/ListSecondaryItems";
import { filterToPicker } from "../Helpers/helperFunctions";
import { GET_ALL_STUDENTS } from "../../queries/Students/students";
import { GET_GROUP, GET_GROUP_DETAILS } from "../../queries/Groups/groups";
import { useGroupHook } from "../Hooks/useGroupHook";
import PaymentForMany from "../Generic/PaymentForMany";

const GroupShow = ({ match }) => {
	const id = match.params.id;

	const { data, loading, error } = useQuery(GET_GROUP, {
		variables: {
			id,
		},
		fetchPolicy: "cache-first",
	});

	const { data: dataDetails, loading: loadingDetails } = useQuery(
		GET_GROUP_DETAILS,
		{
			variables: {
				id,
			},
		}
	);

	const { data: dataAllStudents, loading: loadingAllStudents } =
		useQuery(GET_ALL_STUDENTS);

	const [addStudents, setAddStudents] = useState(false);

	const [, , updateGroup, addStudentsToGroup, deleteStudentFromGroup] =
		useGroupHook();

	if (loading) {
		return "Loading...";
	}

	if (error) {
		return "Error..";
	}

	const renderStudents = () => {
		if (!loadingDetails) {
			return dataDetails.group.students.map((student) => {
				return <div key={student.id}> Student id : {student.id}</div>;
			});
		}
	};

	const toggleSelect = () => {
		setAddStudents(!addStudents);
	};

	const deleteStudentGroup = (studentId) => {
		deleteStudentFromGroup({
			variables: {
				groupId: id,
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
				groupId: id,
				students: idStudents,
			},
		});
	};

	const renderAddStudents = () => {
		if (addStudents) {
			return (
				<div>
					<Picker
						items={filterToPicker(
							dataAllStudents.students,
							dataDetails.group.students
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
					;
				</div>
			);
		}
	};

	const renderGroupDetails = () => {
		if (!loadingDetails && !loadingAllStudents) {
			const groupStudents = dataAllStudents.students.filter((aStudent) =>
				dataDetails.group.students.some((s) => s.id == aStudent.id)
			);

			return (
				<div>
					<PaymentForMany
						items={dataDetails.group.students}
						title="Set Payment for the group"
					/>
					<div>
						<h2> Group's Students</h2>
						<ListSecondaryItems
							items={groupStudents}
							onDelete={deleteStudentGroup}
							path="/student"
						/>
					</div>
					{renderAddStudents()}
				</div>
			);
		}
	};

	return (
		<div>
			<p> This is GroupShow </p>
			<p> Name: {data.group.name} </p>
			<p>Cost: {data.group.cost} </p>
			<div>{renderStudents()}</div>
			<Link to={`/group/delete/${data.group.id}`}>Delete Group</Link>
			<button
				onClick={() => {
					toggleSelect();
				}}
			>
				Add Student
			</button>

			{renderGroupDetails()}
		</div>
	);
};

export default GroupShow;
