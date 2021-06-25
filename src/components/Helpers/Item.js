import React from "react";

const Item = ({ items }) => {
	return items.map((item) => {
		return <div key={item.id}>{item.name}</div>;
	});
};

export default Item;
