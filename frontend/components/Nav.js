import Link from 'next/link';
import { Mutation } from 'react-apollo';

import User from './User';
import CartCount from './CartCount';
import SignOut from './SignOut';

import NavStyles from './styles/NavStyles';

import { TOGGLE_CART_MUTATION } from './Cart';

function Nav() {
	return (
		<User>
			{({ data: { me } }) => (
				<NavStyles>
					<Link href="/items">
						<a>Shop</a>
					</Link>
					{me && (
						<>
							<Link href="/sell">
								<a>Sell</a>
							</Link>
							<Link href="/orders">
								<a>Orders</a>
							</Link>
							<Mutation mutation={TOGGLE_CART_MUTATION}>
								{toggleCart => (
									<button onClick={toggleCart}>
										My Cart
										<CartCount
											count={me.cart.reduce((tally, cartItem) => {
												return tally + cartItem.quantity;
											}, 0)}
										/>
									</button>
								)}
							</Mutation>
							<SignOut />
						</>
					)}
					{!me && (
						<Link href="/auth">
							<a>Sign In</a>
						</Link>
					)}
				</NavStyles>
			)}
		</User>
	);
}

export default Nav;
