import React, { useState } from "react";
import { usePaymentHook } from "../Hooks/usePaymentHook";

import Picker from "./Picker";

const PaymentForMany = ({ title, items }) => {
	const [modal, setModal] = useState(false);

	const [, paymentForMany] = usePaymentHook();

	const action = () => {
		setModal(true);
	};

	const setPaymentFor = (selectedStudents) => {
		//Run the mutation
		console.log("Los estudienates son", selectedStudents);
		setModal(false);

		const studentList = selectedStudents.map((aStudent) => {
			return { id: aStudent.id };
		});
		paymentForMany({
			variables: {
				students: studentList,
			},
		});
	};

	return (
		<div>
			<button onClick={() => action()}> {title}</button>
			{modal ? (
				<Picker
					items={items}
					allSelected={true}
					title="Select the students to set Payment"
					onSave={(selectedStudents) => {
						setPaymentFor(selectedStudents);
					}}
					onDismiss={() => setModal(false)}
				/>
			) : null}
		</div>
	);
};

PaymentForMany.defaultProps = {
	title: "Select",
};

export default PaymentForMany;
