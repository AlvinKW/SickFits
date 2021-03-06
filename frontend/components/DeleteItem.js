import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_ITEM_MUTATION } from '../lib/prismaMutations';
import { ALL_ITEMS_QUERY } from '../lib/prismaQueries';

class DeleteItem extends Component {
	updateCache = (cache, payload) => {
		const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
		data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
		cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
	};

	render() {
		return (
			<Mutation
				mutation={DELETE_ITEM_MUTATION}
				variables={{ id: this.props.id }}
				update={this.updateCache}
			>
				{deleteItem => (
					<button onClick={() => {
						if (confirm('Are you sure you want to delete this item?')) {
							deleteItem().catch(error => {
								alert(error.message.replace('GraphQL error: ', ''));
							});
						}
					}}>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}

export default DeleteItem;
