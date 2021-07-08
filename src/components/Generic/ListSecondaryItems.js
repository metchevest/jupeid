import React from "react";

const ListSecondaryItems = ({ items, onSelect, onDelete }) => {
	const renderItems = () => {
		return items.map((anItem) => {
			return (
				<div
					key={anItem.id}
					className="ju-list_selection-item"
					onClick={() => onSelect(anItem)}
				>
					<p>{anItem.name}</p>
					<p>{anItem.id}</p>
					{onDelete ? (
						<div onClick={() => onDelete(anItem.id)}>
							<i className="trash alternate outline icon"> </i>
						</div>
					) : null}
				</div>
			);
		});
	};

	return <div>{renderItems()}</div>;
};

ListSecondaryItems.defaultProps = {
	onSelect: () => {},
};

export default ListSecondaryItems;
