import { gql } from "@apollo/client";

export const GET_ALL_PAYMENTS = gql`
	query getPayments {
		getPayments {
			id
			month
			students {
				id
			}
		}
	}
`;
export const ADD_PAYMENT = gql`
	mutation createPayment($studentId: ID!, $month: Integer) {
		createPayment(studentId: $studentId, month: $month) {
			id
			month
		}
	}
`;
