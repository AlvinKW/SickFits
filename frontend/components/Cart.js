import React from 'react';

import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import SickButton from './styles/SickButton';

function Cart() {
	return (
		<CartStyles open>
			<header>
				<CloseButton title="close">&times;</CloseButton>
				<Supreme>Your Cart</Supreme>
				<p>You Have __ Items In Your Cart.</p>
			</header>
			<footer>
				<p>$10.50</p>
				<SickButton>Checkout</SickButton>
			</footer>
		</CartStyles>
	);
}

export default Cart;
