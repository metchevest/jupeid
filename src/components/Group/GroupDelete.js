import React from "react";

import Modal from "../Generic/Modal";
import history from "../../history";
import { useGroupHook } from "../Hooks/useGroupHook";

const GroupDelete = ({ match }) => {
	const id = match.params.id;

	const [, deleteGroup] = useGroupHook();

	const deleteThisGroup = () => {
		deleteGroup({
			variables: {
				id,
			},
		});
		history.push("/groups");
	};

	const renderAction = () => {
		return (
			<React.Fragment>
				<button onClick={() => deleteThisGroup()} className="ui primary button">
					Confirm
				</button>
				<button
					onClick={() => history.push(`/group/${id}`)}
					className="ui primary button"
				>
					Cancel
				</button>
			</React.Fragment>
		);
	};

	const renderContent = () => {
		return <div> Delete Group ? </div>;
	};

	console.log("En Group Delete ", id);

	return (
		<Modal
			title="Confirm ?"
			content={renderContent()}
			onDismiss={() => history.push(`/group/${id}`)}
			actions={renderAction()}
		/>
	);
};

export default GroupDelete;
