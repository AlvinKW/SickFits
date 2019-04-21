import styled from 'styled-components';

import SignUpForm from '../components/SignUp';

const Columns = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 20px;
`;

function SignUp() {
	return (
		<Columns>
			<SignUpForm />
			<SignUpForm />
			<SignUpForm />
		</Columns>
	);
}

export default SignUp;
