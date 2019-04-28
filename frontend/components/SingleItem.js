import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Head from 'next/head';

import Error from './Error';

const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		item(where: { id: $id }) {
			id
			title
			description
			largeImage
		}
	}
`;

const SingleItemStyles = styled.div`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 800px;
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${props => props.theme.bs};

	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}

	.details {
		margin: 3rem;
		font-size: 2rem;
	}
`;

class SingleItem extends Component {
	render() {
		return (
			<Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading, error }) => {
					if (loading) {
						return <p>Loading...</p>;
					} else if (error) {
						return <Error error={error} />;
					} else if (!data.item) {
						return <p>No Item Found for {this.props.id}</p>;
					}

					const item = data.item;
					return (
						<SingleItemStyles>
							<Head>
								<title>Sick Fits | {item.title}</title>
							</Head>
							<img src={item.largeImage} alt={item.title} />
							<div className="details">
								<h2>{item.title}</h2>
								<p>{item.description}</p>
							</div>
						</SingleItemStyles>
					);
				}}
			</Query>
		);
	}
}

export default SingleItem;
