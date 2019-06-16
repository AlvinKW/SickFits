import PleaseSignIn from '../components/PleaseSignIn';
import SingleOrder from '../components/Order';

function Order(props) {
	return (
		<div>
			<PleaseSignIn>
				<SingleOrder id={props.query.id} />
			</PleaseSignIn>
		</div>
	);
}

export default Order;
