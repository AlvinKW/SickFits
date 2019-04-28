import styled from 'styled-components';

const Title = styled.h3`
	margin: 0 1rem;
	margin-top: -3rem;
	text-align: center;
	text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
	transform: skew(-5deg) rotate(-1deg);

	a {
		display: inline;
		padding: 0 1rem;
		font-size: 4rem;
		text-align: center;
		line-height: 1.3;
		background: ${props => props.theme.red};
		color: white;
	}
`;

export default Title;
