import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React, { Component } from 'react';

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
								{data.users.map(user => <User key={user.id} user={user} />)}
							</tbody>
						</Table>
					</div>
				</div>
			)}
		</Query>
	);
}

class User extends Component {
	render() {
		const user = this.props.user;
		return (
			<tr>
				<td>{user.name}</td>
				<td>{user.email}</td>
				{possiblePermissions.map(permission => (
					<td key={permission}>
						<label htmlFor={`${user.id}-permission-${permission}`}>
							<input type="checkbox" />
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

export default Permissions;
