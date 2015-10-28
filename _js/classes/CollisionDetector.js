import EventEmitter2 from '../vendors/eventemitter2.js';

export default class CollisionDetector extends EventEmitter2{ 
	constructor() {
		super({}); 
	}
	detectCollisions(elements1, elements2) {
		elements1.forEach(element1 => {
			elements2.forEach(element2 => {
				//detecteer collision tussen element1 en element 2
				if (element1.collidesWith(element2)) {
					this.emit('collision', element1, element2);
				};
			})
		})
	}
}