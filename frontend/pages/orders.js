import PleaseSignIn from '../components/PleaseSignIn';
import OrderList from '../components/OrderList';

function Sell() {
	return (
		<div>
			<PleaseSignIn>
				<OrderList />
			</PleaseSignIn>
		</div>
	);
}

export default Sell;
