import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_PAYMENTS } from "../../queries/Payments/payments";

const Payments = () => {
	const { loading, error, data } = useQuery(GET_ALL_PAYMENTS);

	if (error) {
		return <div> Error... </div>;
	}

	if (loading) {
		return <div> Loading... </div>;
	}

	const renderPayments = () => {
		return data.getPayments.map((aPayment) => {
			return (
				<div key={aPayment.id}>
					{aPayment.student.id}
					{aPayment.id}
					{aPayment.month}
				</div>
			);
		});
	};

	console.log("La data que vienee es", data);

	return (
		<div>
			This is payments Index
			<div>{renderPayments()}</div>
		</div>
	);
};

export default Payments;
