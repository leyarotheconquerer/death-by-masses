import Map from '../objects/map.js';
import Robot from '../objects/robot.js';

class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'game' });
		this.map;
		this.player;
	}

	preload() {
		this.map = new Map(this);
		this.player = new Robot(this, 'player', 400, 300);
	}

	create() {
		this.map.create();
		this.player.create();
	}

	update() {
	}
}

export default Game;
