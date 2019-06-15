import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import Error from './Error';
import User, { CURRENT_USER_QUERY } from './User';

import { stripeKey } from '../config';
import calcTotalPrice from '../lib/calcTotalPrice';

function totalItems(cart) {
	return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends Component {
	onTokenHandler = response => {
		console.log(response.id);
	};

	render() {
		return (
			<User>
				{({ data: { me } }) => (
					<StripeCheckout
						name="Sick Fits"
						description={`Order of ${totalItems(me.cart)} items`}
						image={me.cart[0].item && me.cart[0].item.image}
						amount={calcTotalPrice(me.cart)}
						currency="USD"
						stripeKey={stripeKey}
						email={me.email}
						token={response => this.onTokenHandler(response)}
					>
						{this.props.children}
					</StripeCheckout>
				)}
			</User>
		);
	}
}

export default TakeMyMoney;
