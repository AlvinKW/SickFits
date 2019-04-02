import UpdateItem from '../components/UpdateItem';

function Update({ query }) {
	return (
		<div>
			<UpdateItem id={query.id} />
		</div>
	);
}

export default Update;
