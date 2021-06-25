import { useMutation } from "@apollo/client";

import {
	GET_ALL_CLASSES,
	ADD_CLASS,
	DELETE_CLASS,
	EDIT_CLASS,
	UPDATE_CLASS_STUDENTS,
} from "../../queries/Classes/classes";

export const useClassHook = () => {
	const [createClass] = useMutation(ADD_CLASS, {
		update(cache, { data }) {
			const newClassFromResponse = data?.createClass;
			const existingClasses = cache.readQuery({
				query: GET_ALL_CLASSES,
			});

			if (existingClasses && newClassFromResponse) {
				cache.writeQuery({
					query: GET_ALL_CLASSES,
					data: {
						classes: [...existingClasses.classes, newClassFromResponse],
					},
				});
			}
		},
	});

	const [updateClassStudents] = useMutation(UPDATE_CLASS_STUDENTS);

	const [deleteClass] = useMutation(DELETE_CLASS, {
		update(cache, { data: { deleteClass: classDeleted } }) {
			const existingClasses = cache.readQuery({
				query: GET_ALL_CLASSES,
			});

			cache.writeQuery({
				query: GET_ALL_CLASSES,
				data: {
					classes: existingClasses?.classes.filter(
						(aClass) => aClass.id !== classDeleted.id
					),
				},
			});

			const idNormalized = cache.identify({
				id: classDeleted.id,
				__typename: "Class",
			});

			cache.evict({ id: idNormalized });
			cache.gc();
		},
	});

	const [updateClass] = useMutation(EDIT_CLASS);

	return [createClass, updateClassStudents, deleteClass, updateClass];
};
