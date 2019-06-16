import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { formatDistance } from 'date-fns';

import Error from './Error';
import OrderItemStyles from './styles/OrderItemStyles';

import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
	query USER_ORDERS_QUERY {
		orders(orderBy: createdAt_DESC) {
			id
			total
			createdAt
			items {
				id
				title
				description
				image
				price
				quantity
			}
		}
	}
`;

const OrderUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(40$, 1fr));
	grid-gap: 4rem;
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
									<OrderItemStyles key={order.id}>
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
									</OrderItemStyles>
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
