import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';

import { mockUser, mockCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';
import { REMOVE_FROM_CART_MUTATION } from '../lib/prismaMutations';
import RemoveFromCart from '../components/RemoveFromCart';

const mocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				me: {
					...mockUser(),
					cart: [mockCartItem({ id: 'ABC123' })],
				},
			},
		},
	},
	{
		request: {
			query: REMOVE_FROM_CART_MUTATION,
			variables: { id: 'ABC123' },
		},
		result: {
			data: {
				removeFromCart: {
					__typename: 'CartItem',
					id: 'ABC123',
				},
			},
		},
	},
];

describe('<RemoveFromCart />', () => {
	it('renders and matches the snapshot', () => {
		const wrapper = mount(
			<MockedProvider>
				<RemoveFromCart id="ABC123" />
			</MockedProvider>
		);

		expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
	});

	it('removes the item from the cart', async () => {
		let apolloClient = null;
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<ApolloConsumer>
					{client => {
						apolloClient = client;
						return <RemoveFromCart id="ABC123" />;
					}}
				</ApolloConsumer>
			</MockedProvider>
		);

		const response = await apolloClient.query({ query: CURRENT_USER_QUERY });
		expect(response.data.me.cart).toHaveLength(1);
		expect(response.data.me.cart[0].item.price).toBe(5000);

		wrapper.find('button').simulate('click');
		await wait();
		const response2 = await apolloClient.query({ query: CURRENT_USER_QUERY });
		expect(response2.data.me.cart).toHaveLength(0);
	});
});
