import Router from 'next/router';
import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';

import { mockItem } from '../lib/testUtils';
import { CREATE_ITEM_MUTATION } from '../lib/prismaMutations';
import { ALL_ITEMS_QUERY } from '../lib/prismaQueries';
import CreateItem from '../components/CreateItem';

const dogImage = 'https://dog.com/dog.jpg';

global.fetch = jest.fn().mockResolvedValue({
	json: () => ({
		secure_url: dogImage,
		eager: [{ secure_url: dogImage }],
	}),
});

describe('<CreateItem />', () => {
	it('renders and matches the snapshot', () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem />
			</MockedProvider>
		);

		const form = wrapper.find('form[data-test="form"]');
		expect(toJSON(form)).toMatchSnapshot();
	});

	it('uploads a file when changed', async () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem />
			</MockedProvider>
		);

		const input = wrapper.find('input[type="file"]');
		input.simulate('change', { target: { files: ['mockDog.jpg'] } });

		await wait();
		const component = wrapper.find('CreateItem').instance();
		expect(component.state.image).toEqual(dogImage);
		expect(component.state.largeImage).toEqual(dogImage);
		expect(global.fetch).toHaveBeenCalled();

		global.fetch.mockReset();
	});

	it('handles state updates', async () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem />
			</MockedProvider>
		);

		wrapper.find('#title').simulate('change', { target: { value: 'Title', name: 'title' } });
		wrapper.find('#description').simulate('change', { target: { value: 'Description', name: 'description' } });
		wrapper.find('#price').simulate('change', { target: { value: 50000, name: 'price', type: 'number' } });

		const component = wrapper.find('CreateItem').instance();
		expect(component.state).toMatchObject({
			title: 'Title',
			description: 'Description',
			price: 50000,
		});
	});

	it('creates an item when the form is submitted', async () => {
		const item = mockItem();
		const mocks = [
			{
				request: {
					query: CREATE_ITEM_MUTATION,
					variables: {
						title: item.title,
						description: item.description,
						image: '',
						largeImage: '',
						price: item.price,
					},
				},
				result: {
					data: {
						createItem: {
							...mockItem(),
							__typename: 'Item',
							id: 'ABC123',
						},
					},
				},
			},
			{
				request: {
					query: ALL_ITEMS_QUERY,
				},
				result: {
					data: {
						items: [],
					},
				},
			},
			{
				request: {
					query: ALL_ITEMS_QUERY,
				},
				result: {
					data: {
						items: [{
							__typename: item.__typename,
							id: item.id,
							title: item.title,
							description: item.description,
							image: item.image,
							largeImage: item.largeImage,
							price: item.price,
						}],
					},
				},
			},
		];

		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<CreateItem />
			</MockedProvider>
		);

		wrapper.find('#title').simulate('change', { target: { value: item.title, name: 'title' } });
		wrapper.find('#description').simulate('change', { target: { value: item.description, name: 'description' } });
		wrapper.find('#price').simulate('change', { target: { value: item.price, name: 'price', type: 'number' } });

		Router.router = { push: jest.fn() };
		wrapper.find('form').simulate('submit');
		await wait(50);
		expect(Router.router.push).toHaveBeenCalled();
		expect(Router.router.push).toHaveBeenCalledWith({
			pathname: '/item',
			query: { id: 'ABC123' },
		});
	});
});
