---
title: What In Tarnation Are JavaScript Prototypes?
date: 2019-08-14 17:30:00
tags: ["beginners", "JavaScript"]
image: ../images/prototype.jpg
---
A friend of mine asked me the other day about the MDN JavaScript manual.

He noticed something odd when he looked up a function. For example, the title on the page for "forEach" was not "forEach". It was "Array.prototype.forEach".

My friend wanted to know what that prototype thing was all about. This article is about that.

## Primitives
So in JavaScript, we have something called "primitives". [According to MDN](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), a primitive is

> data that is not an object and has no methods. There are 7 primitive data types: string, number, bigint, boolean, null, undefined, and symbol.

But each primitive, except for null and undefined, has something we call a "primitive wrapper object". These are the ones we want to look at.

* `String` is the wrapper object for the primitive `string`,
* `Number` for the `number` primitive,
* `BigInt` for the `bigint` primitive,
* `Boolean` for the `boolean` primitive,
* and finally, `Symbol` for the `symbol` primitive.

Notice that the wrapper objects start with a capital letter (this is !important).

## Objects
All objects in JavaScript have a prototype. This includes objects that are not primitive wrappers, such as "Function", "Array", and "Object".

The prototype of an object is just what you think it is; A prototype for the object.

## Prototypes
Let us take a step back and clear up what a prototype is.

Imagine we have a primitive in JavaScript called "human". The wrapper object would be named "Human".

![A smiling man. The word "Bob" and an arrow that points to the man.](../images/bob.jpg)

The prototype of a Human is filled with properties and methods. For example, a few of the properties of a Human could be

* Eyes: 2
* Ears: 2
* Noses: 1
* Mouths: 1

These are properties that tell us what the Human has - what it is created with and looks like.

The Human prototype also includes methods. These tell us what the Human can do:

* Eat
* Sleep
* Rave

Now imagine this piece of code in JavaScript that won't actually work in real life:

```javascript
var Bob = new Human;
```

Here, we create a variable, `Bob`, which is built upon the Human prototype.

We can now call any of the properties that Human has on Bob:

```javascript
Bob.Eyes // output: 2
Bob.Mouths // output: 1
```

We can also run any method the Human prototype has on Bob:

```javascript
Bob.Eat() // output: Bob probably eats something
Bob.Sleep() // output: Bob sleeps
```

### Back To Actual JavaScript
As with Bob the Human, so it is with primitive wrapper objects in JavaScript.

Let us use `Number` as an example.

The wrapper object `Number` prototype has a bunch of methods we can run on any actual `number` primitive. One I use often is "Number.prototype.toString".

This method converts the number primitive into a string primitive.

```javascript
var myNumber = 42;
console.log(myNumber); // output: 42 <-- a number

var myString = 42.toString();
console.log(myString); // output: "42" <-- a string
```

## Got It! What Now?
There are loads of useful methods you can run on objects. [The MDN manual](https://developer.mozilla.org/en-US/docs/Web/javascript) has them all listed and there are WAY too many to name them here, so go explore!

If you use `console.log()` on a primitive wrapper object you can see the entire list of prototype properties and methods in your browser or console. That's a fun place to start.

<a href="https://www.freepik.com/free-photos-vectors/technology">Cover photo created by kjpargeter - www.freepik.com</a>

<a href="https://www.freepik.com/free-photos-vectors/people">Bob photo created by freepik - www.freepik.com</a>