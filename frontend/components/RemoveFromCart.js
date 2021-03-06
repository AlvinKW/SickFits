import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import { REMOVE_FROM_CART_MUTATION } from '../lib/prismaMutations';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';

const StyledButton = styled.button`
	border: none;
	font-size: 3rem;
	background: none;

	&:hover {
		color: ${props => props.theme.red};
		cursor: pointer;
	}
`;

class RemoveFromCart extends Component {
	update = (cache, payload) => {
		const data = cache.readQuery({ query: CURRENT_USER_QUERY });
		const cartItemID = payload.data.removeFromCart.id;

		data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemID);
		cache.writeQuery({ query: CURRENT_USER_QUERY, data });
	};

	render() {
		return (
			<Mutation
				mutation={REMOVE_FROM_CART_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}
				optimisticResponse={{
					__typename: 'Mutation',
					removeFromCart: {
						__typename: 'CartItem',
						id: this.props.id,
					},
				}}
			>
				{(removeFromCart, { loading }) => (
					<StyledButton
						title="Delete Item"
						disabled={loading}
						onClick={() => {
							removeFromCart().catch(error => alert(error.message));
						}}
					>
						&times;
					</StyledButton>
				)}
			</Mutation>
		);
	}
}

RemoveFromCart.propTypes = {
	id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
