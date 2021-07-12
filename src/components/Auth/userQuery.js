import { useQuery } from "@apollo/client";

import { PROFILE } from "../../queries/User/user";

export const useUserQuery = () =>
	useQuery(PROFILE, {
		onError: (e) => console.log("Error on Profile query.", e),
	});
