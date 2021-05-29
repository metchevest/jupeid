import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "../style/main.scss";

import history from "../history";

import Home from "./Home";
import Classes from "./Class/Classes";
import Groups from "./Group/Groups";
import Header from "./Header";
import Assistants from "./Assistant/Assistants";

import ProtectedRoute from "./Auth/ProtectedRoute";

import { useApolloClient } from "./ClientApollo";
import Signup from "./Auth/SignUp";

const App = () => {
	const client = useApolloClient();

	return (
		<div>
			<ApolloProvider client={client}>
				<Router history={history}>
					<div className="main-ju">
						<Header />
						<Switch>
							<Route path="/" exact>
								<Home />
							</Route>

							<ProtectedRoute path="/groups" component={Groups} />

							<ProtectedRoute path="/assistants" component={Assistants} />

							<ProtectedRoute path="/classes" component={Classes} />

							<Route path="/signup">
								<Signup />
							</Route>
						</Switch>
						<div className="footer"></div>
					</div>
				</Router>
			</ApolloProvider>
		</div>
	);
};

export default App;
