'use strict';

module.exports = class Cycled {
	constructor(array) {
		if (!Array.isArray(array)) {
			throw new TypeError('Expected an array');
		}

		this._array = array;
		this._index = 0;
	}

	* [Symbol.iterator]() {
		while (true) {
			yield this.next();
		}
	}

	get size() {
		return this._array.length;
	}

	get index() {
		return this._index;
	}

	set index(i) {
		this._index = (this.size + i) % this.size;
	}

	step(steps) {
		this._index = (this.size + this._index + steps) % this.size;
		return this._array[this._index];
	}

	current() {
		return this.step(0);
	}

	next() {
		return this.step(1);
	}

	previous() {
		return this.step(-1);
	}

	get reversed() {
		const _this = this;
		return function * () {
			while (true) {
				yield _this.previous();
			}
		};
	}

	// Proxy some useful array methods
	indexOf(...args) {
		return this._array.indexOf(...args);
	}

	push(...args) {
		return this._array.push(...args);
	}
};
