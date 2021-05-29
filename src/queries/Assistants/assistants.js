import { gql } from "@apollo/client";

export const GET_ALL_ASSISTANTS = gql`
	query getAssistants {
		assistants {
			id
			name
			email
		}
	}
`;

export const ADD_ASSISTANT = gql`
	mutation createAssistant($name: String!, $email: String!) {
		createAssistant(name: $name, email: $email) {
			id
			name
			email
		}
	}
`;

export const EDIT_ASSISTANT = gql`
	mutation editAssistant($id: ID!, $name: String!, $email: String!) {
		editAssistant(id: $id, name: $name, email: $email) {
			id
			name
			email
		}
	}
`;

export const DELETE_ASSISTANT = gql`
	mutation delelteAssistant($id: ID!) {
		deleteAssistant(id: $id) {
			id
			name
		}
	}
`;
