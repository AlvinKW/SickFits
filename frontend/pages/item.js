import SingleItem from '../components/SingleItem';

function Item(props) {
	return (
		<SingleItem id={props.query.id} />
	);
}

export default Item;
