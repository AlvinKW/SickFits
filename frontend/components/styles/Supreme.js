import styled from 'styled-components';

const Supreme = styled.h3`
	display: inline-block;
	margin: 0;
	padding: 4px 5px;
	font-size: 4rem;
	background: ${props => props.theme.red};
	color: white;
	transform: skew(-3deg);
`;

export default Supreme;
