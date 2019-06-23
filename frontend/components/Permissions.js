import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ALL_USERS_QUERY } from '../lib/prismaQueries';
import { UPDATE_PERMISSIONS_MUTATION } from '../lib/prismaMutations';

import Error from './Error';
import SickButton from './SickButton';

const possiblePermissions = [
	'ADMIN',
	'USER',
	'ITEMCREATE',
	'ITEMUPDATE',
	'ITEMDELETE',
	'PERMISSIONUPDATE',
];

const StyledTable = styled.table`
	width: 100%;
	border: 1px solid ${props => props.theme.offWhite};
	border-spacing: 0;

	thead {
		font-size: 10px;
	}

	td,th {
		position: relative;
		padding: 5px;
		border-bottom: 1px solid ${props => props.theme.offWhite};
		border-right: 1px solid ${props => props.theme.offWhite};

		&:last-child {
			width: 150px;
			border-right: none;
			
			button {
				width: 100%;
			}
		}

		label {
			display: block;
			padding: 10px 5px;
		}
	}

	tr {
		&:hover {
			background: ${props => props.theme.offWhite};
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
						<StyledTable>
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
						</StyledTable>
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

	permissionChangeHandler = (event, updatePermissions) => {
		const checkbox = event.target;
		let updatedPermissions = [...this.state.permissions];

		if (checkbox.checked) {
			updatedPermissions.push(checkbox.value);
		} else {
			updatedPermissions = updatedPermissions.filter(permission => {
				return permission !== checkbox.value;
			});
		}

		this.setState({ permissions: updatedPermissions }, updatePermissions);
	};

	render() {
		const user = this.props.user;
		return (
			<Mutation
				mutation={UPDATE_PERMISSIONS_MUTATION}
				variables={{
					permissions: this.state.permissions,
					userID: this.props.user.id,
				}}
			>
				{(updatePermissions, { loading, error }) => (
					<Fragment>
						{error && <tr><td colSpan="9"><Error error={error} /></td></tr>}
						<tr>
							<td>{user.name}</td>
							<td>{user.email}</td>
							{possiblePermissions.map(permission => (
								<td key={permission}>
									<label htmlFor={`${user.id}-permission-${permission}`}>
										<input
											id={`${user.id}-permission-${permission}`}
											type="checkbox"
											value={permission}
											checked={this.state.permissions.includes(permission)}
											onChange={event => this.permissionChangeHandler(event, updatePermissions)}
										/>
									</label>
								</td>
							))}
							<td>
								<SickButton
									type="button"
									disabled={loading}
									onClick={updatePermissions}
								>
									Updat{loading ? 'ing' : 'e'}
								</SickButton>
							</td>
						</tr>
					</Fragment>
				)}
			</Mutation>
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
