class Map {
	constructor(scene) {
		this.scene = scene;
		this.map;
		this.tiles;
		this.groundLayer;

		this.map = this.scene.make.tilemap({
			key: 'testmap'
		});
		this.tiles = this.map.addTilesetImage('Tiles', 'tiles');
		this.groundLayer = this.map.createStaticLayer(0, this.tiles);
		this.groundLayer.scaleX = 0.25;
		this.groundLayer.scaleY = 0.25;
	}
};

Map.preload = (scene) => {
	scene.load.image('tiles', 'images/Tiles.png');
	scene.load.tilemapTiledJSON('testmap', 'maps/TestMap.json');
};

export default Map;
