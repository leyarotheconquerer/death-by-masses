const Level1Melee = {};

Level1Melee.images = {
	walk: [
		{ name: "playerwalk00", file: "walk/frame0000.png" },
		{ name: "playerwalk01", file: "walk/frame0001.png" },
		{ name: "playerwalk02", file: "walk/frame0002.png" },
		{ name: "playerwalk03", file: "walk/frame0003.png" },
		{ name: "playerwalk04", file: "walk/frame0004.png" },
		{ name: "playerwalk05", file: "walk/frame0005.png" },
		{ name: "playerwalk06", file: "walk/frame0006.png" },
		{ name: "playerwalk07", file: "walk/frame0007.png" },
		{ name: "playerwalk08", file: "walk/frame0008.png" },
		{ name: "playerwalk09", file: "walk/frame0009.png" },
		{ name: "playerwalk10", file: "walk/frame0010.png" },
		{ name: "playerwalk11", file: "walk/frame0011.png" },
		{ name: "playerwalk12", file: "walk/frame0012.png" },
		{ name: "playerwalk13", file: "walk/frame0013.png" },
		{ name: "playerwalk14", file: "walk/frame0014.png" },
		{ name: "playerwalk15", file: "walk/frame0015.png" },
		{ name: "playerwalk16", file: "walk/frame0016.png" },
		{ name: "playerwalk17", file: "walk/frame0017.png" },
		{ name: "playerwalk18", file: "walk/frame0018.png" },
		{ name: "playerwalk19", file: "walk/frame0019.png" },
		{ name: "playerwalk20", file: "walk/frame0020.png" },
		{ name: "playerwalk21", file: "walk/frame0021.png" },
		{ name: "playerwalk22", file: "walk/frame0022.png" },
		{ name: "playerwalk23", file: "walk/frame0023.png" }
	],
	attack: [
		{ name: "playerattack00", file: "attack/frame0000.png" },
		{ name: "playerattack01", file: "attack/frame0001.png" },
		{ name: "playerattack02", file: "attack/frame0002.png" },
		{ name: "playerattack03", file: "attack/frame0003.png" },
		{ name: "playerattack04", file: "attack/frame0004.png" },
		{ name: "playerattack05", file: "attack/frame0005.png" },
		{ name: "playerattack06", file: "attack/frame0006.png" },
		{ name: "playerattack07", file: "attack/frame0007.png" },
		{ name: "playerattack08", file: "attack/frame0008.png" },
		{ name: "playerattack09", file: "attack/frame0009.png" },
		{ name: "playerattack10", file: "attack/frame0010.png" },
		{ name: "playerattack11", file: "attack/frame0011.png" },
		{ name: "playerattack12", file: "attack/frame0012.png" },
		{ name: "playerattack13", file: "attack/frame0013.png" },
		{ name: "playerattack14", file: "attack/frame0014.png" },
		{ name: "playerattack15", file: "attack/frame0015.png" },
		{ name: "playerattack16", file: "attack/frame0016.png" },
		{ name: "playerattack17", file: "attack/frame0017.png" },
		{ name: "playerattack18", file: "attack/frame0018.png" },
		{ name: "playerattack19", file: "attack/frame0019.png" },
		{ name: "playerattack20", file: "attack/frame0020.png" },
		{ name: "playerattack21", file: "attack/frame0021.png" },
		{ name: "playerattack22", file: "attack/frame0022.png" },
		{ name: "playerattack23", file: "attack/frame0023.png" }
	]
};
Level1Melee.config = {
	name: 'level1-melee',
	health: {
		total: 10
	},
	weapon: {
		animation: 'playerattack',
		start: 0.2,
		end: 0.6,
		damage: 1
	},
	sprite: {
		idle: 'playerwalk',
		walk: 'playerwalk',
		scale: { x: 0.5, y: 0.5 },
		circle: {
			radius: 40,
			offset: { x: 84, y: 140 }
		}
	},
	hitbox: {
		size: { w: 60, h: 90 },
		offset: { x: -14, y: -30 }
	},
	animations: {
		playerwalk: {
			frameRate: 24,
			frames: Level1Melee.images.walk.map(image => ({ key: image.name })),
			repeat: Phaser.FOREVER
		},
		playerattack: {
			frameRate: 24,
			frames: Level1Melee.images.attack.map(image => ({ key: image.name })),
			repeat: 0
		},
	}
};

Level1Melee.preload = (scene) => {
	for (let sequence in Level1Melee.images) {
		for (let index in Level1Melee.images[sequence])
		{
			let image = Level1Melee.images[sequence][index];
			scene.load.image(image.name, `images/robot/${image.file}`);
		}
	}
}

export default Level1Melee;
