import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

// import fetchGroups from "../queries/fetchGroups";
import NewGroup from "./NewGroup";

const fetchGroups = gql`
	query getGroups {
		allGroups {
			id
			name
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
		console.log("about to delete the group");
		deleteGroup({ variables: { id: parseInt(id) } });
	};

	const renderGroups = () => {
		return data.allGroups.map(({ id, cost, name }) => {
			return (
				<div
					key={id}
					className="two wide column border"
					onClick={() => deleteAGroup(id)}
				>
					<div className="inline-name-check">
						{id} {cost} {name}
					</div>
				</div>
			);
		});
	};

	if (loading) return <p>Loading ...</p>;

	if (error) return <p> Error </p>;

	return (
		<div className="ju-central-panel">
			<h1 className="ju-font">Your Groups</h1>
			<div className="ui grid container"> {renderGroups()}</div>
			<div>
				<NewGroup />
			</div>
		</div>
	);
};

export default Groups;
