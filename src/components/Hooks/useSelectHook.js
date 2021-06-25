import { useState } from "react";

export const useSelectHook = () => {
	const [selected, setSelected] = useState([]);

	const clicked_item = (item) => {
		if (!selected.includes(item)) {
			setSelected(() => [...selected, item]);
		} else {
			setSelected(
				selected.filter((anItem) => {
					return anItem !== item;
				})
			);
		}
	};

	const reset = () => {
		setSelected([]);
	};

	return [selected, clicked_item, reset];
};
