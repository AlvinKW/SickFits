import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import NProgress from 'nprogress';

import Nav from './Nav';
import Cart from './Cart';

Router.onRouteChangeStart = () => {
	NProgress.start();
};

Router.onRouteChangeComplete = () => {
	NProgress.done();
};

Router.onRouteChangeError = () => {
	NProgress.done();
};

const Logo = styled.h1`
	position: relative;
	margin-left: 2rem;
	font-size: 4rem;
	transform: skew(-7deg);
	z-index: 2;

	@media (max-width: 1300px) {
		margin: 0;
		text-align: center;
	}

	a {
		padding: 0.5rem 1rem;
		text-transform: uppercase;
		text-decoration: none;
		background: ${props => props.theme.red};
		color: white;
	}
`;

const StyledHeader = styled.header`
	.bar {
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: space-between;
		align-items: stretch;
		border-bottom: 10px solid ${props => props.theme.black};

		@media (max-width: 1300px) {
			grid-template-columns: 1fr;
			justify-content: center;
		}
	}

	.sub-bar {
		display: grid;
		grid-template-columns: 1fr auto;
		border-bottom: 1px solid ${props => props.theme.lightGrey};
	}
`;

function Header() {
	return (
		<StyledHeader>
			<div className="bar">
				<Logo>
					<Link href="/">
						<a>Sick Fits</a>
					</Link>
				</Logo>
				<Nav />
			</div>
			<div className="sub-bar">
				<p>Search</p>
			</div>
			<Cart />
		</StyledHeader>
	);
}

export default Header;
