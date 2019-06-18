import { shallow } from 'enzyme';
import Item from '../components/Item';

const mockItem = {
	id: 'ABC123',
	title: 'A Cool Item',
	description: 'This item is really cool!',
	image: 'dog.jpg',
	largeImage: 'largeDog.jpg',
	price: 5000,
};

describe('<Item />', () => {
	it('renders the price-tag and title', () => {
		const wrapper = shallow(<Item item={mockItem} />);

		const PriceTag = wrapper.find('PriceTag');
		expect(PriceTag.children().text()).toBe('$50');

		expect(wrapper.find('Title a').text()).toBe(mockItem.title);
	});

	it('renders the image', () => {
		const wrapper = shallow(<Item item={mockItem} />);

		const img = wrapper.find('img');
		expect(img.props().src).toBe(mockItem.image);
		expect(img.props().alt).toBe(mockItem.title);
	});

	it('renders the buttons', () => {
		const wrapper = shallow(<Item item={mockItem} />);

		const buttonList = wrapper.find('.buttonList');
		expect(buttonList.children()).toHaveLength(3);

		expect(buttonList.find('Link')).toHaveLength(1);
		expect(buttonList.find('AddToCart')).toHaveLength(1);
		expect(buttonList.find('DeleteItem')).toHaveLength(1);
	});
});
