import React, { useEffect } from "react";

import Modal from "./Modal";
import { useSelectHook } from "../Hooks/useSelectHook";

const Picker = ({ items, title, onDismiss, onSave, allSelected }) => {
	const [selected, clicked_item, reset, addAll] = useSelectHook();

	const renderItems = () => {
		return items.map((item) => {
			const className = selected.includes(item)
				? "ju-item-selection ju--selected"
				: "ju-item-selection";
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

	const renderEmptyActions = () => {
		return (
			<button onClick={() => onDismiss()} className="ui primary button">
				Cancel
			</button>
		);
	};

	useEffect(() => {
		if (allSelected) {
			addAll(items);
		}
	}, []);

	if (items.length > 0) {
		return (
			<Modal
				title={title}
				content={renderItems()}
				onDismiss={onDismiss}
				actions={renderAction()}
			/>
		);
	} else {
		return (
			<Modal
				title={title}
				content="There are no elements to show."
				onDismiss={onDismiss}
				actions={renderEmptyActions()}
			/>
		);
	}
};

Picker.defaultProps = {
	allSelected: false,
};

export default Picker;
