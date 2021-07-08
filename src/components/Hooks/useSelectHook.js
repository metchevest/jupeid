import { useState } from "react";

export const useSelectHook = () => {
	const [selected, setSelected] = useState([]);

	const clicked_item = (item) => {
		// console.log("En el hook clicker", item);
		if (!selected.includes(item)) {
			console.log("Agregando el valor", item);
			console.log("Selected vale", selected);
			setSelected(() => [...selected, item]);
		} else {
			console.log("filtrando.....");
			setSelected(
				selected.filter((anItem) => {
					return anItem !== item;
				})
			);
		}
		console.log("en el hook-> selected", selected);
	};

	const reset = () => {
		setSelected([]);
	};

	const addAll = (aCollection) => {
		setSelected(selected.concat(aCollection));
	};

	return [selected, clicked_item, reset, addAll];
};
