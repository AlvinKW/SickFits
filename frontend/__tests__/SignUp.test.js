import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { ApolloConsumer } from 'react-apollo';

import { mockUser } from '../lib/testUtils';
import { SIGN_UP_MUTATION } from '../lib/prismaMutations';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';
import SignUp from '../components/SignUp';

function type(wrapper, name, value) {
	wrapper.find(`input[name="${name}"]`).simulate('change', {
		target: { name, value },
	});
}

const me = mockUser();
const mocks = [
	{
		request: {
			query: SIGN_UP_MUTATION,
			variables: {
				name: me.name,
				email: me.email,
				password: 'password',
			},
		},
		result: {
			data: {
				signUp: {
					__typename: 'User',
					id: 'ABC123',
					name: me.name,
					email: me.email,
				},
			},
		},
	},
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: { me },
		},
	},
];

describe('<SignUp />', () => {
	it('renders and matches the snapshot', () => {
		const wrapper = mount(
			<MockedProvider>
				<SignUp />
			</MockedProvider>
		);

		const form = wrapper.find('form');
		expect(toJSON(form)).toMatchSnapshot();
	});

	it('calls the mutation properly', async () => {
		let apolloClient = null;
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<ApolloConsumer>
					{client => {
						apolloClient = client;
						return <SignUp />;
					}}
				</ApolloConsumer>
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		type(wrapper, 'name', me.name);
		type(wrapper, 'email', me.email);
		type(wrapper, 'password', 'password');

		wrapper.update();
		wrapper.find('form').simulate('submit');

		await wait();
		const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
		expect(user.data.me).toMatchObject(me);
	});
});
