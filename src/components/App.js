import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import "../style/style.css";

import history from "../history";

import Home from "./Home";
import Classes from "./Classes";
import Groups from "./Groups";
import Header from "./Header";
import Assistants from "./Assistants";
import NewGroup from "./NewGroup";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache({
		dataIdFromObject(responseObject) {
			switch (responseObject.__typename) {
				case "Group":
					return `Group:${responseObject.id}`;
				case "User":
					return `User:${responseObject.id}`;
				default:
					return "${responseObject.id";
			}
		},
	}),
});

client
	.query({
		query: gql`
			query aQuery {
				allUsers {
					id
					name
					facebook_id
					fantasy_name
					month_income
				}
			}
		`,
	})
	.then((result) => console.log(result));

const App = () => {
	return (
		<div className="ui">
			<ApolloProvider client={client}>
				<Router history={history}>
					<div className="main-ju">
						<Header />
						<Switch>
							<Route path="/" exact>
								<Home />
							</Route>
							<Route path="/groups">
								<Groups />
							</Route>
							<Route path="/assistants">
								<Assistants />
							</Route>
							<Route path="/classes">
								<Classes />
							</Route>
							<Route path="/new/group">
								<NewGroup />
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
