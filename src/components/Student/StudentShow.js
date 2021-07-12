import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import DatePicker from "react-date-picker";

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

import Modal from "../Generic/Modal";

const StudentShow = ({ match }) => {
	const id = match.params.id;

	const [addGroup, setAddGroup] = useState(false);
	const [addClass, setAddClass] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [paymentDate, onChangePaymentDate] = useState(new Date());

	const { data: dataGroups, loading: loadingAllGroups } =
		useQuery(GET_ALL_GROUPS);

	const { data: dataClasses, loading: loadingAllClasses } =
		useQuery(GET_ALL_CLASSES);

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
		setConfirm(false);
	};

	const renderDetails = () => {
		if (!loadingDetails && !loadingAllGroups && !loadingAllClasses) {
			const studentGroups = dataGroups.groups.filter((aGroup) =>
				dataDetails.student.groups.some((g) => g.id === aGroup.id)
			);

			const studentClasses = dataClasses.classes.filter((aClass) =>
				dataDetails.student.classes.some((c) => c.id === aClass.id)
			);

			console.log("Data detauils vale", dataDetails);
			return (
				<div>
					<h2> Student's Groups: </h2>
					{dataDetails.student.groups.length > 0 ? (
						<ListSecondaryItems
							items={studentGroups}
							onDelete={deleteGroupFrom}
							path="/group"
						/>
					) : (
						<div> The student doesn't have any Group. </div>
					)}

					<h2> Student's Classes </h2>

					{dataDetails.student.classes.length > 0 ? (
						<ListSecondaryItems
							items={studentClasses}
							onDelete={deleteClassFrom}
							path="/class"
						/>
					) : (
						<div> The student doesn't have any Class. </div>
					)}

					<h2> Student's Payments </h2>
					{dataDetails.student.payments.length > 0 ? (
						<ListSecondaryItems items={dataDetails.student.payments} />
					) : (
						<div> The student doesn't have any Payment. </div>
					)}
				</div>
			);
		}
	};

	const renderAddToGroup = () => {
		if (!loadingDetails) {
			return (
				<div>
					{addGroup ? (
						<Picker
							items={filterToPicker(
								dataGroups.groups,
								dataDetails.student.groups
							)}
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
				</div>
			);
		}
	};

	const renderAddToClass = () => {
		if (!loadingDetails) {
			return (
				<div>
					{addClass ? (
						<Picker
							items={filterToPicker(
								dataClasses.classes,
								dataDetails.student.classes
							)}
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
				</div>
			);
		}
	};

	const renderActionsConfirm = () => {
		return (
			<div>
				<button onClick={savePayment} className="ui primary button">
					Confirm
				</button>
				<button onClick={() => setConfirm(false)} className="ui primary button">
					Cancel
				</button>
			</div>
		);
	};

	const renderContentConfirm = () => {
		var options = { month: "long" };

		console.log("el typo de la fecha es", typeof paymentDate);
		console.log(paymentDate.getMonth());
		console.log(new Intl.DateTimeFormat("en-US", options).format(paymentDate));
		const month = new Intl.DateTimeFormat("en-US", options).format(paymentDate);
		return (
			<div>
				{`Are you sure you want to set the payment ? for the month : ${month} `}
			</div>
		);
	};

	console.log(confirm);
	return (
		<div>
			<p>This is student Show</p>
			<p>Email: {data.student.email}</p>
			<p>id: {data.student.id}</p>
			<p>name: {data.student.name}</p>

			{confirm ? (
				<Modal
					actions={renderActionsConfirm()}
					onDismiss={() => setConfirm(false)}
					content={renderContentConfirm()}
					title="Confirm payment"
				/>
			) : null}
			<button
				onClick={() => {
					console.log("voy a setear true");
					setConfirm(true);
				}}
			>
				{" "}
				Register Payment
			</button>
			<div>
				<DatePicker
					onChange={onChangePaymentDate}
					value={paymentDate}
					format="dd-MM-y"
				/>
			</div>

			<button onClick={() => setAddGroup(true)}> Add to a Group</button>
			{renderAddToGroup()}
			<button onClick={() => setAddClass(true)}> Add to a Class </button>
			{renderAddToClass()}
			{renderDetails()}
		</div>
	);
};

export default StudentShow;
