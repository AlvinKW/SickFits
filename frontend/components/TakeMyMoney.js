import React, { Component } from 'react';
import gql from 'graphql-tag';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';

import Error from './Error';
import User, { CURRENT_USER_QUERY } from './User';

import { stripeKey } from '../config';
import calcTotalPrice from '../lib/calcTotalPrice';

const CREATE_ORDER_MUTATION = gql`
	mutation CREATE_ORDER_MUTATION($token: String!) {
		createOrder(token: $token) {
			id
			total
			charge
			items {
				id
				title
			}
		}
	}
`;

function totalItems(cart) {
	return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends Component {
	onTokenHandler = (response, createOrder) => {
		createOrder({
			variables: { token: response.id },
		}).catch(error => {
			alert(error.message);
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
								image={me.cart[0].item && me.cart[0].item.image}
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
