import Router from 'next/router';
import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import NProgress from 'nprogress';

import { mockUser, mockCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';
import TakeMyMoney from '../components/TakeMyMoney';

/* eslint-disable */
Router.router = { push() {} };
/* eslint-enable */

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
];

describe('<TakeMyMoney />', () => {
	it('renders and matches the snapshot', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<TakeMyMoney />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const checkoutButton = wrapper.find('ReactStripeCheckout');
		expect(toJSON(checkoutButton)).toMatchSnapshot();
	});

	it('creates an order onToken', () => {
		const mockCreateOrder = jest.fn().mockResolvedValue({
			data: {
				createOrder: {
					id: 'xyz789',
				},
			},
		});
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<TakeMyMoney />
			</MockedProvider>
		);

		const component = wrapper.find('TakeMyMoney').instance();
		component.onTokenHandler({ id: 'ABC123' }, mockCreateOrder);
		expect(mockCreateOrder).toHaveBeenCalled();
		expect(mockCreateOrder).toHaveBeenCalledWith({ variables: { token: 'ABC123' } });
	});

	it('activates the progress bar', async () => {
		const mockCreateOrder = jest.fn().mockResolvedValue({
			data: {
				createOrder: {
					id: 'xyz789',
				},
			},
		});
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<TakeMyMoney />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		NProgress.start = jest.fn();

		const component = wrapper.find('TakeMyMoney').instance();
		component.onTokenHandler({ id: 'ABC123' }, mockCreateOrder);
		expect(NProgress.start).toHaveBeenCalled();
	});

	it('routes to the order page once finished', async () => {
		const mockCreateOrder = jest.fn().mockResolvedValue({
			data: {
				createOrder: {
					id: 'xyz789',
				},
			},
		});
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<TakeMyMoney />
			</MockedProvider>
		);

		await wait();
		wrapper.update();

		const component = wrapper.find('TakeMyMoney').instance();
		Router.router.push = jest.fn();
		component.onTokenHandler({ id: 'ABC123' }, mockCreateOrder);

		await wait();
		expect(Router.router.push).toHaveBeenCalled();
		expect(Router.router.push).toHaveBeenCalledWith({
			pathname: '/order',
			query: {
				id: 'xyz789',
			},
		});
	});
});
