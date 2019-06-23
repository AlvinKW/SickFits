import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import { ALL_ITEMS_QUERY } from './Items';

import Form from './Form';
import Error from './Error';

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

	uploadFile = async e => {
		console.info('Uploading File...');
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'sickfits');

		const response = await fetch('https://api.cloudinary.com/v1_1/kazijawad/image/upload', {
			method: 'POST',
			body: data,
		});

		const file = await response.json();
		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url,
		});
	};

	render() {
		return (
			<Mutation
				mutation={CREATE_ITEM_MUTATION}
				variables={this.state}
				refetchQueries={[{ query: ALL_ITEMS_QUERY }]}
			>
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
							<label htmlFor="file">
								Image
								<input
									id="file"
									type="file"
									name="file"
									onChange={this.uploadFile}
									placeholder="Upload An Image"
									required
								/>
								{this.state.image && <img src={this.state.image} alt="Upload Preview" />}
							</label>
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
