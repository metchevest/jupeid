import { useMutation } from "@apollo/client";

import {
	ADD_PAYMENT,
	GET_ALL_PAYMENTS,
	MANY_PAYMENTS,
} from "../../queries/Payments/payments";

export const usePaymentHook = () => {
	//Cambie el tipo que retorna createPayment en el schema en el back
	//Ahora está funcionando pero tengo que ver que hace esta funcion si es lo que tiene uqe hacer
	//o tengo que cambiar algo que todavia no estoy entendiendo de las mutaciones y el schema en gral de apollo
	// capaz que tengo que diseñar las queries de forma diferente para que se puedan ver entre ellas y no tengan que actualizar
	// o hacer el update de forma manual, tambien para ver que cuando bajo el profile despues no
	// tenga que volver a consultar cuando voy al resto de las pantallas
	const [createPayment] = useMutation(ADD_PAYMENT, {
		update(cache, { data }) {
			const newPaymentFromResponse = data?.createPayment;
			const existingPayments = cache.readQuery({
				query: GET_ALL_PAYMENTS,
			});

			console.log("newPaymentFromResponse", newPaymentFromResponse);
			console.log("existingPayments", existingPayments);

			if (existingPayments && newPaymentFromResponse) {
				cache.writeQuery({
					query: GET_ALL_PAYMENTS,
					data: {
						classes: [...existingPayments.payments, newPaymentFromResponse],
					},
				});
			}
		},
		onCompleted: (data) => console.log("Lo que viene es ", data),
	});

	const [paymentForMany] = useMutation(MANY_PAYMENTS);

	return [createPayment, paymentForMany];
};
