import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import GroupNew from "./GroupNew";
import GroupForm from "./GroupForm";

import { GET_ALL_GROUPS } from "../../queries/Groups/groups";
import { useGroupHook } from "../Hooks/useGroupHook";

const Groups = () => {
	const { loading, error, data } = useQuery(GET_ALL_GROUPS, {
		fetchPolicy: "cache-first",
	});

	const [, deleteGroup, updateGroup] = useGroupHook();

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
				<Link to={`/group/${id}`} key={id} className="ju-item-row">
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
				</Link>
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
