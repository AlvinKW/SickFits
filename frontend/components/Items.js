import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import { ALL_ITEMS_QUERY } from '../lib/prismaQueries';

import User from './User';
import Pagination from './Pagination';
import Item from './Item';

const Center = styled.div`
	text-align: center;
`;

const ItemsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	justify-items: center;
	max-width: ${props => props.theme.maxWidth};
	margin: 0 auto;

	@media only screen and (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

class Items extends Component {
	render() {
		return (
			<User>
				{({ data: { me } }) => {
					if (me === null) {
						me = { permissions: [] };
					}

					return (
						<Center>
							<Pagination page={this.props.page} />
							<Query query={ALL_ITEMS_QUERY} variables={{
								skip: this.props.page * process.env.PERPAGE - process.env.PERPAGE,
							}}>
								{({ data, loading, error }) => {
									if (loading) {
										return <p>Loading...</p>;
									} else if (error) {
										return <p>Error: {error.message}</p>;
									} else {
										return (
											<ItemsList>
												{data.items.map(item => {
													return <Item key={item.id} item={item} permissions={me && me.permissions} />;
												})}
											</ItemsList>
										);
									}
								}}
							</Query>
							<Pagination page={this.props.page} />
						</Center>
					);
				}}
			</User>
		);
	}
}

export default Items;
