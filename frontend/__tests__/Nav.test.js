import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import toJSON from 'enzyme-to-json';

import { mockUser, mockCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';
import Nav from '../components/Nav';

const notSignedInMocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: { me: null },
		},
	},
];

const signedInMocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: { me: mockUser() },
		},
	},
];

const signedInWithCartItemsMocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: { me: {
				...mockUser(),
				cart: [
					mockCartItem(),
					mockCartItem(),
					mockCartItem(),
				],
			} },
		},
	},
];

describe('<Nav />', () => {
	it('renders a minimal nav when signed out', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<Nav />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const nav = wrapper.find('ul[data-test="nav"]');
		expect(toJSON(nav)).toMatchSnapshot();
	});

	it('renders a full nav when signed in', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedInMocks}>
				<Nav />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const nav = wrapper.find('ul[data-test="nav"]');
		expect(nav.children().length).toBe(5);
		expect(nav.text()).toContain('Sign Out');
	});

	it('renders the amount of items in the cart', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedInWithCartItemsMocks}>
				<Nav />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const nav = wrapper.find('ul[data-test="nav"]');
		const count = nav.find('div.count');
		expect(toJSON(count)).toMatchSnapshot();
	});
});
