import React from "react";
import { Link } from "react-router-dom";

const ListSecondaryItems = ({ items, onSelect, onDelete, path }) => {
	const renderItems = () => {
		return items.map((anItem) => {
			return (
				<div
					key={anItem.id}
					className="ju-list_selection-item"
					onClick={() => onSelect(anItem)}
				>
					<Link to={`${path}/${anItem.id}`}>{anItem.name}</Link>
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
	path: "",
};

export default ListSecondaryItems;
