import styled from 'styled-components';

const PriceTag = styled.span`
	position: absolute;
	display: inline-block;
	top: -3px;
	right: -3px;
	padding: 5px;
	font-size: 3rem;
	font-weight: 600;
	line-height: 1;
	background: ${props => props.theme.red};
	color: white;
	transform: rotate(3deg);
`;

export default PriceTag;
