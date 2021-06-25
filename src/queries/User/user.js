import { gql } from "@apollo/client";

export const LOG_IN = gql`
	mutation signIn($email: String!, $password: String!) {
		logIn(email: $email, password: $password) {
			token
		}
	}
`;

export const LOG_OUT = gql`
	mutation logOut {
		logOut {
			id
		}
	}
`;

export const SIGN_UP = gql`
	mutation signup($email: String, $password: String) {
		signup(email: $email, password: $password) {
			id
			email
		}
	}
`;

export const GET_ALL_USERS = gql`
	query allUsers {
		allUsers {
			id
			email
		}
	}
`;

export const PROFILE = gql`
	query profile {
		profile {
			name
			email
		}
		classes {
			id
			name
			date
			hour
			activity
		}
		students {
			id
			name
			email
		}
		groups {
			id
			name
			cost
		}
	}
`;
