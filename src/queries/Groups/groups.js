import { gql } from "@apollo/client";

export const GROUP_FRAGMENT = gql`
	fragment GroupFields on Group {
		id
		name
		cost
	}
`;

export const GET_ALL_GROUPS = gql`
	${GROUP_FRAGMENT}
	query getAllGroups {
		groups {
			...GroupFields
		}
	}
`;

export const GET_GROUP = gql`
	${GROUP_FRAGMENT}
	query getGroup($id: ID!) {
		group(id: $id) {
			...GroupFields
		}
	}
`;

export const GET_GROUP_DETAILS = gql`
	query getGroup($id: ID!) {
		group(id: $id) {
			id
			students {
				id
			}
		}
	}
`;

export const ADD_GROUP = gql`
	${GROUP_FRAGMENT}
	mutation createGroup($name: String!, $cost: Float!) {
		createGroup(name: $name, cost: $cost) {
			...GroupFields
		}
	}
`;

export const EDIT_GROUP = gql`
	${GROUP_FRAGMENT}
	mutation editGroup($id: ID!, $name: String!, $cost: Float!) {
		editGroup(id: $id, name: $name, cost: $cost) {
			...GroupFields
		}
	}
`;

export const DELETE_GROUP = gql`
	mutation deleteGroup($id: ID!) {
		deleteGroup(id: $id) {
			id
		}
	}
`;

export const ADD_STUDENTS_TO_GROUP = gql`
	mutation addStudentsToGroup($groupId: ID!, $students: [StudentInput]) {
		addStudentsToGroup(groupId: $groupId, students: $students) {
			id
			students {
				id
				name
			}
		}
	}
`;

export const DELETE_STUDENT_FROM_GROUP = gql`
	mutation deleteStudentFromGroup($groupId: ID!, $studentId: ID!) {
		deleteStudentFromGroup(groupId: $groupId, studentId: $studentId) {
			id
			students {
				id
			}
		}
	}
`;
