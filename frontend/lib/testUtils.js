import casual from 'casual';

casual.seed(777);

const mockItem = () => ({
	__typename: 'Item',
	id: 'abc123',
	price: 5000,
	user: null,
	image: 'dog-small.jpg',
	title: 'Dogs are the best!',
	description: 'Dogs',
	largeImage: 'dog.jpg',
});

const mockUser = () => ({
	__typename: 'User',
	id: '4234',
	name: casual.name,
	email: casual.email,
	permissions: ['ADMIN'],
	orders: [],
	cart: [],
});

const mockOrderItem = () => ({
	__typename: 'OrderItem',
	id: casual.uuid,
	image: `${casual.word}.jpg`,
	title: casual.words(),
	price: 4234,
	quantity: 1,
	description: casual.words(),
});

const mockOrder = () => ({
	__typename: 'Order',
	id: 'ord123',
	charge: 'ch_123',
	total: 40000,
	items: [mockOrderItem(), mockOrderItem()],
	createdAt: '2018-04 - 06T19: 24: 16.000Z',
	user: mockUser(),
});

const mockCartItem = overrides => ({
	__typename: 'CartItem',
	id: 'omg123',
	quantity: 3,
	item: mockItem(),
	user: mockUser(),
	...overrides,
});

class MockLocalStorage {
	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getItem(key) {
		return this.store[key] || null;
	}

	setItem(key, value) {
		this.store[key] = value.toString();
	}

	removeItem(key) {
		delete this.store[key];
	}
}

export {
	MockLocalStorage,
	mockItem,
	mockUser,
	mockCartItem,
	mockOrder,
	mockOrderItem,
};
