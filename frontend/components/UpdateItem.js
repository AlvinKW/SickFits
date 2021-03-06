import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';

import { SINGLE_ITEM_QUERY } from '../lib/prismaQueries';
import { UPDATE_ITEM_MUTATION } from '../lib/prismaMutations';

import Form from './Form';
import Error from './Error';

class UpdateItem extends Component {
	state = {};

	handleUpdateItem = async (e, updateItemMutation) => {
		e.preventDefault();
		console.info('Updating Item...');

		await updateItemMutation({
			variables: {
				id: this.props.id,
				...this.state,
			},
		});
	};

	handleInputChange = e => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;

		this.setState({ [name]: val });
	};

	render() {
		return (
			<Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading }) => {
					if (loading) { return <p>Loading...</p>; }
					if (!data.item) { return <p>No Item Found For ID: {this.props.id}</p>; }
					return (
						<Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
							{(updateItem, { loading, error }) => (
								<Form onSubmit={e => this.handleUpdateItem(e, updateItem)}>
									<Error error={error} />
									<fieldset disabled={loading} aria-busy={loading}>
										<label htmlFor="title">
											Title
											<input
												id="title"
												type="text"
												name="title"
												defaultValue={data.item.title}
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
												defaultValue={data.item.price}
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
												defaultValue={data.item.description}
												onChange={this.handleInputChange}
												placeholder="Enter A Description"
												required
											/>
										</label>
										<button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
									</fieldset>
								</Form>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}

export default UpdateItem;
