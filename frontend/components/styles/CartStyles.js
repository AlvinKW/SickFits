import styled from 'styled-components';

const CartStyles = styled.div`
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
`;

export default CartStyles;
