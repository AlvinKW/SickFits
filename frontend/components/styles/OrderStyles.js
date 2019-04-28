import styled from 'styled-components';

const OrderStyles = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	padding: 2rem;
	border: 1px solid ${props => props.theme.offWhite};
	border-top: 10px solid red;
	box-shadow: ${props => props.theme.bs};

	& > p {
		display: grid;
		grid-template-columns: 1fr 5fr;
		margin: 0;
		border-bottom: 1px solid ${props => props.theme.offWhite};

		span {
			padding: 1rem;

			&:first-child {
				font-weight: 900;
				text-align: right;
			}
		}
	}

	.order-item {
		display: grid;
		grid-template-columns: 300px 1fr;
		grid-gap: 2rem;
		align-items: center;
		margin: 2rem 0;
		padding-bottom: 2rem;
		border-bottom: 1px solid ${props => props.theme.offWhite};

		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}
`;
export default OrderStyles;
