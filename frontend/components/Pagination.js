import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';

import { perPage } from '../config';

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		itemsConnection {
			aggregate {
				count
			}
		}
	}
`;

const StyledPagination = styled.div`
	display: inline-grid;
	grid-template-columns: repeat(4, auto);
	justify-content: center;
	align-items: stretch;
	align-content: center;
	margin: 2rem 0;
	border: 1px solid ${props => props.theme.lightGrey};
	border-radius: 10px;
	text-align: center;

	& > * {
		margin: 0;
		padding: 15px 30px;
		border-right: 1px solid ${props => props.theme.lightGrey};

		&:last-child {
			border-right: 0;
		}
	}

	a[aria-disabled='true'] {
		color: grey;
		pointer-events: none;
	}
`;

function Pagination(props) {
	return (
		<Query query={PAGINATION_QUERY}>
			{({ data, loading }) => {
				if (loading) {
					return <p>Loading...</p>;
				}

				const count = data.itemsConnection.aggregate.count;
				const page = props.page;
				const pages = Math.ceil(count / perPage);
				return (
					<StyledPagination>
						<Head>
							<title>Sick Fits! - Page {page} of {pages}</title>
						</Head>
						<Link prefetch href={{
							pathname: 'items',
							query: { page: page - 1 },
						}}>
							<a className="prev" aria-disabled={page <= 1}>&larr; Prev</a>
						</Link>
						<p>Page {page} of {pages}</p>
						<p>{count} Items Total</p>
						<Link prefetch href={{
							pathname: 'items',
							query: { page: page + 1 },
						}}>
							<a className="prev" aria-disabled={page >= pages}>Next &rarr;</a>
						</Link>
					</StyledPagination>
				);
			}}
		</Query>
	);
}

export default Pagination;
