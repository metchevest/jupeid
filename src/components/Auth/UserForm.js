import React from "react";
import { useFormik } from "formik";

const UserForm = (props) => {
	const validate = (values) => {
		let errors = {};

		if (props.errors.email !== "" && props.errors.password !== "") {
			errors = { ...props.errors };
			console.log("en el form");
			console.log(errors);
			console.log(props);
		}
		if (!values.email) {
			errors.email = "Required";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		) {
			errors.email = "Invalid email address";
		}

		if (!values.password) {
			errors.password = "Required";
		}

		console.log("antes de volver errors vale");
		console.log(errors);
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		enableReinitialize: true,
		validate,
		onSubmit: (values) => {
			props.onSubmit({
				email: values.email,
				password: values.password,
			});
			formik.resetForm({});
		},
	});

	return (
		<div className="ju-form">
			<h4> {props.titleText}</h4>
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
						<div className="ju-required-input"> {formik.errors.email} </div>
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
						<div className="ju-required-input"> {formik.errors.password} </div>
					) : null}
				</div>
				<div className="field">
					<button
						type="submit"
						className={`ui button ${props.loading ? "loading" : ""}`}
					>
						{props.buttonText}
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserForm;
