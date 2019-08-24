import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

import formatMoney from '../lib/formatMoney';

import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';

const StyledItem = styled.div`
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

const StyledTitle = styled.h3`
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

const StyledPriceTag = styled.span`
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

class Item extends Component {
	render() {
		const { item, permissions } = this.props;
		return (
			<StyledItem>
				{item.image && <img src={item.image} alt={item.title} />}
				<StyledTitle>
					<Link href={{ pathname: '/item', query: { id: item.id } }}>
						<a>{item.title}</a>
					</Link>
				</StyledTitle>
				<StyledPriceTag>{formatMoney(item.price)}</StyledPriceTag>
				<p>{item.description}</p>

				<div className="buttonList">
					{permissions.includes('ADMIN') && (
						<Link href={{ pathname: '/update', query: { id: item.id } }}>
							<a>Edit This Item</a>
						</Link>
					)}
					{permissions.includes('USER') && (
						<AddToCart id={item.id} />
					)}
					{permissions.includes('ADMIN') && (
						<DeleteItem id={item.id}>Delete This Item</DeleteItem>
					)}
				</div>
			</StyledItem>
		);
	}
}

Item.propTypes = {
	item: PropTypes.object.isRequired,
};

export default Item;
