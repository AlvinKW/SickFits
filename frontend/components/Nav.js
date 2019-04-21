import Link from 'next/link';

import User from './User';

import NavStyles from './styles/NavStyles';

function Nav() {
	return (
		<NavStyles>
			<User>
				{({ data: { me } }) => {
					if (me) { return <p>{me.name}</p>; }
					return null;
				}}
			</User>
			<Link href="/items">
				<a>Shop</a>
			</Link>
			<Link href="/sell">
				<a>Sell</a>
			</Link>
			<Link href="/signup">
				<a>Sign Up</a>
			</Link>
			<Link href="/orders">
				<a>Orders</a>
			</Link>
			<Link href="/me">
				<a>Me</a>
			</Link>
		</NavStyles>
	);
}

export default Nav;
