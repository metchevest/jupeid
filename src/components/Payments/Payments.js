import React from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { GET_ALL_PAYMENTS } from "../../queries/Payments/payments";
import { GET_STUDENT } from "../../queries/Students/students";
const Payments = () => {
	const { loading, error, data } = useQuery(GET_ALL_PAYMENTS);

	if (error) {
		return <div> Error... </div>;
	}

	if (loading) {
		return <div> Loading... </div>;
	}

	const renderPayments = () => {
		return data.payments.map((aPayment) => {
			const dt = new Date(aPayment.paymentDate);
			const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(dt);
			const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(dt);
			const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dt);

			return (
				<div key={aPayment.id}>
					StudentId: {aPayment.student.id}
					<br></br>
					Payment Id: {aPayment.id} <br></br>
					Month: {aPayment.month} <br></br>
					Fecha: {aPayment.paymentDate}
					<br></br>
					Payment Date day: {aPayment.paymentDate.slice(8, 10)}
					<br></br>
					Payment Date month: {aPayment.paymentDate.slice(5, 7)}
					<br></br>
					Payment Date year: {aPayment.paymentDate.slice(0, 4)}
					<br></br>
					Fecha Bien: {`${da}-${mo}-${ye}`}
					<br></br>
					Student Name :{" "}
					<Link to={`/student/${aPayment.student.id}`}>
						{aPayment.student.name}
					</Link>
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
