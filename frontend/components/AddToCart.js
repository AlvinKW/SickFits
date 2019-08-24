import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { ADD_TO_CART_MUTATION } from '../lib/prismaMutations';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';

class AddToCart extends Component {
	render() {
		return (
			<Mutation
				mutation={ADD_TO_CART_MUTATION}
				variables={{ id: this.props.id }}
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}
			>
				{(addToCart, { loading, error }) => {
					if (error) {
						alert(error.message.replace('GraphQL error: ', ''));
					}

					return (
						<button disabled={loading} onClick={addToCart}>
							Add{loading && 'ing'} To Cart
						</button>
					);
				}}
			</Mutation>
		);
	}
}

export default AddToCart;
