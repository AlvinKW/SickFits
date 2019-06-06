import styled from 'styled-components';

const Item = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	border: 1px solid ${props => props.theme.offWhite};
	box-shadow: ${props => props.theme.bs};
	background: white;

	img {
		height: 400px;
		width: 100%;
		object-fit: cover;
	}

	p {
		flex-grow: 1;
		padding: 0 3rem;
		font-size: 1.5rem;
		font-weight: 300;
		line-height: 2;
	}

	.buttonList {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-gap: 1px;
		width: 100%;
		border-top: 1px solid ${props => props.theme.lightGrey};
		background: ${props => props.theme.lightGrey};

		& > * {
			padding: 1rem;
			border: 0;
			font-family: "radnika_next";
			font-size: 1rem;
			background: white;
			color: ${props => props.theme.black};
			cursor: pointer;

			&:disabled {
				color: ${props => props.theme.lightGrey};
			}
		}
	}
`;

export default Item;
