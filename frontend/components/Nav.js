import Link from 'next/link';

import NavStyles from './styles/NavStyles';

function Nav() {
	return (
		<NavStyles>
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
