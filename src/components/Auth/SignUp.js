import React from "react";
import { useMutation } from "@apollo/client";

import { SIGN_UP } from "../../queries/User/user";

import UserForm from "./UserForm";

const Signup = () => {
	const [signUp, { loading, error }] = useMutation(SIGN_UP, {
		onCompleted: (data) => {
			//Aca tendria que hacer el login y redireccionar
			console.log("En on complete de signUp");
			console.log(data);
		},
	});

	const signUpUser = (e) => {
		signUp({
			variables: {
				email: e.email,
				password: e.password,
			},
		});
	};

	if (error) {
		console.log("error en mutacion");
		console.log(error);
	}
	return (
		<div>
			<UserForm
				titleText="Sign Up"
				buttonText="Sign Up"
				loading={loading || false}
				onSubmit={(e) => signUpUser(e)}
			/>
		</div>
	);
};

export default Signup;
