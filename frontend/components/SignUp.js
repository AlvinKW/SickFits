import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
		signUp(name: $name, email: $email, password: $password) {
			id
			name
			email
		}
	}
`;

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
			<Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
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
