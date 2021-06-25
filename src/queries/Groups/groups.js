import { gql } from "@apollo/client";

export const GET_ALL_GROUPS = gql`
	query getAllGroups {
		groups {
			id
			name
			cost
		}
	}
`;

export const ADD_GROUP = gql`
	mutation createGroup($name: String!, $cost: Float!) {
		createGroup(name: $name, cost: $cost) {
			id
			name
			cost
		}
	}
`;

export const EDIT_GROUP = gql`
	mutation editGroup($id: ID!, $name: String!, $cost: Float!) {
		editGroup(id: $id, name: $name, cost: $cost) {
			id
			name
			cost
		}
	}
`;

export const DELETE_GROUP = gql`
	mutation deleteGroup($id: ID!) {
		deleteGroup(id: $id) {
			id
			name
		}
	}
`;

export const GET_GROUP = gql`
	query getGroup($id: ID!) {
		getGroup(id: $id) {
			id
			name
			cost
			students {
				id
			}
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
