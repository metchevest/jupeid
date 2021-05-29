import {
	ApolloClient,
	ApolloLink,
	createHttpLink,
	from,
	InMemoryCache,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
	uri: "http://localhost:4000/",
	credentials: "include",
});

// THIS IS THE LINK TO PUT THE TOKEN
// I'M TESTING WITH A HTTPONLY COOKIE
// const authLink = (authToken) =>
// 	new ApolloLink((operation, forward) => {
// 		if (authToken) {
// 			operation.setContext({
// 				headers: {
// 					authorization: `Bearer ${authToken}`,
// 				},
// 			});
// 		}
// 		return forward(operation);
// 	});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, location, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Network Error]: ${networkError}`);

	// response.errors = null;
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				groups: {
					merge(existing = [], incoming) {
						return incoming;
					},
				},
				classes: {
					merge(existing = [], incoming) {
						return incoming;
					},
				},
				assistants: {
					merge(existing = [], incoming) {
						return incoming;
					},
				},
			},
		},
		Group: {
			keyFields: ["id"],
		},
		Class: {
			keyFields: ["id"],
		},
		Affiliate: {
			keyFields: ["id"],
		},
	},
});

export const useApolloClient = () => {
	// const [authToken] = useAuthToken();
	return new ApolloClient({
		// link: authLink(authToken).concat(httpLink),
		link: from([errorLink, httpLink]),
		cache,
	});
};
