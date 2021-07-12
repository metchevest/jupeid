import React, { useEffect } from "react";
import { useFormik } from "formik";

const AuthForm = ({
	onSubmit,
	errors,
	titleText,
	footer,
	buttonText,
	loading,
}) => {
	const validate = (values) => {
		let errors = {};

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
			onSubmit({
				email: values.email,
				password: values.password,
			});
		},
	});

	useEffect(() => {
		const { field, msg } = errors;
		formik.setFieldError(field, msg);
		formik.validateForm();
		// mailInput.focus();
		// mailInput.select();
	}, [errors]);

	let mailInput;

	const renderFooter = () => {
		if (footer) {
			return footer();
		}
	};

	return (
		<div className="ju-form">
			<h4> {titleText}</h4>
			<form onSubmit={formik.handleSubmit} className="ui form">
				<div className="field">
					<label htmlFor="email"> E-mail</label>
					<input
						id="email"
						name="email"
						type="text"
						autoComplete="off"
						placeholder="E-mail"
						ref={(input) => {
							mailInput = input;
						}}
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
						className={`ui button ${loading ? "loading" : ""}`}
					>
						{buttonText}
					</button>
				</div>
				{renderFooter()}
			</form>
		</div>
	);
};

export default AuthForm;
