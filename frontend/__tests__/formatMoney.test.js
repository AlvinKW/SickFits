import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
	it('works with fractional dollars', () => {
		expect(formatMoney(1)).toEqual('$0.01');
		expect(formatMoney(10)).toEqual('$0.10');
	});

	it('leaves cents off for whole dollars', () => {
		expect(formatMoney(100)).toEqual('$1');
		expect(formatMoney(1000)).toEqual('$10');
		expect(formatMoney(10000)).toEqual('$100');
		expect(formatMoney(100000)).toEqual('$1,000');
	});

	it('works with whole and fractional dollars', () => {
		expect(formatMoney(101)).toEqual('$1.01');
		expect(formatMoney(1010)).toEqual('$10.10');
	});
});
