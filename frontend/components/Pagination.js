import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';

import { PAGINATION_QUERY } from '../lib/prismaQueries';

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

	@media only screen and (max-width: 600px) {
		& > * {
			padding: 5px 10px;
		}
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
				const pages = Math.ceil(count / process.env.PERPAGE);
				return (
					<StyledPagination data-test="pagination">
						<Head>
							<title>Sick Fits! - Page {page} of {pages}</title>
						</Head>
						<Link prefetch href={{
							pathname: 'items',
							query: { page: page - 1 },
						}}>
							<a className="prev" aria-disabled={page <= 1}>&larr; Prev</a>
						</Link>
						<p>Page {page} of <span className="totalPages">{pages}</span></p>
						<p>{count} Items Total</p>
						<Link prefetch href={{
							pathname: 'items',
							query: { page: page + 1 },
						}}>
							<a className="next" aria-disabled={page >= pages}>Next &rarr;</a>
						</Link>
					</StyledPagination>
				);
			}}
		</Query>
	);
}

export default Pagination;
