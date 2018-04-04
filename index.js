'use strict';

module.exports = class Cycled extends Array {
	constructor(array) {
		if (!Array.isArray(array)) {
			throw new TypeError('Expected an array');
		}

		super(...array);
		this._index = 0;
	}

	* [Symbol.iterator]() {
		let {length} = this;

		while (length-- > 0) {
			yield this.next();
		}
	}

	* indefinitely() {
		while (true) {
			yield this.next();
		}
	}

	get index() {
		return this._index;
	}

	set index(index) {
		this._index = (this.length + (index % this.length)) % this.length;
	}

	step(steps) {
		this._index = (this.length + this._index + steps) % this.length;
		return this[this._index];
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

	* indefinitelyReversed() {
		const _this = this;
		while (true) {
			yield _this.previous();
		}
	}
};
