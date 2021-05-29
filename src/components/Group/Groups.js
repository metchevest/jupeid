import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import GroupNew from "./GroupNew";
import GroupForm from "./GroupForm";

import { GET_ALL_GROUPS } from "../../queries/Groups/groups";
import { DELETE_GROUP } from "../../queries/Groups/groups";
import { EDIT_GROUP } from "../../queries/Groups/groups";

const Groups = () => {
	const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
		fetchPolicy: "cache-first",
	});

	const [deleteGroup] = useMutation(DELETE_GROUP, {
		update(cache, { data: { deleteGroup: groupDeleted } }) {
			const existingGroups = cache.readQuery({
				query: GET_ALL_GROUPS,
			});

			cache.writeQuery({
				query: GET_ALL_GROUPS,
				data: {
					groups: existingGroups?.groups.filter(
						(group) => group.id !== groupDeleted.id
					),
				},
			});

			const idNormalized = cache.identify({
				id: groupDeleted.id,
				__typename: "Group",
			});

			cache.evict({ id: idNormalized });
			cache.gc();
		},
	});

	const [updateGroup] = useMutation(EDIT_GROUP);
	const [addEditState, setaddEditState] = useState("add");
	const [edit, setEdit] = useState();

	const deleteAGroup = (id) => {
		deleteGroup({ variables: { id: parseInt(id) } });

		//In case the deleted group is loaded on the form.
		setaddEditState("add");
	};

	const editGroup = (id, cost, name) => {
		setEdit({ id, cost, name });
		setaddEditState("edit");
	};

	const renderGroups = () => {
		return data.groups.map(({ id, cost, name }) => {
			return (
				<div key={id} className="ju-item-row">
					<div className="inline-name-check">
						{name} {id}
					</div>
					<div>
						<i className="dollar sign icon"></i> {cost}
					</div>
					<div className="group_icon">
						<div onClick={() => editGroup(id, cost, name)}>
							<i className="edit outline icon"></i>
						</div>
						<div onClick={() => deleteAGroup(id)}>
							<i className="trash alternate outline icon"> </i>
						</div>
					</div>
				</div>
			);
		});
	};

	const onSubmitEdit = ({ id, name, cost }) => {
		setaddEditState("add");
		updateGroup({ variables: { id, name, cost: parseFloat(cost) } });
	};

	const onCancelEdit = () => {
		setaddEditState("add");
	};

	const renderEdit = () => {
		return (
			<GroupForm
				titleText="Edit Group"
				buttonText="Save Group"
				values={edit}
				onCancel={() => onCancelEdit()}
				onSubmit={(e) => {
					onSubmitEdit(e);
				}}
			/>
		);
	};

	if (loading) return <p>Loading ...</p>;

	if (error) return <p> Error </p>;

	return (
		<div className="ju-central-panel">
			<div>
				<h1 className="ju-font_title">Your Groups</h1>
				<div className="ju-groups"> {renderGroups()}</div>
			</div>
			<div className="ju-form-position">
				{addEditState === "add" ? <GroupNew /> : renderEdit()}
			</div>
		</div>
	);
};

export default Groups;
