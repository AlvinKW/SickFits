import React, { Component } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer } from 'react-apollo';

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

function routeToItem(item) {
	Router.push({
		pathname: '/item',
		query: { id: item.id },
	});
}

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
		resetIdCounter();
		return (
			<SearchStyles>
				<Downshift
					onChange={routeToItem}
					itemToString={item => (item === null ? '' : item.title)}
				>
					{({ getInputProps, isOpen, highlightedIndex, getItemProps, inputValue }) => (
						<div>
							<ApolloConsumer>
								{client => (
									<input
										{...getInputProps({
											id: 'search',
											type: 'search',
											placeholder: 'Search For An Item',
											className: this.state.loading ? 'loading' : '',
											onChange: event => {
												event.persist();
												this.onChangeHandler(event, client);
											},
										})}
									/>
								)}
							</ApolloConsumer>
							{isOpen && (
								<DropDown>
									{this.state.items.map((item, index) => (
										<DropDownItem
											key={item.id}
											highlighted={index === highlightedIndex}
											{...getItemProps({ item })}
										>
											<img width="50" src={item.image} alt={item.title} />
											{item.title}
										</DropDownItem>
									))}
									{!this.state.items.length && !this.state.loading && (
										<DropDownItem>
											Nothing Found For {inputValue}
										</DropDownItem>
									)}
								</DropDown>
							)}
						</div>
					)}
				</Downshift>
			</SearchStyles>
		);
	}
}

export default Search;
