import React from "react";
import { useFormik } from "formik";

const AssistantForm = (props) => {
	const validate = (values) => {
		const errors = {};

		if (!values.name) {
			errors.name = "Required";
		}

		if (!values.email) {
			errors.email = "Required";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		) {
			errors.email = "Invalid email address";
		}

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			name: props.values.name,
			email: props.values.email,
		},
		enableReinitialize: true,
		validate,
		onSubmit: (values) => {
			props.onSubmit({
				id: props.values.id,
				name: values.name,
				email: values.email,
			});
			formik.resetForm({});
		},
	});

	const renderCancel = () => {
		if (props.onCancel) {
			return (
				<div className="field">
					<button
						type="button"
						className="ui button"
						onClick={() => props.onCancel()}
					>
						Cancel
					</button>
				</div>
			);
		}
	};

	return (
		<div className="ju-form">
			<h4> {props.titleText}</h4>
			<form onSubmit={formik.handleSubmit} className="ui form">
				<div className="field">
					<label htmlFor="name"> Name </label>
					<input
						id="name"
						name="name"
						type="text"
						autoComplete="off"
						placeholder="Enter the name"
						onChange={formik.handleChange}
						value={formik.values.name}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.name && formik.errors.name ? (
						<div className="ju-required-input"> {formik.errors.name}</div>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="email"> E-mail</label>
					<input
						id="email"
						name="email"
						type="text"
						autoComplete="off"
						placeholder="Enter the e-mail"
						onChange={formik.handleChange}
						value={formik.values.email}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className="ju-required-input"> {formik.errors.email}</div>
					) : null}
				</div>
				<div className="field">
					<button type="submit" className="ui button">
						{props.buttonText}
					</button>
				</div>
				{renderCancel()}
			</form>
		</div>
	);
};

export default AssistantForm;
