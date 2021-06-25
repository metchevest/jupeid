import { useMutation } from "@apollo/client";

import { ADD_PAYMENT } from "../../queries/Payments/payments";

export const usePaymentHook = () => {
	const [createPayment] = useMutation(ADD_PAYMENT);

	return [createPayment];
};
