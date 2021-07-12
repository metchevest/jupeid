import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { LOG_IN, PROFILE } from "../../queries/User/user";
import history from "../../history";
import { WRONG_USER_PASS } from "../../variables";
import AuthForm from "./AuthForm";

import { MessageContext } from "../Context/MessageContext";

const SignIn = () => {
	const [errors, setErrors] = useState({});

	const value = useContext(MessageContext);

	const [logIn, { loading }] = useMutation(LOG_IN, {
		refetchQueries: PROFILE,
		onCompleted: (data) => {
			if (data.logIn) {
				value.setMessage({
					top: "",
					bottom: "",
					positive: true,
				});

				history.push("/");
			}
		},
		onError: (data) => onError(data),
	});

	const onError = (data) => {
		let msg = "";
		switch (data.message) {
			case WRONG_USER_PASS:
				msg = "Wrong user or password.";
				break;
			default:
				msg = "Try another day my friend.";
		}

		setErrors({ field: "email", msg });
	};

	const signInUser = (e) => {
		logIn({
			variables: { email: e.email, password: e.password },
		});
	};

	const renderFooter = () => {
		return (
			<p>
				Not user ? <Link to="/signup"> Sign up you fool</Link>
			</p>
		);
	};

	return (
		<AuthForm
			titleText="Log in"
			buttonText="Log in"
			errors={errors}
			loading={loading || false}
			onSubmit={(e) => signInUser(e)}
			footer={() => renderFooter()}
		/>
	);
};

export default SignIn;
