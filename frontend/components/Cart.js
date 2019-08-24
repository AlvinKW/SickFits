import React from 'react';
import styled from 'styled-components';
import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';

import { LOCAL_STATE_QUERY } from '../lib/prismaQueries';
import { TOGGLE_CART_MUTATION } from '../lib/prismaMutations';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';

import User from './User';
import CartItem from './CartItem';
import TakeMyMoney from './TakeMyMoney';
import SickButton from './SickButton';

const StyledCart = styled.div`
	position: fixed;
	display: grid;
	grid-template-rows: auto 1fr auto;
	height: 100%;
	width: 40%;
	min-width: 500px;
	padding: 20px;
	top: 0;
	bottom: 0;
	right: 0;
	box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
	background: white;
	transform: translateX(100%);
	transition: all 0.3s;
	z-index: 5;
	${props => props.open && 'transform: translateX(0);'};

	header {
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 5px solid ${props => props.theme.black};
	}

	footer {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center;
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 10px double ${props => props.theme.black};
		font-size: 3rem;
		font-weight: 900;

		p {
			margin: 0;
		}
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		overflow: scroll;
	}

	@media only screen and (max-width: 600px) {
		min-width: 325px;
	}
`;

const CloseButton = styled.button`
	position: absolute;
	right: 0;
	border: 0;
	font-size: 3rem;
	background: black;
	color: white;
	z-index: 2;
	cursor: pointer;
`;

const Supreme = styled.h3`
	display: inline-block;
	margin: 0;
	padding: 4px 5px;
	font-size: 4rem;
	background: ${props => props.theme.red};
	color: white;
	transform: skew(-3deg);
`;

/* eslint-disable */
const Composed = adopt({
	user: ({ render }) => <User>{render}</User>,
	localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
	toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
});
/* eslint-enable */

function Cart() {
	return (
		<Composed>
			{({ user, localState, toggleCart }) => {
				const me = user.data.me;
				if (!me) { return null; }

				return (
					<StyledCart open={localState.data.cartOpen}>
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
							{me.cart.length && (
								<TakeMyMoney>
									<SickButton>Checkout</SickButton>
								</TakeMyMoney>
							)}
						</footer>
					</StyledCart>
				);
			}}
		</Composed>
	);
}

export default Cart;
