export default {
	load: (load) => {
		load.image('tiles', 'images/Tiles.png');
		load.tilemapTiledJSON('testmap', 'maps/TestMap.json');
	},
	create: (make) => {
		let map = make.tilemap({
			key: 'testmap'
		});
		let tiles = map.addTilesetImage('Tiles', 'tiles');
		let layer = map.createStaticLayer(0, tiles);
		layer.scaleX = 0.25;
		layer.scaleY = 0.25;
		return { map, tiles, layer };
	}
};
