import { gql } from "@apollo/client";

export const CLASS_FRAGMENT = gql`
	fragment ClassFields on Class {
		id
		date
		hour
		name
		activity
	}
`;

export const GET_CLASS = gql`
	${CLASS_FRAGMENT}
	query getClass($id: ID!) {
		class(id: $id) {
			...ClassFields
		}
	}
`;

export const GET_CLASS_DETAILS = gql`
	query getClassDetails($id: ID!) {
		class(id: $id) {
			id
			students {
				id
				name
			}
		}
	}
`;

export const GET_ALL_CLASSES = gql`
	${CLASS_FRAGMENT}
	query getClasses {
		classes {
			...ClassFields
		}
	}
`;

export const ADD_CLASS = gql`
	${CLASS_FRAGMENT}
	mutation createClass(
		$date: String!
		$hour: Float!
		$name: String!
		$activity: String!
	) {
		createClass(date: $date, hour: $hour, name: $name, activity: $activity) {
			...ClassFields
		}
	}
`;

export const EDIT_CLASS = gql`
	${CLASS_FRAGMENT}
	mutation editClass(
		$id: ID!
		$name: String!
		$date: String!
		$hour: Float!
		$activity: String!
	) {
		editClass(
			id: $id
			name: $name
			date: $date
			hour: $hour
			activity: $activity
		) {
			...ClassFields
		}
	}
`;

export const DELETE_CLASS = gql`
	mutation deleteClass($id: ID!) {
		deleteClass(id: $id) {
			id
		}
	}
`;

export const ADD_STUDENTS_TO_CLASS = gql`
	mutation updateClassStudents($classId: ID!, $students: [StudentInput]) {
		addStudentsToClass(classId: $classId, students: $students) {
			id
			students {
				id
			}
		}
	}
`;

export const DELETE_STUDENT_FROM_CLASS = gql`
	mutation deleteStudentFromClass($studentId: ID!, $classId: ID!) {
		deleteStudentFromClass(studentId: $studentId, classId: $classId) {
			id
			students {
				id
			}
		}
	}
`;
