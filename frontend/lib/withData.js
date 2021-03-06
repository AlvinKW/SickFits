import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

import { LOCAL_STATE_QUERY } from './prismaQueries';

function createClient({ headers }) {
	return new ApolloClient({
		uri: process.env.ENDPOINT,
		request: operation => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include',
				},
				headers,
			});
		},
		clientState: {
			resolvers: {
				Mutation: {
					toggleCart(_, variables, { cache }) {
						const { cartOpen } = cache.readQuery({ query: LOCAL_STATE_QUERY });
						const data = { data: { cartOpen: !cartOpen } };

						cache.writeData(data);
						return data;
					},
				},
			},
			defaults: {
				cartOpen: false,
			},
		},
	});
}

export default withApollo(createClient);
