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
		const scaleFactor = 0.25;
		this.groundLayer.scaleX = scaleFactor;
		this.groundLayer.scaleY = scaleFactor;
		this.spawns = this.map.getObjectLayer('Spawners')
			.objects
			.reduce(
				(spawns, object) => ({
					...spawns,
					[object.type]: [
						...spawns[object.type] != null ?
							spawns[object.type] :
							[],
						{
							x: object.x * scaleFactor,
							y: object.y * scaleFactor
						}
					]
				}),
				{}
			);
	}

	playerSpawn() {
		return this.spawns.PlayerSpawn != null ?
			this.spawns.PlayerSpawn[0] :
			{ x: 400, y: 300 };
	}

	level1meleeSpawns() {
		return this.spawns.Level1Melee != null ?
			this.spawns.Level1Melee :
			[ { x: 500, y: 400 } ]
	}
};

Map.preload = (scene) => {
	scene.load.image('tiles', 'images/Tiles.png');
	scene.load.tilemapTiledJSON('testmap', 'maps/TestMap.json');
};

export default Map;
