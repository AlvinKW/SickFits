import ResetPassword from '../components/ResetPassword';

function Reset(props) {
	return (
		<ResetPassword resetToken={props.query.resetToken} />
	);
}

export default Reset;
