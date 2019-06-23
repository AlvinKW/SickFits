import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { REQUEST_RESET_MUTATION } from '../lib/prismaMutations';

import Form from './Form';
import Error from './Error';

class RequestReset extends Component {
	state = { email: '' };

	saveToState = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		return (
			<Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
				{(requestReset, { data, loading, error, called }) => {
					return (
						<Form method="post" onSubmit={async event => {
							event.preventDefault();
							await requestReset();
							this.setState({ email: '' });
						}}>
							<fieldset disabled={loading} aria-busy={loading}>
								<h2>Request A Password Reset</h2>
								<Error error={error} />
								{!error && !loading && called && <p>{data.requestReset.message}</p>}
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
								<button type="submit">Request Reset</button>
							</fieldset>
						</Form>
					);
				}}
			</Mutation>
		);
	}
}

export default RequestReset;
