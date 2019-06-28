import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';

import { mockUser, mockCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';
import { ADD_TO_CART_MUTATION } from '../lib/prismaMutations';
import AddToCart from '../components/AddToCart';

const mocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				me: {
					...mockUser(),
					cart: [],
				},
			},
		},
	},
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				me: {
					...mockUser(),
					cart: [mockCartItem()],
				},
			},
		},
	},
	{
		request: {
			query: ADD_TO_CART_MUTATION,
			variables: { id: 'ABC123' },
		},
		result: {
			data: {
				addToCart: {
					...mockCartItem(),
					quantity: 1,
				},
			},
		},
	},
];

describe('<AddToCart />', () => {
	it('renders and matches the snapshot', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<AddToCart id="ABC123" />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
	});

	it('adds an item to the cart when clicked', async () => {
		let apolloClient = null;
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<ApolloConsumer>
					{client => {
						apolloClient = client;
						return <AddToCart id="ABC123" />;
					}}
				</ApolloConsumer>
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const { data: { me } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
		expect(me.cart).toHaveLength(0);

		wrapper.find('button').simulate('click');
		await wait();
		const { data: { me: me2 } } = await apolloClient.query({ query: CURRENT_USER_QUERY });
		expect(me2.cart).toHaveLength(1);
		expect(me2.cart[0].id).toBe('ABC123');
		expect(me2.cart[0].quantity).toBe(3);
	});

	it('changes loading state when clicked', async () => {
		const wrapper = mount(
			<MockedProvider>
				<AddToCart id="ABC123" />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		expect(wrapper.text()).toContain('Add To Cart');

		wrapper.find('button').simulate('click');
		expect(wrapper.text()).toContain('Adding To Cart');
	});
});
