---
title: So, What's A Block Chain?
path: /blog/so-whats-a-block-chain
author: Brian Emilius
twitter: brianemilius
featured_image: ../images/so-whats-a-block-chain.png
description:
tags: ["JavaScript","node.js","crypto currency","block chain"]
categories: ["Kryptografi","Block Chain"]
date: 2017-12-31 23:28:32
---

I recently decided to dig down into the whole thing about blockchains, because I thought it sounded really interesting. I never actually bothered with trying to understand more than the very basic concept of BitCoin, but until now I also never understood what it actually is.

The core concept behind any crypto currency is something called a *block chain*.

<!-- more -->

A *block* is basically a chunk of information - say, a transaction of BitCoin between two parties. Nothing really special about that, you might think. Well, no. There's nothing special about it. What makes the block chain so special and secure, is that *each block also contains the hash of the previous block*. This is where the chain concept comes in. Having each previous block verify the validity of the next block means that in order for anyone to manipulate any one block in a chain, they must manipulate every single previous block - and replace them in the block chain datastream.

In a block chain such as BitCoin, which currently has close to 550,000 blocks of information, this would mean a massive amount of time to recalculate all the hashes - somewhere around 10.5 years. Since the avarage calculation time of a block hash is roughly 10 minutes, the original block chain would have moved well past the altered branch of a chain.

## So What's In The Chain?
As I mentioned above, the block is basically a chunk of information + the hash value of the previous block. This could be expressed as such:

```json
{
    "hash": "a18408bb1ec7072ff8f19b9e99c1036a1e98d78fd7bb955495eeed90574dae3c",
    "id": "0",
    "timestamp": 1514736606835,
    "data": {
        "message": "Hello, Block Chain! I am the genesis block of this chain."
    }
}
```

In order to create a chain we would first need something called a *genesis block*. Let us just use the one above.

We also need something called *difficulty* and *nonce* to calculate the hash.

And of course functions to generate the hash and the block.

We also need a set of rules that determine whether or not the calculated hash meets our requirements. This is called the *difficulty*.

What we do is, we generate a hash, then we compare it to the difficulty. If the difficulty is not met, then we add a number to the block, generate a new hash, and try again. This number is called the *nonce*. We simply start with a nonce of 0, and then add 1 with every attempt.

Let's say that we want the hash hexidecimal number to be less than or equal to a constant decimal. Now we can determine if a hash is valid or not:

```javascript
const validHash = hash => parseInt(hash, 16) <= 1.6532065611505255e+71;
```

This is not exactly how it's done with BitCoin, but for the sake of this demonstration it will do just fine.

We will also need to create the *genesis block* including it's hash. To generate the hash I will use node.js' crypto library and the hashing algorithm *sha256*.

```javascript
const crypto = require('crypto');

const chain = [];

const initiateChain = () => {
    const index = 0;
    const timestamp = Date.now();
    const data = { 'message': 'Hello, Block Chain! I am the genesis block if this chain.' };
    generateBlock({}, index, timestamp, data);
}

const generateBlock = (previousBlock, index, timestamp, data) => {
    let hash = '';
    let nonce = 0;

    while ( !validHash(hash) ) {
        nonce += 1;
        let input = `${previousBlock}${index}${timestamp}${data}${nonce}`;
        hash = crypto.createHash('sha256').update(input).digest('hex');
    }

    chain.push({
        hash,
        index,
        timestamp,
        data,
        nonce
    });
}
```

Finally, in order to add a new block to the chain, we need to be able to get the last block of the chain and make a function which adds the new block to the chain.

```javascript
const getLastBlock = chain => chain.slice(-1)[0];

const addNewBlock = data => generateBlock(getLastBlock(chain), chain.length, Date.now(), data);

const getChain = () => chain;
```

Let's wrap it all up nicely in a module and expose only the functions needed.

```javascript
const crypto = require('crypto');

module.exports = (function() {
    const chain = [];

    const initiateChain = () => {
        const index = 0;
        const timestamp = Date.now();
        const data = { 'message': 'Hello, Block Chain! I am the genesis block if this chain.' };
        generateBlock({}, index, timestamp, data);
    }

    const generateBlock = (previousBlock, index, timestamp, data) => {
        let hash = '';
        let nonce = 0;

        while ( !validHash(hash) ) {
            nonce += 1;
            let input = `${previousBlock}${index}${timestamp}${data}${nonce}`;
            hash = crypto.createHash('sha256').update(input).digest('hex');
        }

        chain.push({
            hash,
            index,
            timestamp,
            data,
            nonce
        });
    }

    const getLastBlock = chain => chain.slice(-1)[0];

    const validHash = hash => parseInt(hash, 16) <= 1.6532065611505255e+71;

    const addNewBlock = data => generateBlock(getLastBlock(chain), chain.length, Date.now(), data);

    const getChain = () => chain;

    return {
        initiateChain,
        addNewBlock,
        getChain
    }
})();
```

And, of course, test it out:

```javascript
const chain = require('./chain');

chain.initiateChain();

chain.addNewBlock({ 'title': 'Alice In Wonderland' });
chain.addNewBlock({ 'quote': '“But I don’t want to go among mad people," Alice remarked.\n"Oh, you can’t help that," said the Cat: "we’re all mad here. I’m mad. You’re mad."\n"How do you know I’m mad?" said Alice.\n"You must be," said the Cat, "or you wouldn’t have come here.”' });

console.log(chain.getChain());
```

That should output something along the lines of this:

```javascript
[ { hash: '00000959b93d4093ce9275fb4f2388a7aaf247e86b6a5179569e33a3970b4254',
    index: 0,
    timestamp: 1514758633771,
    data:
     { message: 'Hello, Block Chain! I am the genesis block if this chain.' },
    nonce: 91248 },
  { hash: '00000a3ab5bc9556d9650b0dd8d7e170ddc70dcf669d2847e5b1f12eb64abc71',
    index: 1,
    timestamp: 1514758637657,
    data: { title: 'Alice In Wonderland' },
    nonce: 738722 },
  { hash: '0000069125ef74d3e3f358b2228afa70907c96b9a2a9944e3b8d9cf825b1054c',
    index: 2,
    timestamp: 1514758668904,
    data:
     { quote: '“But I don’t want to go among mad people," Alice remarked.\n"Oh, you can’t help that," said the Cat: "we’re all mad here. I’m mad. You’re mad."\n"How do you know I’m mad?" said Alice.\n"You must be," said the Cat, "or you wouldn’t have come here.”' },
    nonce: 137742 } ]
```

3 blocks, each hashed and verified by the previous block in the chain.

If you take a look at the `nonce` value in eacvh block, you can see how many guesses were needed until an appropriate hash could be generated. Remember that really large exponent decimal in the `validHash`-function? The lower that decimal is, the more difficult it is to generate a hash.

I have certainly learned a lot about block chain theory writing this post up. I hope you enjoyed reading it. If you did, or if you found an error or a typo somewhere, please leave a comment and a share below.

I wish you a very happy New Year!
