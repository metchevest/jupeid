import { useMutation } from "@apollo/client";

import { useAuthToken } from "./AuthToken";

import { LOG_IN, PROFILE } from "../../queries/User/user";

export const useLoginMutation = () => {
	// const [, setAuthToken, removeAuthToken] = useAuthToken();
	// const [loginMutation, mutationResults] = useMutation(LOG_IN);
	// // 	, {
	// // 	// onCompleted: (data) => {
	// // 	// 	// setAuthToken(data.logIn.token);
	// // 	// 	console.log(data);
	// // 	// },
	// // 	refetchQueries: PROFILE,
	// // });
	// const login = (values) => {
	// 	removeAuthToken();
	// 	return loginMutation({
	// 		variables: { email: values.email, password: values.password },
	// 	});
	// };
	// return [login, mutationResults];
};
