import { gql } from "@apollo/client";

export const PAYMENT_FRAGMENT = gql`
	fragment PaymentFields on Payment {
		id
		month
		year
		paymentDate
	}
`;
export const GET_ALL_PAYMENTS = gql`
	${PAYMENT_FRAGMENT}
	query getPayments {
		payments {
			...PaymentFields
			student {
				id
			}
		}
	}
`;
export const ADD_PAYMENT = gql`
	${PAYMENT_FRAGMENT}
	mutation createPayment($studentId: ID!, $month: Int) {
		createPayment(studentId: $studentId, month: $month) {
			id
			payments {
				...PaymentFields
			}
		}
	}
`;

export const MANY_PAYMENTS = gql`
	${PAYMENT_FRAGMENT}
	mutation createManyPayments($students: [StudentInput]) {
		createManyPayments(students: $students) {
			id
			payments {
				...PaymentFields
			}
		}
	}
`;
