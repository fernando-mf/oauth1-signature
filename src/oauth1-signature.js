const qs = require('querystring');
const crypto = require('crypto');

const { makeQueryParams, getRandom, getBaseString } = require('./utils');

const MAX_NONCE = 1000000;

function OAuth1Signature({
	consumerKey,
	consumerSecret,
	method = 'GET',
	queryParams = {},
	url,
	nonce = getRandom(MAX_NONCE),
	unixTimestamp = Math.round(Date.now() / 1000), // current unix timestamp,
}) {
	const oauthParams = {
		...queryParams,
		oauth_consumer_key: consumerKey,
		oauth_nonce: nonce,
		oauth_signature_method: 'HMAC-SHA1',
		oauth_timestamp: unixTimestamp,
		oauth_version: '1.0',
	};

	const params = makeQueryParams(oauthParams);
	const baseString = getBaseString({ method, params, url });

	const oauthSignature = crypto
		.createHmac('SHA1', qs.escape(consumerSecret) + '&')
		.update(baseString, 'utf8')
		.digest('base64');

	const signedParams = {
		...oauthParams,
		oauth_signature: oauthSignature,
	};

	const signedUrl = qs.unescape([url, makeQueryParams(signedParams)].join('?'));

	return {
		params: signedParams,
		signature: oauthSignature,
		url: signedUrl,
	};
}

module.exports = OAuth1Signature;
