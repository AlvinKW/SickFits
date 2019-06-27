import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';

import { mockUser } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../lib/prismaQueries';
import PleaseSignIn from '../components/PleaseSignIn';

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

describe('<PleaseSignIn />', () => {
	it('renders the sign-in dialog to logged out users', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSignedInMocks}>
				<PleaseSignIn />
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		expect(wrapper.text()).toContain('Sign Into Your Account');
		expect(wrapper.find('SignIn').exists()).toBe(true);
	});

	it('renders the child component when the user is signed in', async () =>{
		function MockChildComponent() {
			return (
				<p>Mock Child Component</p>
			);
		}

		const wrapper = mount(
			<MockedProvider mocks={signedInMocks}>
				<PleaseSignIn>
					<MockChildComponent />
				</PleaseSignIn>
			</MockedProvider>
		);

		await wait();
		wrapper.update();
		expect(wrapper.contains(<MockChildComponent />)).toBe(true);
	});
});
