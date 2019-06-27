import Router from 'next/router';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';

import { PAGINATION_QUERY } from '../lib/prismaQueries';
import Pagination from '../components/Pagination';

/* eslint-disable */
Router.router = {
	push() {},
	prefetch() {},
};
/* eslint-enable */

function makeMocksFor(length) {
	return [
		{
			request: {
				query: PAGINATION_QUERY,
			},
			result: {
				data: {
					itemsConnection: {
						__typename: 'aggregate',
						aggregate: {
							__typename: 'count',
							count: length,
						},
					},
				},
			},
		},
	];
}

describe('<Pagination />', () => {
	it('renders a loading message', () => {
		const wrapper = mount(
			<MockedProvider mocks={makeMocksFor(1)}>
				<Pagination page={1} />
			</MockedProvider>
		);

		expect(wrapper.text()).toContain('Loading...');
	});

	it('renders pagination for 15 items', async () => {
		const wrapper = mount(
			<MockedProvider mocks={makeMocksFor(15)}>
				<Pagination page={1} />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const totalPages = wrapper.find('.totalPages').text();
		expect(totalPages).toEqual('4');
	});

	it('disables prev button on first page', async () => {
		const wrapper = mount(
			<MockedProvider mocks={makeMocksFor(15)}>
				<Pagination page={1} />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const prevButton = wrapper.find('a.prev').prop('aria-disabled');
		const nextButton = wrapper.find('a.next').prop('aria-disabled');
		expect(prevButton).toEqual(true);
		expect(nextButton).toEqual(false);
	});

	it('disables next button on last page', async () => {
		const wrapper = mount(
			<MockedProvider mocks={makeMocksFor(15)}>
				<Pagination page={4} />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const prevButton = wrapper.find('a.prev').prop('aria-disabled');
		const nextButton = wrapper.find('a.next').prop('aria-disabled');
		expect(prevButton).toEqual(false);
		expect(nextButton).toEqual(true);
	});

	it('enables all buttons on a middle page', async () => {
		const wrapper = mount(
			<MockedProvider mocks={makeMocksFor(15)}>
				<Pagination page={2} />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		const prevButton = wrapper.find('a.prev').prop('aria-disabled');
		const nextButton = wrapper.find('a.next').prop('aria-disabled');
		expect(prevButton).toEqual(false);
		expect(nextButton).toEqual(false);
	});
});
