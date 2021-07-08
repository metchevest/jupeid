import React from "react";
import { useFormik } from "formik";

const ClassForm = ({ values, onSubmit, onCancel, titleText, buttonText }) => {
	const validate = (values) => {
		const errors = {};

		if (!values.name) {
			errors.name = "Required";
		} else if (values.name.length > 15) {
			errors.name = "Must be 15 characters or less";
		}

		if (!values.date) {
			errors.date = "Required";
		}

		if (!values.hour) {
			errors.hour = "Required";
		}

		if (!values.activity) {
			errors.activity = "Required";
		}

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			id: values.id,
			name: values.name,
			date: values.date,
			hour: values.hour,
			activity: values.activity,
		},
		enableReinitialize: true,
		validate,
		onSubmit: (values) => {
			onSubmit({
				id: values.id,
				name: values.name,
				date: values.date,
				hour: values.hour,
				activity: values.activity,
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
			<h4> {titleText} </h4>
			<form onSubmit={formik.handleSubmit} className="ui form">
				<div className="field">
					<label htmlFor="name"> Name </label>
					<input
						id="name"
						type="text"
						autoComplete="off"
						onChange={formik.handleChange}
						value={formik.values.name}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.name && formik.errors.name ? (
						<div className="ju-required-input">{formik.errors.name} </div>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="date"> Date</label>
					<input
						id="date"
						type="text"
						autoComplete="off"
						onChange={formik.handleChange}
						value={formik.values.date}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.date && formik.errors.date ? (
						<div className="ju-required-input">{formik.errors.date} </div>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="hour"> Hour</label>
					<input
						id="hour"
						type="number"
						autoComplete="off"
						onChange={formik.handleChange}
						value={formik.values.hour}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.hour && formik.errors.hour ? (
						<div className="ju-required-input">{formik.errors.hour} </div>
					) : null}
				</div>
				<div className="field">
					<label htmlFor="activity"> Activity</label>
					<input
						id="activity"
						type="text"
						autoComplete="off"
						onChange={formik.handleChange}
						value={formik.values.activity}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.activity && formik.errors.activity ? (
						<div className="ju-required-input">{formik.errors.activity} </div>
					) : null}
				</div>

				<div className="field">
					<button type="submit" className="ui button">
						{" "}
						{buttonText}
					</button>
				</div>
				{renderCancel()}
			</form>
		</div>
	);
};

ClassForm.defaultProps = {
	values: {
		name: "",
		hour: "",
		activity: "",
		date: "",
	},
};

export default ClassForm;
