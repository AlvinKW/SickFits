import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled, { keyframes } from 'styled-components';
import Router from 'next/router';
import debounce from 'lodash.debounce';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer } from 'react-apollo';

const SEARCH_ITEMS_QUERY = gql`
	query SEARCH_ITEMS_QUERY($searchTerm: String!) {
		items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
			id
			title
			image
		}
	}
`;

const StyledDropDown = styled.div`
	position: absolute;
	width: 100%;
	border: 1px solid ${props => props.theme.lightGrey};
	z-index: 2;
`;

const StyledDropDownItem = styled.div`
	display: flex;
	align-items: center;
	padding: 1rem;
	border-bottom: 1px solid ${props => props.theme.lightGrey};
	border-left: 10px solid ${props => (props.highlighted ? props.theme.lightGrey : 'white')};
	background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
	transition: all 0.2s;
	${props => (props.highlighted ? 'padding-left: 2rem;' : null)};

	img {
		margin-right: 10px;
	}
`;

const glow = keyframes`
	from {
		box-shadow: 0 0 0px yellow;
	}

	to {
		box-shadow: 0 0 10px 1px yellow;
	}
`;

const StyledSearch = styled.div`
	position: relative;

	input {
		width: 100%;
		padding: 10px;
		border: 0;
		font-size: 2rem;

		&.loading {
			animation: ${glow} 0.5s ease-in-out infinite alternate;
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
			<StyledSearch>
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
								<StyledDropDown>
									{this.state.items.map((item, index) => (
										<StyledDropDownItem
											key={item.id}
											highlighted={index === highlightedIndex}
											{...getItemProps({ item })}
										>
											<img width="50" src={item.image} alt={item.title} />
											{item.title}
										</StyledDropDownItem>
									))}
									{!this.state.items.length && !this.state.loading && (
										<StyledDropDownItem>
											Nothing Found For {inputValue}
										</StyledDropDownItem>
									)}
								</StyledDropDown>
							)}
						</div>
					)}
				</Downshift>
			</StyledSearch>
		);
	}
}

export default Search;
