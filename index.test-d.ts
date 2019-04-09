import {expectType} from 'tsd';
import Cycled = require('.');

const cycled = new Cycled([1, 2, 3]);
expectType<Cycled<number>>(cycled);
expectType<number>(cycled.index);
cycled.index = 1;
expectType<number>(cycled.current());
expectType<number>(cycled.next());
expectType<number>(cycled.previous());
expectType<number>(cycled.step(10));
expectType<IterableIterator<number>>(cycled.indefinitely());
expectType<IterableIterator<number>>(cycled.indefinitelyReversed());
expectType<number[]>([...cycled]);

class TabComponent {
	views: Cycled<string>;
	activeView: string;

	constructor(views: string[]) {
		this.activeView = views[0];
		this.views = new Cycled(views);
	}

	setActiveView(view: string) {
		this.activeView = view;
		this.views.index = this.views.indexOf(view);
	}

	nextView() {
		this.setActiveView(this.views.next());
	}

	previousView() {
		this.setActiveView(this.views.previous());
	}
}
