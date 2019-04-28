import styled from 'styled-components';

const OrderItemStyles = styled.li`
	padding: 2rem;
	border: 1px solid ${props => props.theme.offWhite};
	box-shadow: ${props => props.theme.bs};
	list-style: none;

	h2 {
		margin-top: 0;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid red;
	}

	.images {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		margin-top: 1rem;

		img {
			height: 200px;
			width: 100%;
			object-fit: cover;
		}
	}

	.order-meta {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
		grid-gap: 1rem;
		text-align: center;

		& > * {
			margin: 0;
			padding: 1rem 0;
			background: rgba(0, 0, 0, 0.03);
		}

		strong {
			display: block;
			margin-bottom: 1rem;
		}
	}
`;

export default OrderItemStyles;
