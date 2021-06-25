import { useMutation } from "@apollo/client";

import {
	ADD_GROUP,
	GET_ALL_GROUPS,
	DELETE_GROUP,
	EDIT_GROUP,
	ADD_STUDENTS_TO_GROUP,
	DELETE_STUDENT_FROM_GROUP,
} from "../../queries/Groups/groups";

export const useGroupHook = () => {
	const [createGroup] = useMutation(ADD_GROUP, {
		update(cache, { data }) {
			const newGroupFromResponse = data?.createGroup;
			const existingGroups = cache.readQuery({
				query: GET_ALL_GROUPS,
			});

			if (existingGroups && newGroupFromResponse) {
				cache.writeQuery({
					query: GET_ALL_GROUPS,
					data: {
						groups: [...existingGroups.groups, newGroupFromResponse],
					},
				});
			}
		},
	});

	const [deleteGroup] = useMutation(DELETE_GROUP, {
		update(cache, { data: { deleteGroup: groupDeleted } }) {
			const existingGroups = cache.readQuery({
				query: GET_ALL_GROUPS,
			});

			cache.writeQuery({
				query: GET_ALL_GROUPS,
				data: {
					groups: existingGroups?.groups.filter(
						(group) => group.id !== groupDeleted.id
					),
				},
			});

			const idNormalized = cache.identify({
				id: groupDeleted.id,
				__typename: "Group",
			});

			cache.evict({ id: idNormalized });
			cache.gc();
		},
	});

	const [updateGroup] = useMutation(EDIT_GROUP);

	const [addStudentsToGroup] = useMutation(ADD_STUDENTS_TO_GROUP);

	const [deleteStudentFromGroup] = useMutation(DELETE_STUDENT_FROM_GROUP);

	return [
		createGroup,
		deleteGroup,
		updateGroup,
		addStudentsToGroup,
		deleteStudentFromGroup,
	];
};
