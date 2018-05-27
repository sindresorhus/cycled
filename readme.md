# cycled [![Build Status](https://travis-ci.org/sindresorhus/cycled.svg?branch=master)](https://travis-ci.org/sindresorhus/cycled)

> Cycle through the items of an array

This package can be useful for cycling through tabs, images of a slideshows, etc.


## Install

```
$ npm install cycled
```

<a href="https://www.patreon.com/sindresorhus">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>


## Usage

```js
const Cycled = require('cycled');

const cycled = new Cycled([1, 2, 3]);

cycled.current();
//=> 1

cycled.next();
//=> 2

cycled.next();
//=> 3

cycled.next();
//=> 1

cycled.previous();
//=> 3
```


## API

### `cycled = new Cycled(input)`

Initiates an array subclass with the methods documented below. Since it's an array, you can use all the normal array methods on it.

#### input

Type: `Array`

### cycled

The instance is an iterable that will cycle through the array. It will cycle through the number of elements equaling the length of the array from the current index.

```js
const numberCycle = new Cycled([1,2,3,4,5]);

console.log(...numberCycle);
//=> 2 3 4 5 1
```

#### current()

Returns the current item.

#### next()

Returns the next item.

#### previous()

Returns the previous item.

#### step(steps)

Returns the item by going the given amount of `steps` through the array. For example, calling `steps(2)` is like calling `next()` twice. You go backward by specifying a negative number.

#### index

Get or set the current index.

#### indefinitely()

Returns an iterable that will cycle through the array indefinitely.

#### indefinitelyReversed()

Returns an iterable that will cycle through the array backward indefinitely.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
