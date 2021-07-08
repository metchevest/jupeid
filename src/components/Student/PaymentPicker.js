import React, { useState } from "react";
import DatePicker from "react-date-picker";

const PaymentPicker = ({ savePayment }) => {
	const [value, onChange] = useState(new Date());

	return (
		<div>
			{" "}
			This is Payment Date Picker
			<button onClick={() => savePayment(value)}> Register Payment</button>
			<div>
				<DatePicker onChange={onChange} value={value} format="dd-MM-y" />
			</div>
		</div>
	);
};

export default PaymentPicker;
