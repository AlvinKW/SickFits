import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';

import { mockUser, mockCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY, LOCAL_STATE_QUERY } from '../lib/prismaQueries';
import Cart from '../components/Cart';

const mocks = [
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
			query: LOCAL_STATE_QUERY,
		},
		result: {
			data: {
				cartOpen: true,
			},
		},
	},
];

describe('<Cart />', () => {
	it('renders and matches the snapshot', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Cart />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const header = wrapper.find('header');
		expect(toJSON(header)).toMatchSnapshot();
		expect(wrapper.find('CartItem')).toHaveLength(1);
	});
});
