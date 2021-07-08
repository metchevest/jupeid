import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "../style/main.scss";

import history from "../history";

import Home from "./Home";
import Classes from "./Class/Classes";
import Groups from "./Group/Groups";
import GroupsShow from "./Group/GroupShow";
import GroupDelete from "./Group/GroupDelete";
import Header from "./Header";
import Students from "./Student/Students";

import ProtectedRoute from "./Auth/ProtectedRoute";

import { useApolloClient } from "./ClientApollo";
import Signup from "./Auth/SignUp";
import ClassShow from "./Class/ClassShow";
import StudentShow from "./Student/StudentShow";
import Payments from "./Payments/Payments";

import { MessageContext } from "./Context/MessageContext";

const App = () => {
	const client = useApolloClient();

	const [msg, setMsg] = useState({
		messageTop: "",
		messageBottom: "",
		positive: true,
		setMessage: (m) =>
			setMsg({
				...msg,
				messageTop: m.top,
				messageBottom: m.bottom,
				positive: m.positive,
			}),
	});

	return (
		<div>
			<ApolloProvider client={client}>
				<MessageContext.Provider value={msg}>
					<Router history={history}>
						<div className="main-ju">
							<Header />
							<Switch>
								<Route path="/" exact>
									<Home />
								</Route>

								<ProtectedRoute path="/groups" component={Groups} />

								<ProtectedRoute
									path="/group/delete/:id"
									component={GroupDelete}
								/>

								<ProtectedRoute path="/group/:id" component={GroupsShow} />

								<ProtectedRoute path="/students" component={Students} />

								<ProtectedRoute path="/classes" component={Classes} />

								<ProtectedRoute path="/class/:id" component={ClassShow} />

								<ProtectedRoute path="/student/:id" component={StudentShow} />

								<ProtectedRoute path="/payments" component={Payments} />

								<Route path="/signup">
									<Signup />
								</Route>
							</Switch>
							<div className="footer"></div>
						</div>
					</Router>
				</MessageContext.Provider>
			</ApolloProvider>
		</div>
	);
};

export default App;
