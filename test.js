import test from 'ava';
import Cycled from '.';

const fixture = [1, 2, 3];

test('.current()', t => {
	const c = new Cycled(fixture);
	t.is(c.current(), 1);
	c.next();
	t.is(c.current(), 2);
});

test('.next()', t => {
	const c = new Cycled(fixture);
	t.deepEqual([c.next(), c.next(), c.next(), c.next()], [2, 3, 1, 2]);
});

test('.previous()', t => {
	const c = new Cycled(fixture);
	t.deepEqual([c.previous(), c.previous(), c.previous(), c.previous()], [3, 2, 1, 3]);
});

test('.step()', t => {
	const c = new Cycled(fixture);
	t.is(c.step(2), 3);
	t.is(c.step(-2), 1);
});

test('.index', t => {
	const c = new Cycled(fixture);
	t.is(c.index, 0);
	c.index = 2;
	t.is(c.index, 2);
	t.is(c.current(), 3);
	c.index = -7;
	t.is(c.index, 2);
	t.is(c.current(), 3);
});

test('.indefinitely()', t => {
	const c = new Cycled(fixture);
	t.is(c.indefinitely().next().value, 2);
});

test('.indefinitelyReversed()', t => {
	const c = new Cycled(fixture);
	t.is(c.indefinitelyReversed().next().value, 3);
});

test('.indexOf()', t => {
	const c = new Cycled(fixture);
	t.is(c.indexOf(3), 2);
});

test('iterable', t => {
	const c = new Cycled(fixture);
	t.is(c[Symbol.iterator]().next().value, 1);
});

test('iterations on destructuring', t => {
	const c = new Cycled(fixture);
	t.deepEqual([...c], fixture);
	t.deepEqual([...c], fixture);
	c.next();
	t.deepEqual([...c], [2, 3, 1]);
});
