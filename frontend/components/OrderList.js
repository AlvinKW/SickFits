import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { formatDistance } from 'date-fns';

import { USER_ORDERS_QUERY } from '../lib/prismaQueries';
import formatMoney from '../lib/formatMoney';

import Error from './Error';

const OrderUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(40$, 1fr));
	grid-gap: 4rem;
`;

const StyledOrderItem = styled.li`
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

class OrderList extends Component {
	render() {
		return (
			<Query query={USER_ORDERS_QUERY}>
				{({ data: { orders }, loading, error }) => {
					if (loading) {
						return <p>Loading...</p>;
					} else if (error) {
						return <Error error={error} />;
					}

					return (
						<div>
							<h2>You have {orders.length} order(s).</h2>
							<OrderUl>
								{orders.map(order => (
									<StyledOrderItem key={order.id}>
										<Link href={{ pathname: '/order', query: { id: order.id } }}>
											<a>
												<div className="order-meta">
													<p>
														{order.items.reduce((a, b) => a + b.quantity, 0)} Items
													</p>
													<p>
														{order.items.length} Products
													</p>
													<p>
														{formatDistance(order.createdAt, new Date())}
													</p>
													<p>
														{formatMoney(order.total)}
													</p>
												</div>
												<div className="images">
													{order.items.map(item => (
														<img key={item.id} src={item.image} alt={item.title} />
													))}
												</div>
											</a>
										</Link>
									</StyledOrderItem>
								))}
							</OrderUl>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default OrderList;
