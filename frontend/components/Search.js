import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import Downshift from 'downshift';
import Router from 'next/router';

import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
	query SEARCH_ITEMS_QUERY($searchTerm: String!) {
		items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
			id
			title
			image
		}
	}
`;

class Search extends Component {
	state = {
		items: [],
		loading: false,
	};

	onChangeHandler = debounce(async (event, client) => {
		this.setState({ loading: true });

		const response = await client.query({
			query: SEARCH_ITEMS_QUERY,
			variables: { searchTerm: event.target.value },
		});

		this.setState({
			items: response.data.items,
			loading: false,
		});
	}, 350);

	render() {
		return (
			<SearchStyles>
				<div>
					<ApolloConsumer>
						{client => (
							<input
								type="search"
								onChange={event => {
									event.persist();
									this.onChangeHandler(event, client);
								}}
							/>
						)}
					</ApolloConsumer>
					<DropDown>
						{this.state.items.map(item => (
							<DropDownItem key={item.id}>
								<img width="50" src={item.image} alt={item.title} />
								{item.title}
							</DropDownItem>
						))}
					</DropDown>
				</div>
			</SearchStyles>
		);
	}
}

export default Search;
