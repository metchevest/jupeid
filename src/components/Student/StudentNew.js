import React from "react";

import StudentForm from "./StudentForm";
import { useStudentHook } from "../Hooks/useStudentHook";

const StudentNew = () => {
	const [addStudent] = useStudentHook();

	return (
		<StudentForm
			titleText="New student"
			buttonText="Add student"
			onSubmit={(e) =>
				addStudent({
					variables: {
						name: e.name,
						email: e.email,
					},
				})
			}
		/>
	);
};

export default StudentNew;
