import Link from 'next/link';

import User from './User';

import NavStyles from './styles/NavStyles';

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
							<Link href="/me">
								<a>Account</a>
							</Link>
						</>
					)}
					{!me && (
						<Link href="/signup">
							<a>Sign Up</a>
						</Link>
					)}
				</NavStyles>
			)}
		</User>
	);
}

export default Nav;
