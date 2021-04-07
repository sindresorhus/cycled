import test from 'ava';
import Cycled from './index.js';

const fixture = [1, 2, 3];

test('.current()', t => {
	const cycled = new Cycled(fixture);
	t.is(cycled.current(), 1);
	cycled.next();
	t.is(cycled.current(), 2);
});

test('.next()', t => {
	const cycled = new Cycled(fixture);
	t.deepEqual([cycled.next(), cycled.next(), cycled.next(), cycled.next()], [2, 3, 1, 2]);
});

test('.previous()', t => {
	const cycled = new Cycled(fixture);
	t.deepEqual([cycled.previous(), cycled.previous(), cycled.previous(), cycled.previous()], [3, 2, 1, 3]);
});

test('.step()', t => {
	const cycled = new Cycled(fixture);
	t.is(cycled.step(2), 3);
	t.is(cycled.step(-2), 1);
});

test('.peek()', t => {
	const cycled = new Cycled(fixture);
	t.is(cycled.peek(1), 2);
	t.is(cycled.peek(-2), 2);
});

test('.index', t => {
	const cycled = new Cycled(fixture);
	t.is(cycled.index, 0);
	cycled.index = 2;
	t.is(cycled.index, 2);
	t.is(cycled.current(), 3);
	cycled.index = -7;
	t.is(cycled.index, 2);
	t.is(cycled.current(), 3);
});

test('.indefinitely()', t => {
	const cycled = new Cycled(fixture);
	t.is(cycled.indefinitely().next().value, 2);
});

test('.indefinitelyReversed()', t => {
	const cycled = new Cycled(fixture);
	t.is(cycled.indefinitelyReversed().next().value, 3);
});

test('.indexOf()', t => {
	const cycled = new Cycled(fixture);
	t.is(cycled.indexOf(3), 2);
});

test('iterable', t => {
	const cycled = new Cycled(fixture);
	t.is(cycled[Symbol.iterator]().next().value, 1);
});

test('iterations on destructuring', t => {
	const cycled = new Cycled(fixture);
	t.deepEqual([...cycled], fixture);
	t.deepEqual([...cycled], fixture);
	cycled.next();
	t.deepEqual([...cycled], [2, 3, 1]);
});
