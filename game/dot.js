/* global require */
/* global module */

'use strict';

class Dot {
    
	constructor(x, y) {
		if(!y || y == 'undefined') {
			this._x = 0;
			this._y = 0;
		} else {
			this._x = x;
			this._y = y;
		}
	}

	update(x, y) {
		this._x += x;
		this._y += y;
	}

	get x() {
		return this._x;
	}

	set x(__x) {
		this._x = __x;
	}

	get y() {
		return this._y;
	}

	set y(__y) {
		this._y = __y;
	}

	newCoords(x, y) {
		this._x = x;
		this._y = y;
	}

	get coords() {
		return {
			'x' : this._x,
			'y' : this._y
		};
	}

}

export default Dot;
