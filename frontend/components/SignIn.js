import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { SIGN_IN_MUTATION } from '../lib/prismaMutations';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';

import Form from './Form';
import Error from './Error';

class SignIn extends Component {
	state = {
		email: '',
		password: '',
	};

	saveToState = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<Mutation
				mutation={SIGN_IN_MUTATION}
				variables={this.state}
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}
			>
				{(signIn, { loading, error }) => (
					<Form method="post" onSubmit={async event => {
						event.preventDefault();
						await signIn();
						this.setState({ email: '', password: '' });
					}}>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Sign Into Your Account</h2>
							<Error error={error} />
							<label htmlFor="email">
								Email
								<input
									type="email"
									name="email"
									placeholder="E-Mail"
									value={this.state.email}
									onChange={this.saveToState}
								/>
							</label>
							<label htmlFor="password">
								Password
								<input
									type="password"
									name="password"
									placeholder="Password"
									value={this.state.password}
									onChange={this.saveToState}
								/>
							</label>
							<button type="submit">Sign In</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default SignIn;
