import gql from "@apollo/client";

export default gql`
	query getGroups {
		allGroups {
			id
			cost
		}
	}
`;
