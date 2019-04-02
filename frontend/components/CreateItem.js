import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION (
		$title: String!
		$description: String!
		$image: String
		$largeImage: String
		$price: Int!
	) {
		createItem(
			title: $title
			description: $description
			image: $image
			largeImage: $largeImage
			price: $price
		) {
			id
		}
	}
`;

class CreateItem extends Component {
	state = {
		title: '',
		description: '',
		image: '',
		largeImage: '',
		price: 0,
	};

	handleInputChange = e => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;

		this.setState({ [name]: val });
	};

	render() {
		return (
			<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
				{(createItem, { loading, error }) => (
					<Form onSubmit={async e => {
						e.preventDefault();

						const response = await createItem();
						Router.push({
							pathname: '/item',
							query: { id: response.data.createItem.id },
						});
					}}>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="title">
								Title
								<input
									id="title"
									type="text"
									name="title"
									value={this.state.title}
									onChange={this.handleInputChange}
									placeholder="Title"
									required
								/>
							</label>
							<label htmlFor="price">
								Price
								<input
									id="price"
									type="number"
									name="price"
									value={this.state.price}
									onChange={this.handleInputChange}
									placeholder="Price"
									required
								/>
							</label>
							<label htmlFor="description">
								Description
								<textarea
									id="description"
									name="description"
									value={this.state.description}
									onChange={this.handleInputChange}
									placeholder="Enter A Description"
									required
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export { CREATE_ITEM_MUTATION };
export default CreateItem;
