import { Query } from 'react-apollo';

import { CURRENT_USER_QUERY } from './User';
import SignIn from './SignIn';

function PleaseSignIn(props) {
	return (
		<Query query={CURRENT_USER_QUERY}>
			{({ data, loading }) => {
				if (loading) {
					return <p>Loading...</p>;
				} else if (!data.me) {
					return <SignIn />;
				} else {
					return props.children;
				}
			}}
		</Query>
	);
}

export default PleaseSignIn;
