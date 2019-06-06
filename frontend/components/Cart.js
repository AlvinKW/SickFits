import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import User from './User';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import CartItem from './CartItem';
import SickButton from './styles/SickButton';

import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

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
		<User>
			{({ data: { me } }) => {
				if (!me) { return null; }
				return (
					<Query query={LOCAL_STATE_QUERY}>
						{({ data }) => (
							<Mutation mutation={TOGGLE_CART_MUTATION}>
								{toggleCart => (
									<CartStyles open={data.cartOpen}>
										<header>
											<CloseButton onClick={toggleCart} title="close">&times;</CloseButton>
											<Supreme>Your Cart</Supreme>
											<p>You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} In Your Cart.</p>
										</header>
										<ul>
											{me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}
										</ul>
										<footer>
											<p>{formatMoney(calcTotalPrice(me.cart))}</p>
											<SickButton>Checkout</SickButton>
										</footer>
									</CartStyles>
								)}
							</Mutation>
						)}
					</Query>
				);
			}}
		</User>
	);
}

export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
export default Cart;
