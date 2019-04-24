import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const possiblePermissions = [
	'ADMIN',
	'USER',
	'ITEMCREATE',
	'ITEMUPDATE',
	'ITEMDELETE',
	'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
	query ALL_USERS_QUERY {
		users {
			id
			name
			email
			permissions
		}
	}
`;

function Permissions() {
	return (
		<Query query={ALL_USERS_QUERY}>
			{({ data, error }) => (
				<div>
					<Error error={error} />
					<div>
						<h2>Manage Permissions</h2>
						<Table>
							<thead>
								<tr>
									<th>Name</th>
									<th>E-Mail</th>
									{possiblePermissions.map(permission => (
										<th key={permission}>{permission}</th>
									))}
									<th>&darr;</th>
								</tr>
							</thead>
							<tbody>
								{data.users.map(user => <UserPermissions key={user.id} user={user} />)}
							</tbody>
						</Table>
					</div>
				</div>
			)}
		</Query>
	);
}

class UserPermissions extends Component {
	state = {
		permissions: this.props.user.permissions,
	};

	permissionChangeHandler = event => {
		const checkbox = event.target;
		let updatedPermissions = [...this.state.permissions];

		if (checkbox.checked) {
			updatedPermissions.push(checkbox.value);
		} else {
			updatedPermissions = updatedPermissions.filter(permission => {
				return permission !== checkbox.value;
			});
		}

		this.setState({ permissions: updatedPermissions });
	};

	render() {
		const user = this.props.user;
		return (
			<tr>
				<td>{user.name}</td>
				<td>{user.email}</td>
				{possiblePermissions.map(permission => (
					<td key={permission}>
						<label htmlFor={`${user.id}-permission-${permission}`}>
							<input
								type="checkbox"
								value={permission}
								checked={this.state.permissions.includes(permission)}
								onChange={this.permissionChangeHandler}
							/>
						</label>
					</td>
				))}
				<td>
					<SickButton>Update</SickButton>
				</td>
			</tr>
		);
	}
}

UserPermissions.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string,
		email: PropTypes.string,
		permissions: PropTypes.array,
	}).isRequired,
};

export default Permissions;
