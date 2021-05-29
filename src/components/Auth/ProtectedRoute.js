import React from "react";
import { Route } from "react-router-dom";

// import { useAuthToken } from "./AuthToken";
import Unauthorized from "./Unauthorized";
import { useUserQuery } from "./userQuery";

const ProtectedRoute = ({ path: path, component: Component, ...rest }) => {
	// const [authToken] = useAuthToken();
	const userData = useUserQuery();

	if (userData.data) {
		return <Route {...rest} render={(props) => <Component {...props} />} />;
	} else {
		return <Unauthorized />;
	}
};

export default ProtectedRoute;
