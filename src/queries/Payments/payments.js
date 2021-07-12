import { gql } from "@apollo/client";

export const PAYMENT_FRAGMENT = gql`
	fragment PaymentFields on Payment {
		id
		month
		year
		paymentDate
		student {
			id
			name
		}
	}
`;
export const GET_ALL_PAYMENTS = gql`
	${PAYMENT_FRAGMENT}
	query getPayments {
		payments {
			...PaymentFields
		}
	}
`;
export const CREATE_PAYMENT = gql`
	${PAYMENT_FRAGMENT}
	mutation createPayment($studentId: ID!, $month: Int, $year: Int) {
		createPayment(studentId: $studentId, month: $month, year: $year) {
			...PaymentFields
			student {
				id
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
