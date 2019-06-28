import gql from 'graphql-tag';

import { perPage } from '../config';

export const ALL_ITEMS_QUERY = gql`
	query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
		items(orderBy: createdAt_DESC, skip: $skip, first: $first) {
			id
			title
			description
			image
			largeImage
			price
		}
	}
`;

export const ALL_USERS_QUERY = gql`
	query ALL_USERS_QUERY {
		users {
			id
			name
			email
			permissions
		}
	}
`;

export const CURRENT_USER_QUERY = gql`
	query CURRENT_USER_QUERY {
		me {
			id
			name
			email
			permissions
			orders {
				id
			}
			cart {
				id
				quantity
				item {
					id
					title
					description
					image
					price
				}
			}
		}
	}
`;

export const LOCAL_STATE_QUERY = gql`
	query LOCAL_STATE_QUERY {
		cartOpen @client
	}
`;

export const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		itemsConnection {
			aggregate {
				count
			}
		}
	}
`;

export const SEARCH_ITEMS_QUERY = gql`
	query SEARCH_ITEMS_QUERY($searchTerm: String!) {
		items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
			id
			title
			image
		}
	}
`;

export const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		item(where: { id: $id }) {
			id
			title
			description
			largeImage
			price
		}
	}
`;

export const SINGLE_ORDER_QUERY = gql`
	query SINGLE_ORDER_QUERY($id: ID!) {
		order(id: $id) {
			id
			total
			charge
			createdAt
			items {
				id
				title
				description
				image
				price
				quantity
			}
			user {
				id
			}
		}
	}
`;

export const USER_ORDERS_QUERY = gql`
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
