# OAuth1 Signature generator

![OAuth1 Signature Generator CI](https://github.com/fernando-mf/oauth1-signature/workflows/OAuth1%20Signature%20Generator%20CI/badge.svg)

Generates a valid signature for OAuth1 protected APIs

## Usage

```javascript
const OAuth1Signature = require('oauth1-signature');

const signature = OAuth1Signature({
	consumerKey: 'yourKey',
	consumerSecret: 'yourSecret',
	method: 'GET',
	url: 'https://www.signature.com',
	queryParams: {
		param1: 'paramValue',
		param2: 'paramValue',
	},
});

const { signature, params } = signature;

// Now you can use the oauth signature, params or url to hit your API
```

`oauthSignature` returns an object that contains:

- signature: the oauth1 signature
- params: the params passed to `oauthSignature` merged with the oauth params
