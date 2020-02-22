const qs = require('querystring');

function makeQueryParams(params = {}) {
	return Object.entries(params)
		.map(entry => entry.map(qs.escape).join('='))
		.sort()
		.join('&');
}

function getRandom(max) {
	return Math.floor(Math.random() * max);
}

function getBaseString({ url, method, params }) {
	return [method.toUpperCase(), qs.escape(url), qs.escape(params)].join('&');
}

module.exports = {
	getBaseString,
	getRandom,
	makeQueryParams,
};
