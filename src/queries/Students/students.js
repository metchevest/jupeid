import { gql } from "@apollo/client";

export const GET_ALL_STUDENTS = gql`
	query getStudents {
		students {
			id
			name
			email
		}
	}
`;

export const ADD_STUDENT = gql`
	mutation createStudent($name: String!, $email: String!) {
		createStudent(name: $name, email: $email) {
			id
			name
			email
		}
	}
`;

export const EDIT_STUDENT = gql`
	mutation editStudent($id: ID!, $name: String!, $email: String!) {
		editStudent(id: $id, name: $name, email: $email) {
			id
			name
			email
		}
	}
`;

export const DELETE_STUDENT = gql`
	mutation delelteStudent($id: ID!) {
		deleteStudent(id: $id) {
			id
			name
		}
	}
`;

export const GET_STUDENT = gql`
	query getStudent($id: ID!) {
		getStudent(id: $id) {
			id
			email
			name
			groups {
				id
				name
				cost
			}
			payments {
				id
				amount
				month
			}
			classes {
				id
				name
			}
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

export const DELETE_STUDENT_GROUP = gql`
	mutation deleteStudentGroup($studentId: ID!, $groupId: ID!) {
		deleteStudentGroup(studentId: $studentId, groupId: $groupId) {
			id
			groups {
				id
			}
		}
	}
`;

export const DELETE_STUDENT_CLASS = gql`
	mutation deleteStudentClass($studentId: ID!, $classId: ID!) {
		deleteStudentClass(studentId: $studentId, classId: $classId) {
			id
			classes {
				id
			}
		}
	}
`;
