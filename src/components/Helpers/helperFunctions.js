export const filterToPicker = (allObjects, associatedObjects) => {
	let newObj = allObjects.filter((obj) => {
		return !associatedObjects.some((assoc) => assoc.id === obj.id);
	});

	return newObj;
};
