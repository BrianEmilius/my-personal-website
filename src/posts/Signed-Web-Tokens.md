---
title: Signed Web Tokens
path: /blog/signed-web-tokens
author: Brian Emilius
twitter: brianemilius
featured_image: ../images/signed-web-tokens.png
description:
tags: ["hmac","sha","hash","JSON"]
categories: ["Kryptografi"]
date: 2018-01-07 14:57:46
---

I dette indlæg vil jeg demonstrere hvordan du kan lave et *signed JSON web token*. Dette er et token, der består af at JSON-objekt og en signatur, som skal forhindre at nogen kan ændre tokenets indhold.

For at komme i gang, skal vi bruge et kryptografi-bibliotek. Jeg bruger node.js' eget `crypto` bibliotek.

```javascript
const crypto = require('crypto');
```

<!-- more -->

Vi skal først bruge en funktion, der opretter en HMAC streng. HMAC er en forkortelse for Hash-based Message Authentication Code. Det er dette, som udgør vores signatur.

```javascript
const createSignature = (message, secret) => crypto.createHmac('sha512', secret).update(message).digest('base64');
```

Vores token data, eller *message* er et simpelt JavScript objekt med noget information. For eksempel:

```javascript
{
    'id': 1,
    'userRole': 'admin'
}
```

For at gøre objektet mere sikker, skal vi bruge lidt ekstra information, såsom en udløbsdatoog en tilfældig streng. Tilfældighed er ofte en god ting at benytte sig af, når man skal kryptere noget.

```javascript
const createTokenData = function (object, validTime) {
    const data = {
        'data': object,
        'expires': (new Date().getTime() + validTime),
        'nonce': (crypto.randomBytes(24).toString('base64'))
    };

    return (JSON.stringify(data)).toString('base64');
};
```

Læg mærke til at alt bliver formateret til `base64`. Dette gør vi, fordi de fleste web tokens bliver overført igennem URLen eller i en HTTP-request header. Base64 er et URL-sikkert format.

Nu har vi vores hjælpefunktioner på plads og vi kan skrive funktionenerne, der skal oprette og validere et token.

```javascript
const Token = function (customObj, secret, validTime) {
	this.customObj = customObj;
	this.secret = secret;
	this.validTime = typeof validTime === 'undefined' || validTime === null || validTime < 0 ? 2592000000 : validTime;
	
	const tokendata64 = createTokenData(this.customObj, this.validTime);

	return `${createSignature(tokendata64, this.secret)}~${tokendata64}`;
};

Token.validate = (token, secret) => {
	const parseToken = (token) => {
		const parts = token.split('~');
		const signature = parts[0];
		const data = parts[1];

		const verifySig = createSignature(data, secret);
		const tokenInformation = {
			'data': JSON.parse(data),
			signature,
			'valid': false
		};

		if (signature === verifySig) {
			tokenInformation.valid = true;
		}
		return tokenInformation;
	};

	const parsed = parseToken(token);

	return parsed.valid && (new Date()).getTime() < parsed.data.expires;
};
```

Pak det hele ind i et closure-modul og eksporter:

```javascript
const crypto = require('crypto');

module.exports = (function () {
    const createSignature = (message, secret) => crypto.createHmac('sha512', secret).update(message).digest('base64');

    const createTokenData = function (object, validTime) {
        const data = {
            'data': object,
            'expires': (new Date().getTime() + validTime),
            'nonce': (crypto.randomBytes(24).toString('base64'))
        };

        return (JSON.stringify(data)).toString('base64');
    };

    const Token = function (customObj, secret, validTime) {
        this.customObj = customObj;
        this.secret = secret;
        this.validTime = typeof validTime === 'undefined' || validTime === null || validTime < 0 ? 2592000000 : validTime;
        
        const tokendata64 = createTokenData(this.customObj, this.validTime);

        return `${createSignature(tokendata64, this.secret)}~${tokendata64}`;
    };

    Token.validate = (token, secret) => {
        const parseToken = (token) => {
            const parts = token.split('~');
            const signature = parts[0];
            const data = parts[1];

            const verifySig = createSignature(data, secret);
            const tokenInformation = {
                'data': JSON.parse(data),
                signature,
                'valid': false
            };

            if (signature === verifySig) {
                tokenInformation.valid = true;
            }
            return tokenInformation;
        };

        const parsed = parseToken(token);

        return parsed.valid && (new Date()).getTime() < parsed.data.expires;
    };

    return {
        Token
    };
}());
```

Og, selvfølgelig, test at det virker:

```javascript
const jwt = require('./signed-jwt.js');
const secret = 'iXytm8N6ZFmcWbCUfHC3u7mDmX4e0M1b';

const myToken = jwt.Token({ 'id': 1, 'role': 'admin' }, secret);

console.log(`Your token: ${myToken}`);

if (jwt.Token.validate(myToken, secret))
	console.log('Your token is valid!');
else
	console.log('Your token is not valid.');
```
