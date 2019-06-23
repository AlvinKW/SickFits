import Link from 'next/link';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import { TOGGLE_CART_MUTATION } from '../lib/prismaMutations';

import User from './User';
import CartCount from './CartCount';
import SignOut from './SignOut';

const StyledNav = styled.ul`
	display: flex;
	justify-self: end;
	margin: 0;
	padding: 0;
	font-size: 2rem;

	@media (max-width: 1300px) {
		justify-content: center;
		width: 100%;
		border-top: 1px solid ${props => props.theme.lightGrey};
		font-size: 1.5rem;
	}

	a, button {
		position: relative;
		display: flex;
		align-items: center;
		padding: 1rem 3rem;
		border: 0;
		font-family: "radnika_next";
		font-size: 1em;
		font-weight: 900;
		text-transform: uppercase;
		background: none;
		color: ${props => props.theme.black};
		cursor: pointer;

		@media (max-width: 700px) {
			padding: 0 10px;
			font-size: 10px;
		}

		&:before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			height: 100%;
			width: 2px;
			background: ${props => props.theme.lightGrey};
			transform: skew(-20deg);
		}

		&:after {
			content: '';
			position: absolute;
			left: 50%;
			height: 2px;
			width: 0;
			margin-top: 2rem;
			background: red;
			transform: translateX(-50%);
			transition: width 0.4s;
			transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
		}

		&:hover, &:focus {
			outline: none;

			@media (max-width: 700px) {
				width: calc(100% - 10px);
			}

			&:after {
				width: calc(100% - 60px);
			}
		}
	}
`;

function Nav() {
	return (
		<User>
			{({ data: { me } }) => (
				<StyledNav>
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
				</StyledNav>
			)}
		</User>
	);
}

export default Nav;
