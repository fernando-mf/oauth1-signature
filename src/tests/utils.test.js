const { makeQueryParams, getRandom, getBaseString } = require('../utils');

describe('makeQueryParams', () => {
	test('should return an empty string if no input', () => {
		expect(makeQueryParams()).toBe('');
	});

	test('should return a valid query string', () => {
		const params = {
			bar: 'first',
			baz: 'second',
			foo: 'third',
		};

		const expected = 'bar=first&baz=second&foo=third';

		expect(makeQueryParams(params)).toBe(expected);
	});

	test('should sort the keys and return a valid query string', () => {
		const params = {
			foo: 'third',
			baz: 'second',
			bar: 'first',
		};

		const expected = 'bar=first&baz=second&foo=third';

		expect(makeQueryParams(params)).toBe(expected);
	});

	test('should encode the keys and values and preserver the =', () => {
		const params = {
			foo: '%',
			baz: '/',
			bar: '$',
		};

		const expected = 'bar=%24&baz=%2F&foo=%25';

		expect(makeQueryParams(params)).toBe(expected);
	});
});

describe('getRandom', () => {
	test('should respect the max value', () => {
		expect(getRandom(1000)).toBeLessThanOrEqual(1000);
	});
});

describe('getBaseString', () => {
	test('should return a valid oauth base string', () => {
		const input = {
			method: 'get',
			params: 'bar=first&baz=second&foo=third',
			url: 'https://www.test.com',
		};

		const expected =
			'GET&https%3A%2F%2Fwww.test.com&bar%3Dfirst%26baz%3Dsecond%26foo%3Dthird';

		expect(getBaseString(input)).toBe(expected);
	});
});
