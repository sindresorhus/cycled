export default class Cycled extends Array {
	#index = 0;

	constructor(array) {
		if (!Array.isArray(array)) {
			throw new TypeError('Expected an array');
		}

		super(...array);
	}

	* [Symbol.iterator]() {
		let {length} = this;

		while (length-- > 0) {
			yield this.current();
			this.index++;
		}
	}

	get index() {
		return this.#index;
	}

	set index(index) {
		this.#index = (this.length + (index % this.length)) % this.length;
	}

	step(steps) {
		this.#index = (this.length + this.#index + steps) % this.length;
		return this[this.#index];
	}

	peek(steps) {
		return this[(this.length + this.#index + steps) % this.length];
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

	* indefinitely() {
		while (true) {
			yield this.next();
		}
	}

	* indefinitelyReversed() {
		while (true) {
			yield this.previous();
		}
	}
}
