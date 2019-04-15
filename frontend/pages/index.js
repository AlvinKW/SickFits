import Items from '../components/Items';

function Index(props) {
	return (
		<Items page={parseFloat(props.query.page) || 1} />
	);
}

export default Index;
