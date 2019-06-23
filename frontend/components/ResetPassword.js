import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import Form from './Form';
import Error from './Error';

import { CURRENT_USER_QUERY } from './User';

const RESET_PASSWORD_MUTATION = gql`
	mutation RESET_PASSWORD_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
		resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
			id
			name
			email
		}
	}
`;

class ResetPassword extends Component {
	state = {
		password: '',
		confirmPassword: '',
	};

	saveToState = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<Mutation
				mutation={RESET_PASSWORD_MUTATION}
				variables={{
					resetToken: this.props.resetToken,
					password: this.state.password,
					confirmPassword: this.state.confirmPassword,
				}}
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}
			>
				{(resetPassword, { loading, error }) => {
					return (
						<Form method="post" onSubmit={async event => {
							event.preventDefault();
							await resetPassword();
							this.setState({ password: '', confirmPassword: '' });
						}}>
							<fieldset disabled={loading} aria-busy={loading}>
								<h2>Reset Your Password Reset</h2>
								<Error error={error} />
								<label htmlFor="password">
									New Password
									<input
										type="password"
										name="password"
										placeholder="Password"
										value={this.state.password}
										onChange={this.saveToState}
									/>
								</label>
								<label htmlFor="confirmPassword">
									Confirm Your New Password
									<input
										type="password"
										name="confirmPassword"
										placeholder="Confirm Password"
										value={this.state.confirmPassword}
										onChange={this.saveToState}
									/>
								</label>
								<button type="submit">Reset Password</button>
							</fieldset>
						</Form>
					);
				}}
			</Mutation>
		);
	}
}

ResetPassword.propTypes = {
	resetToken: PropTypes.string.isRequired,
};

export default ResetPassword;
