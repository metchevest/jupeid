import { useMutation } from "@apollo/client";

import {
	GET_ALL_STUDENTS,
	ADD_STUDENT,
	EDIT_STUDENT,
	UPDATE_STUDENT_GROUPS,
	UPDATE_STUDENT_CLASSES,
	DELETE_GROUP_FROM_STUDENT,
	DELETE_CLASS_FROM_STUDENT,
	DELETE_STUDENT,
} from "../../queries/Students/students";

export const useStudentHook = () => {
	const [create] = useMutation(ADD_STUDENT, {
		update(cache, { data }) {
			const newStudentFromResponse = data?.createStudent;
			const existingStudents = cache.readQuery({
				query: GET_ALL_STUDENTS,
			});

			if (existingStudents && newStudentFromResponse) {
				cache.writeQuery({
					query: GET_ALL_STUDENTS,
					data: {
						students: [...existingStudents.students, newStudentFromResponse],
					},
				});
			}
		},
	});

	const [deleteGroupFromStudent] = useMutation(DELETE_GROUP_FROM_STUDENT, {
		onCompleted: (date) => {
			console.log("En on complete de deleteGroup", date);
		},
	});

	const [deleteClassFromStudent] = useMutation(DELETE_CLASS_FROM_STUDENT, {
		onCompleted: (data) => {
			console.log("On delelete Class", data);
		},
	});

	const [updateStudentGroups] = useMutation(UPDATE_STUDENT_GROUPS, {
		onCompleted: (data) => {
			console.log("Oncomplente update Groups", data);
		},
	});

	const [updateStudentClasses] = useMutation(UPDATE_STUDENT_CLASSES);

	const [deletestudent] = useMutation(DELETE_STUDENT, {
		update(cache, { data: { deletestudent: studentDeleted } }) {
			const existingstudents = cache.readQuery({
				query: GET_ALL_STUDENTS,
			});

			cache.writeQuery({
				query: GET_ALL_STUDENTS,
				data: {
					students: existingstudents?.students.filter(
						(student) => student.id !== studentDeleted.id
					),
				},
			});

			const idNormalized = cache.identify({
				id: studentDeleted.id,
				__typename: "student",
			});

			cache.evict({ id: idNormalized });
			cache.gc();
		},
	});

	const [updateStudent] = useMutation(EDIT_STUDENT);

	return [
		create,
		updateStudentGroups,
		updateStudentClasses,
		deleteClassFromStudent,
		deleteGroupFromStudent,
		deletestudent,
		updateStudent,
	];
};
