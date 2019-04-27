class Map {
	constructor(scene) {
		scene.load.image('tiles', 'images/Tiles.png');
		scene.load.tilemapTiledJSON('testmap', 'maps/TestMap.json');
		this.scene = scene;
		this.map;
		this.tiles;
		this.groundLayer;
	}

	create() {
		this.map = this.scene.make.tilemap({
			key: 'testmap'
		});
		this.tiles = this.map.addTilesetImage('Tiles', 'tiles');
		this.groundLayer = this.map.createStaticLayer(0, this.tiles);
		this.groundLayer.scaleX = 0.25;
		this.groundLayer.scaleY = 0.25;
	}
};

export default Map;
