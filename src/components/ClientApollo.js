import {
	ApolloClient,
	createHttpLink,
	defaultDataIdFromObject,
	from,
	InMemoryCache,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { NOT_AUTHORIZED } from "../variables";

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
		graphQLErrors.forEach(({ message, location, path }) => {
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
			);
			console.log("el mensaje es ", message);
			switch (message) {
				case NOT_AUTHORIZED:
					response.errors = null;
					break;
				default:
					response.errors = null;
			}
		});
	if (networkError) console.log(`[Network Error]: ${networkError}`);
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
				students: {
					merge(existing = [], incoming) {
						return incoming;
					},
				},
				// payments: {
				// 	merge(existing, incoming, { args: { offset = 0 } }) {
				// 		const merged = existing ? existing.slice(0) : [];
				// 		for (let i = 0; i < incoming.length; ++i) {
				// 			merged[offset + i] = incoming[i];
				// 		}
				// 		return merged;
				// 	},
				// 	keyArgs: false,
				// },
				group(_, { args, toReference }) {
					return toReference({
						__typename: "Group",
						id: args.id,
					});
				},
				class(_, { args, toReference }) {
					return toReference({
						__typename: "Class",
						id: args.id,
					});
				},
				student(_, { args, toReference }) {
					return toReference({
						__typename: "Student",
						id: args.id,
					});
				},
				payment(_, { args, toReference }) {
					return toReference({
						__typename: "Payment",
						id: args.id,
					});
				},
			},
		},
		Group: {
			keyFields: ["id"],
		},
		Class: {
			keyFields: ["id"],
		},
		Student: {
			keyFields: ["id"],
		},
		Payment: {
			keyField: ["id"],
		},
		// dataIdFromObject(responseObject) {
		// 	switch (responseObject.__typename) {
		// 		case "Class":
		// 			return `Class:${responseObject.id}`;
		// 		case "Group":
		// 			return `Group:${responseObject.id}`;
		// 		case "Student":
		// 			return `Student:${responseObject.id}`;
		// 		case "Payment":
		// 			return `Payment:${responseObject.id}`;
		// 		default:
		// 			return defaultDataIdFromObject(responseObject);
		// 	}
		// },
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
