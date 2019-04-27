class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'game' });
		this.map;
	}

	preload() {
		console.log('Loading');
		this.load.image('tiles', 'images/Tiles.png');
		this.load.tilemapTiledJSON('testmap', 'maps/TestMap.json');
	}

	create() {
		this.map = this.make.tilemap({
			key: 'testmap'
		});
		let tiles = this.map.addTilesetImage('Tiles', 'tiles');
		let layer = this.map.createStaticLayer(0, tiles, 0, 0);
		layer.scaleX = 0.25;
		layer.scaleY = 0.25;
	}

	update() {
	}
}

export default Game;
