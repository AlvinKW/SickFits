import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
	mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
		removeFromCart(id: $id) {
			id
		}
	}
`;

const StyledButton = styled.button`
	border: none;
	font-size: 3rem;
	background: none;

	&:hover {
		color: ${props => props.theme.red};
		cursor: pointer;
	}
`;

class RemoveFromCart extends Component {
	render() {
		return (
			<Mutation
				mutation={REMOVE_FROM_CART_MUTATION}
				variables={{ id: this.props.id }}
			>
				{(removeFromCart, { loading }) => (
					<StyledButton
						title="Delete Item"
						disabled={loading}
						onClick={() => {
							removeFromCart().catch(error => alert(error.message));
						}}
					>
						&times;
					</StyledButton>
				)}
			</Mutation>
		);
	}
}

RemoveFromCart.propTypes = {
	id: PropTypes.string.isRequired,
};

export default RemoveFromCart;
