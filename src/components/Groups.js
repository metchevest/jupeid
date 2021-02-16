import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

// import fetchGroups from "../queries/fetchGroups";
import NewGroup from "./NewGroup";

const fetchGroups = gql`
	query getGroups {
		allGroups {
			id
			cost
		}
	}
`;

const DELETE_GROUP = gql`
	mutation deleteGroup($id: ID!) {
		deleteGroup(id: $id) {
			id
		}
	}
`;

const Groups = (props) => {
	const { loading, error, data } = useQuery(fetchGroups);
	const [deleteGroup] = useMutation(DELETE_GROUP, {
		update(cache, { data: { deleteGroup } }) {
			cache.modify({
				fields: {
					allGroups(existingGroups = []) {
						// console.log(deletedGroup);
						const deletedGroup = cache.writeFragment({
							data: deleteGroup,
							fragment: gql`
								fragment DeleteGroup on allGroups {
									id
								}
							`,
						});
						return existingGroups.filter((item) => {
							let value = item !== deletedGroup;
							console.log(item);
							console.log(deleteGroup);
							console.log(`Group:${deleteGroup.id}`);
							console.log(value);
							return value;
						});
					},
				},
			});
		},
	});

	const deleteAGroup = (id) => {
		deleteGroup({ variables: { id: parseInt(id) } });
	};

	const renderGroups = () => {
		return data.allGroups.map(({ id, cost, name }) => (
			<div
				key={id}
				className="five wide column"
				onClick={() => deleteAGroup(id)}
			>
				{id} {cost} {name}
			</div>
		));
	};

	if (loading) return <p>Loading ...</p>;

	if (error) return <p> Error </p>;
	console.log("Aca imprimo data");
	console.log(data);
	return (
		<div className="main-content">
			<h1 className="custom-font">Your Groups</h1>
			<div className="ui grid"> {renderGroups()}</div>
			<div>
				<NewGroup />
			</div>
		</div>
	);
};

export default Groups;
