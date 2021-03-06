import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';

import { mockOrder } from '../lib/testUtils';
import { SINGLE_ORDER_QUERY } from '../lib/prismaQueries';
import Order from '../components/Order';

const mocks = [
	{
		request: {
			query: SINGLE_ORDER_QUERY,
			variables: { id: 'ord123' },
		},
		result: {
			data: {
				order: mockOrder(),
			},
		},
	},
];

describe('<Order />', () => {
	it('renders and matches the snapshot', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<Order id="ord123" />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const order = wrapper.find('div[data-test="order"]');
		expect(toJSON(order)).toMatchSnapshot();
	});
});
