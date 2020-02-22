const signature = require('../oauth1-signature');

const params = {
	consumerKey: 'consumerKey',
	consumerSecret: 'consumerSecret',
	unixTimestamp: 1582326295,
	method: 'get',
	url: 'https://signature.com',
	nonce: 'qxBuOTgTb1I',
	queryParams: {
		format: 'json',
		location: 'ca',
	},
};

describe('OAuth1 signature', () => {
	test('should return a valid signature', () => {
		const actual = signature(params);

		const expectedSignature = 'Y+tPzgo+M06XZFBDJMJvX2FH64U=';

		expect(actual.oauthSignature).toBe(expectedSignature);
	});

	test('should return a valid signed url', () => {
		const actual = signature(params);

		const expectedUrl =
			'https://signature.com?format=json&location=ca&oauth_consumer_key=consumerKey&oauth_nonce=qxBuOTgTb1I&oauth_signature=Y+tPzgo+M06XZFBDJMJvX2FH64U=&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1582326295&oauth_version=1.0';

		expect(actual.url).toBe(expectedUrl);
	});

	test('should return the initial query params merged with the oauth params', () => {
		const actual = signature(params);

		const expectedParams = {
			...params.queryParams,
			oauth_consumer_key: 'consumerKey',
			oauth_nonce: 'qxBuOTgTb1I',
			oauth_signature_method: 'HMAC-SHA1',
			oauth_timestamp: 1582326295,
			oauth_version: '1.0',
			oauth_signature: 'Y+tPzgo+M06XZFBDJMJvX2FH64U=',
		};

		expect(actual.params).toEqual(expectedParams);
	});
});
