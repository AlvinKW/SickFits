import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import NProgress from 'nprogress';
import Router from 'next/router';

import { stripeKey } from '../config';
import { CREATE_ORDER_MUTATION } from '../lib/prismaMutations';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';
import calcTotalPrice from '../lib/calcTotalPrice';

import User from './User';

function totalItems(cart) {
	return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends Component {
	onTokenHandler = async (response, createOrder) => {
		NProgress.start();

		const order = await createOrder({
			variables: { token: response.id },
		}).catch(error => {
			alert(error.message);
		});

		Router.push({
			pathname: '/order',
			query: { id: order.data.createOrder.id },
		});
	};

	render() {
		return (
			<User>
				{({ data: { me } }) => (
					<Mutation
						mutation={CREATE_ORDER_MUTATION}
						refetchQueries={[{ query: CURRENT_USER_QUERY }]}
					>
						{createOrder => (
							<StripeCheckout
								name="Sick Fits"
								description={`Order of ${totalItems(me.cart)} items`}
								image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
								amount={calcTotalPrice(me.cart)}
								currency="USD"
								stripeKey={stripeKey}
								email={me.email}
								token={response => this.onTokenHandler(response, createOrder)}
							>
								{this.props.children}
							</StripeCheckout>
						)}
					</Mutation>
				)}
			</User>
		);
	}
}

export default TakeMyMoney;
