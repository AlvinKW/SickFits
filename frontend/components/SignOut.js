import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
	mutation SIGN_OUT_MUTATION {
		signOut {
			message
		}
	}
`;

function SignOut() {
	return (
		<Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
			{(signOut, { data, loading, error, called }) => {
				if (!loading && !error && called) { console.info(data.signOut.message); }
				return (
					<button onClick={signOut}>Sign Out</button>
				);
			}}
		</Mutation>
	);
}

export default SignOut;
