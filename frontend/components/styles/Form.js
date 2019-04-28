import styled, { keyframes } from 'styled-components';

const loading = keyframes`
	from {
		background-position: 0 0;
		/* rotate: 0; */
	}

	to {
		background-position: 100% 100%;
		/* rotate: 360deg; */
	}
`;

const Form = styled.form`
	padding: 20px;
	border: 5px solid white;
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	font-size: 1.5rem;
	font-weight: 600;
	line-height: 1.5;
	background: rgba(0, 0, 0, 0.02);

	label {
		display: block;
		margin-bottom: 1rem;
	}

	input, textarea, select {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid black;
		font-size: 1rem;

		&:focus {
			outline: 0;
			border-color: ${props => props.theme.red};
		}
	}

	button, input[type='submit'] {
		width: auto;
		padding: 0.5rem 1.2rem;
		border: 0;
		font-size: 2rem;
		font-weight: 600;
		background: red;
		color: white;
		cursor: pointer;
	}

	fieldset {
		padding: 0;
		border: 0;

		&[disabled] {
			opacity: 0.5;
		}

		&::before {
			content: '';
			display: block;
			height: 10px;
			background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
		}

		&[aria-busy='true']::before {
			background-size: 50% auto;
			animation: ${loading} 0.5s linear infinite;
		}
	}
`;

export default Form;
