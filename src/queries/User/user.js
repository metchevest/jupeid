import { gql } from "@apollo/client";

import { STUDENT_FRAGMENT } from "../Students/students";
import { PAYMENT_FRAGMENT } from "../Payments/payments";
import { CLASS_FRAGMENT } from "../Classes/classes";
import { GROUP_FRAGMENT } from "../Groups/groups";

export const LOG_IN = gql`
	mutation signIn($email: String!, $password: String!) {
		logIn(email: $email, password: $password) {
			token
			tour
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
	${CLASS_FRAGMENT}
	${PAYMENT_FRAGMENT}
	${STUDENT_FRAGMENT}
	${GROUP_FRAGMENT}
	query profile {
		profile {
			name
			email
			tour
		}
		students {
			...StudentFields
		}
		groups {
			...GroupFields
		}
		payments {
			...PaymentFields
		}
		classes {
			...ClassFields
		}
	}
`;
