import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { SIGN_UP } from "../../queries/User/user";
import { MAIL_IN_USE } from "../../variables";

import AuthForm from "./AuthForm";
import history from "../../history";
import { MessageContext } from "../Context/MessageContext";

const Signup = () => {
	const [errors, setErrors] = useState({});

	const value = useContext(MessageContext);

	const [signUp, { loading }] = useMutation(SIGN_UP, {
		onCompleted: () => {
			value.setMessage({
				top: "Sign Up Succefully",
				bottom: "Please, Log in to continue",
				positive: true,
			});

			history.push("/");
		},
		onError: (data) => onError(data),
	});

	const onError = (data) => {
		if (data.message === MAIL_IN_USE) {
			setErrors({ field: "email", msg: MAIL_IN_USE });
		}
	};

	const signUpUser = (e) => {
		signUp({
			variables: {
				email: e.email,
				password: e.password,
			},
		});
	};

	return (
		<AuthForm
			titleText="Sign Up"
			buttonText="Sign Up"
			errors={errors}
			loading={loading || false}
			onSubmit={(e) => signUpUser(e)}
		/>
	);
};

export default Signup;
