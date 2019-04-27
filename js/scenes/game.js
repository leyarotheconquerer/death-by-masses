import Map from '../objects/map.js';
import Player from '../objects/player.js';

class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'game' });
		this.map;
	}

	preload() {
		Map.load(this.load);
		this.player = new Player(this);
	}

	create() {
		this.map = Map.create(this.make);
		this.player.create();
	}

	update() {
	}
}

export default Game;
