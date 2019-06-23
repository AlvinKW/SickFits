import React from 'react';
import { Mutation } from 'react-apollo';

import { SIGN_OUT_MUTATION } from '../lib/prismaMutations';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';

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
