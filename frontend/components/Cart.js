import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';

const LOCAL_STATE_QUERY = gql`
	query LOCAL_STATE_QUERY {
		cartOpen @client
	}
`;

const TOGGLE_CART_MUTATION = gql`
	mutation TOGGLE_CART_MUTATION {
		toggleCart @client
	}
`;

function Cart() {
	return (
		<Query query={LOCAL_STATE_QUERY}>
			{({ data }) => (
				<Mutation mutation={TOGGLE_CART_MUTATION}>
					{toggleCart => (
						<CartStyles open={data.cartOpen}>
							<header>
								<CloseButton onClick={toggleCart} title="close">&times;</CloseButton>
								<Supreme>Your Cart</Supreme>
								<p>You Have __ Items In Your Cart.</p>
							</header>
							<footer>
								<p>$10.50</p>
								<SickButton>Checkout</SickButton>
							</footer>
						</CartStyles>
					)}
				</Mutation>
			)}
		</Query>
	);
}

export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
export default Cart;
