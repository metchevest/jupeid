import React from "react";

import useSelectHook from "../Hooks/useSelectHook";
import ListSelection from "../Helpers/ListSelection";

const ListToselect = ({ items, onSave }) => {
	const [selected, add, reset, deleteItem] = useSelectHook();

	const onSelect = (item) => {
		add(item);
		console.log("onSelect", selected);
	};

	const renderToSelect = () => {
		return <ListSelection items={items} onSelect={(item) => onSelect(item)} />;
	};

	const onDelete = (item) => {
		deleteItem(item);
	};

	const renderGroupsSelected = () => {
		return (
			<ListSelection items={selected} onDelete={(item) => onDelete(item)} />
		);
	};

	return (
		<div>
			<p> Choose the group to add </p>
			{renderToSelect()}
			<p> Selected: </p>
			{renderGroupsSelected()}
			<p> That is the list</p>
			<button
				onClick={() => {
					console.log("en onclick de save", selected);
					onSave(selected);
				}}
			>
				Save{" "}
			</button>
			<button onClick={() => reset()}> Reset</button>
		</div>
	);
};

export default ListToselect;
