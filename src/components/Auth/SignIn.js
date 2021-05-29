import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

// import UserForm from "./UserForm";

import { LOG_IN, PROFILE } from "../../queries/User/user";
import history from "../../history";

const SignIn = () => {
	const validate = (values) => {
		// let prevErr = formik.errors;
		const errors = {};
		// console.log("inside validate", formik);
		if (!values.email) {
			if (!formik.errors.email) {
				errors.email = "Required";
			} else {
				errors.email = formik.errors.email;
			}
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		) {
			errors.email = "Invalid email address";
		}

		if (!values.password) {
			if (!formik.errors.email) {
				errors.password = "Required";
			} else {
				errors.password = formik.errors.password;
			}
		}

		return errors;
	};

	const signUserIn = (e) => {
		logIn({
			variables: { email: e.email, password: e.password },
		});
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		enableReinitialize: true,
		validate,
		onSubmit: (values) => {
			signUserIn({
				email: values.email,
				password: values.password,
			});
		},
	});

	const onError = (data) => {
		console.log("en onError", Object.keys(data));
		console.log("el mensaje es", data.message);
		console.log(data.graphQLErrors);
		console.log(data.networkError);
		console.log(data.extraInfo);
		let msg = "";
		switch (data.message) {
			case "Not you.":
				msg = "Email already in use.";
			default:
				msg = "Try another day my friend.";
		}

		formik.setFieldError("email", msg);
		// formik.setFieldError("password", "no anda");
	};

	const [logIn, { loading: loading, error: errorLogIn }] = useMutation(LOG_IN, {
		refetchQueries: PROFILE,
		onCompleted: (data) => {
			if (data.logIn) {
				history.push("/assistants");
			}
		},
		onError: (data) => onError(data),
	});

	return (
		<div>
			<div className="ju-form">
				<h4> Login</h4>
				<form onSubmit={formik.handleSubmit} className="ui form">
					<div className="field">
						<label htmlFor="email"> E-mail</label>
						<input
							id="email"
							name="email"
							type="text"
							autoComplete="off"
							placeholder="E-mail"
							onChange={formik.handleChange}
							value={formik.values.email}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.email && formik.errors.email ? (
							<div className="ju-required-input"> {formik.errors.email}</div>
						) : null}
					</div>
					<div className="field">
						<label htmlFor="password"> Password </label>
						<input
							id="password"
							name="password"
							type="password"
							placeholder="Password"
							autoComplete="off"
							onChange={formik.handleChange}
							value={formik.values.password}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.password && formik.errors.password ? (
							<div className="ju-required-input">
								{" "}
								{formik.errors.password}{" "}
							</div>
						) : null}
					</div>
					<div className="field">
						<button
							type="submit"
							className={`ui button ${loading ? "loading" : ""}`}
						>
							Login
						</button>
					</div>
				</form>
				<div>
					Not user? <Link to="/signup"> Sign up you fool.</Link>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
