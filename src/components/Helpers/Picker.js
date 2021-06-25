import React from "react";

import Modal from "./Modal";
import { useSelectHook } from "../Hooks/useSelectHook";

const Picker = ({ items, title, onDismiss, onSave }) => {
	const [selected, clicked_item, reset] = useSelectHook();

	const renderItems = () => {
		return items.map((item) => {
			const className = selected.includes(item)
				? "ju-item-selection ju--selected"
				: "ju-item-selection";
			console.log("el nombre de la clases es ", className);
			return (
				<div
					key={item.id}
					onClick={() => clicked_item(item)}
					className={className}
				>
					{item.name}
				</div>
			);
		});
	};

	const renderAction = () => {
		return (
			<React.Fragment>
				<button onClick={() => onSave(selected)} className="ui primary button">
					Save
				</button>
				<button onClick={() => reset()} className="ui primary button">
					Reset Selection
				</button>
				<button onClick={() => onDismiss()} className="ui primary button">
					Cancel
				</button>
			</React.Fragment>
		);
	};

	return (
		<Modal
			title={title}
			content={renderItems()}
			onDismiss={() => onDismiss()}
			actions={renderAction()}
		/>
	);
};

export default Picker;
