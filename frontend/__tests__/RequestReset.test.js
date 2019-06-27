import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';

import { REQUEST_RESET_MUTATION } from '../lib/prismaMutations';
import RequestReset from '../components/RequestReset';

const mocks = [
	{
		request: {
			query: REQUEST_RESET_MUTATION,
			variables: { email: 'kazi_jawad@outlook.com' },
		},
		result: {
			data: {
				requestReset: {
					__typename: 'Message',
					message: 'Check your email for a reset link!',
				},
			},
		},
	},
];

describe('<RequestReset />', () => {
	it('renders and matches the snapshot', async () => {
		const wrapper = mount(
			<MockedProvider>
				<RequestReset />
			</MockedProvider>
		);

		const form = wrapper.find('form[data-test="form"]');
		expect(toJSON(form)).toMatchSnapshot();
	});

	it('calls the mutation', async () => {
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<RequestReset />
			</MockedProvider>
		);

		wrapper.find('input').simulate('change', {
			target: {
				name: 'email',
				value: 'kazi_jawad@outlook.com',
			},
		});
		wrapper.find('form').simulate('submit');

		await wait();
		wrapper.update();
		expect(wrapper.find('p').text()).toContain('Check your email for a reset link!');
	});
});
