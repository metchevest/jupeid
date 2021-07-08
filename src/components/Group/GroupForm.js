import React from "react";
import { useFormik } from "formik";

const GroupForm = ({ values, onSubmit, onCancel, titleText, buttonText }) => {
	const validate = (values) => {
		const errors = {};

		if (!values.name) {
			errors.name = "Required";
		} else if (values.name.length > 15) {
			errors.name = "Must be 15 characters or less";
		}

		if (!values.cost) {
			errors.cost = "Required";
		}

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			id: values.id,
			name: values.name,
			cost: values.cost,
		},
		enableReinitialize: true,
		validate,
		onSubmit: (values) => {
			onSubmit({
				id: values.id,
				name: values.name,
				cost: values.cost,
			});
			formik.resetForm({});
		},
	});

	const renderCancel = () => {
		if (onCancel) {
			return (
				<div className="field">
					<button
						type="button"
						className="ui button"
						onClick={() => onCancel()}
					>
						Cancel
					</button>
				</div>
			);
		}
	};

	return (
		<div className="ju-form">
			<h4> {titleText}</h4>
			<form onSubmit={formik.handleSubmit} className="ui form">
				<div className="field">
					<label htmlFor="name"> Name </label>
					<input
						id="name"
						name="name"
						type="text"
						autoComplete="off"
						onChange={formik.handleChange}
						value={formik.values.name}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.name && formik.errors.name ? (
						<div className="ju-required-input"> {formik.errors.name} </div>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="cost"> Cost </label>
					<input
						id="cost"
						name="cost"
						type="number"
						autoComplete="off"
						onChange={formik.handleChange}
						value={formik.values.cost}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.cost && formik.errors.cost ? (
						<div className="ju-required-input"> {formik.errors.cost} </div>
					) : null}
				</div>
				<div className="field">
					<button type="submit" className="ui button">
						{buttonText}
					</button>
				</div>
				{renderCancel()}
			</form>
		</div>
	);
};

GroupForm.defaultProps = {
	values: {
		name: "",
		cost: "0.00",
	},
};

export default GroupForm;
