import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Head from 'next/head';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { SINGLE_ORDER_QUERY } from '../lib/prismaQueries';
import formatMoney from '../lib/formatMoney';

import Error from './Error';

const StyledOrder = styled.div`
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

class Order extends Component {
	render() {
		return (
			<Query
				query={SINGLE_ORDER_QUERY}
				variables={{ id: this.props.id }}
			>
				{({ data, loading, error }) => {
					if (loading) {
						return <p>Loading...</p>;
					} else if (error) {
						return <Error error={error} />;
					}

					const order = data.order;
					return (
						<StyledOrder data-test="order">
							<Head>
								<title>Sick Fits! - Order {order.id}</title>
							</Head>
							<p>
								<span>Order ID:</span>
								<span>{this.props.id}</span>
							</p>
							<p>
								<span>Charge</span>
								<span>{order.charge}</span>
							</p>
							<p>
								<span>Date</span>
								<span>{format(order.createdAt, 'MMMM d, YYYY h:mm a')}</span>
							</p>
							<p>
								<span>Order Total</span>
								<span>{formatMoney(order.total)}</span>
							</p>
							<p>
								<span>Item Count</span>
								<span>{order.items.length}</span>
							</p>
							<div className="items">
								{order.items.map(item => (
									<div className="order-item" key={item.id}>
										<img src={item.image} alt={item.title} />
										<div className="item-details">
											<h2>{item.title}</h2>
											<p>Qty: {item.quantity}</p>
											<p>Each: {formatMoney(item.price)}</p>
											<p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
											<p>{item.description}</p>
										</div>
									</div>
								))}
							</div>
						</StyledOrder>
					);
				}}
			</Query>
		);
	}
}

Order.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Order;
