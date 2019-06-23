import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { CURRENT_USER_QUERY } from '../lib/prismaQueries';

function User(props) {
	return (
		<Query query={CURRENT_USER_QUERY} {...props}>
			{payload => props.children(payload)}
		</Query>
	);
}

User.propTypes = {
	children: PropTypes.func.isRequired,
};

export default User;
