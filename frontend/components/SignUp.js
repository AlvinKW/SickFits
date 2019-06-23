import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { SIGN_UP_MUTATION } from '../lib/prismaMutations';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';

import Form from './Form';
import Error from './Error';

class SignUp extends Component {
	state = {
		name: '',
		email: '',
		password: '',
	};

	saveToState = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<Mutation
				mutation={SIGN_UP_MUTATION}
				variables={this.state}
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}
			>
				{(signUp, { loading, error }) => (
					<Form method="post" onSubmit={async event => {
						event.preventDefault();
						await signUp();
						this.setState({ name: '', email: '', password: '' });
					}}>
						<fieldset disabled={loading} aria-busy={loading}>
							<h2>Sign Up For An Account</h2>
							<Error error={error} />
							<label htmlFor="name">
								Name
								<input
									type="text"
									name="name"
									placeholder="Name"
									value={this.state.name}
									onChange={this.saveToState}
								/>
							</label>
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
							<button type="submit">Sign Up</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default SignUp;
