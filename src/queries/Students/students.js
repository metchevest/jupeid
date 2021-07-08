import { gql } from "@apollo/client";

export const STUDENT_FRAGMENT = gql`
	fragment StudentFields on Student {
		id
		name
		email
	}
`;

export const GET_ALL_STUDENTS = gql`
	${STUDENT_FRAGMENT}
	query getStudents {
		students {
			...StudentFields
		}
	}
`;

export const GET_STUDENT = gql`
	${STUDENT_FRAGMENT}
	query getStudent($id: ID) {
		student(id: $id) {
			...StudentFields
		}
	}
`;

export const GET_STUDENT_DETAILS = gql`
	query getStudent($id: ID) {
		student(id: $id) {
			id
			groups {
				id
			}
			payments {
				id
			}
			classes {
				id
			}
		}
	}
`;

export const ADD_STUDENT = gql`
	${STUDENT_FRAGMENT}
	mutation createStudent($name: String!, $email: String!) {
		createStudent(name: $name, email: $email) {
			...StudentFields
		}
	}
`;

export const EDIT_STUDENT = gql`
	${STUDENT_FRAGMENT}
	mutation editStudent($id: ID!, $name: String!, $email: String!) {
		editStudent(id: $id, name: $name, email: $email) {
			...StudentFields
		}
	}
`;

export const DELETE_STUDENT = gql`
	mutation delelteStudent($id: ID!) {
		deleteStudent(id: $id) {
			id
		}
	}
`;

export const UPDATE_STUDENT_GROUPS = gql`
	mutation addStudentGroups($studentId: ID!, $groups: [GroupInput]) {
		addStudentGroups(studentId: $studentId, groups: $groups) {
			id
			groups {
				id
				name
			}
		}
	}
`;

export const UPDATE_STUDENT_CLASSES = gql`
	mutation addStudentClasses($studentId: ID!, $classes: [ClassInput]) {
		addStudentClasses(studentId: $studentId, classes: $classes) {
			id
			classes {
				id
				name
			}
		}
	}
`;

export const DELETE_GROUP_FROM_STUDENT = gql`
	mutation deleteGroupFromStudent($studentId: ID!, $groupId: ID!) {
		deleteGroupFromStudent(studentId: $studentId, groupId: $groupId) {
			id
			groups {
				id
			}
		}
	}
`;

export const DELETE_CLASS_FROM_STUDENT = gql`
	mutation deleteClassFromStudent($studentId: ID!, $classId: ID!) {
		deleteClassFromStudent(studentId: $studentId, classId: $classId) {
			id
			classes {
				id
			}
		}
	}
`;
