import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RemoveFromCart from './RemoveFromCart';

import formatMoney from '../lib/formatMoney';

const CartItemStyles = styled.li`
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	padding: 1rem 0;
	border-bottom: 1px solid ${props => props.theme.lightGrey};

	img {
		margin-right: 10px;
	}

	h3, p {
		margin: 0;
	}
`;

function CartItem({ cartItem }) {
	if (!cartItem.item) {
		return (
			<CartItemStyles>
				<p>This item has been removed.</p>
				<RemoveFromCart id={cartItem.id} />
			</CartItemStyles>
		);
	}

	return (
		<CartItemStyles>
			<img src={cartItem.item.image} alt={cartItem.item.title} width="100" />
			<div className="cart-item-details">
				<h3>{cartItem.item.title}</h3>
				<p>
					{formatMoney(cartItem.item.price * cartItem.quantity)}
					{' - '}
					<em>
						{cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
					</em>
				</p>
			</div>
			<RemoveFromCart id={cartItem.id} />
		</CartItemStyles>
	);
}

CartItem.propTypes = {
	cartItem: PropTypes.object.isRequired,
};

export default CartItem;
