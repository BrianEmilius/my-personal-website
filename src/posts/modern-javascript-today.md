---
title: Modern JavaScript Today
path: /blog/modern-javascript-today
date: 2018-08-10 09:12:15
author: Brian Emilius
twitter: brianemilius
tags: ["babel.js","node.js","es6 modules"]
categories: ["Guides"]
---
JavaScript is a language that evolves at a break-neck pace. Within a few years we have gotten custom elements and ES6 modules.

As a developer, it can sometimes be difficult to keep up. It can be even more difficult to write applications in a way that is both modern, future proof, and works on all or most of the current platforms that likely are not ready for many of the new features.

I would argue that this leads some developers to write their applications without new technologies. This is undesirable.

There are many ways to get started using new technologies and at the same time make sure your applications are supported on the platforms required. Even those that not yet support the new tech.

A good example of this is ES6 modules and Node.js.

Today, with Node.js version 10.8.0, it is still not possible to use this syntax.

`module.js`
```javascript
export const foo = function () {
	return 'Hello, World!';
};
```

`app.js`
```javascript
import { foo } from './module';

console.log(foo());
```

But with a little help from a library called `babel.js`, we can transpile our modern JavaScript applications such that they are compatible with all older versions of the Node.js runtime.

## Babel.js
Babel.js is a library that can transpile different kinds of languages into regular compatible versions. For example, Babel.js can transpile SASS or LESS into CSS and handle vendor prefixes so that the finished document is compatible back to Internet Explorer 6.

The advantage of this is that we can write code and make use of cutting edge technology without worrying whether it is compatible with the platforms on which we need to run our applications.

With Node.js this means we can use ES6 modules even though they are not yet supported.

## Setup
This requires some configuration. I use `NPM` and this is my setup when I need to use Babel.js in conjunction with Node.js.

First, we will need to install a few NPM packages.
- babel-cli
- babel-core
- babel-preset-es2015-node5
- babel-preset-stage-3
- babel-register

You can install the packages in your project with the following command
```
$ npm install --save-dev babel-cli babel-core babel-preset-es2015-node5 babel-preset-stage-3 babel-register
```

Once we have installed we need to create a few start scripts. I use two different scripts. One for running my application in development mode and one to build my finished for distribution.

Place this in `package.json`:
```json
"scripts": {
    "dev": "babel-node app.js",
    "build": "babel . -d .dist --ignore=\"node_modules\""
}
```

When I execute `$npm run dev` Babel.js transpiles my ES6 modules on-the-fly.

I use `$ npm run build` when I am done with my application. This command creates a new folder (`.dist`) which contains all my transpiled code. It is this folder I distribute to my production environment.