import { gql } from "@apollo/client";

export const GET_ALL_CLASSES = gql`
	query getClasses {
		classes {
			id
			name
			date
			hour
			activity
		}
	}
`;

export const ADD_CLASS = gql`
	mutation createClass(
		$date: String!
		$hour: Float!
		$name: String!
		$activity: String!
	) {
		createClass(date: $date, hour: $hour, name: $name, activity: $activity) {
			id
			name
			hour
			date
		}
	}
`;

export const EDIT_CLASS = gql`
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
			id
			name
			date
			hour
			activity
		}
	}
`;

export const DELETE_CLASS = gql`
	mutation deleteClass($id: ID!) {
		deleteClass(id: $id) {
			id
			name
		}
	}
`;
