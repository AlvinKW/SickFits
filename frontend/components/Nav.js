import Link from 'next/link';

import User from './User';
import SignOut from './SignOut';

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
							<Link href="/account">
								<a>Account</a>
							</Link>
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
