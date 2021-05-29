import { useQuery } from "@apollo/client";

import { PROFILE } from "../../queries/User/user";

export const useUserQuery = () =>
	useQuery(PROFILE, {
		onError: (e) => console.log("Hubo un error", e),
	});
