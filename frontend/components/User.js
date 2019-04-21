import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
	query CURRENT_USER_QUERY {
		me {
			id
			name
			email
			permissions
		}
	}
`;

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

export { CURRENT_USER_QUERY };
export default User;
