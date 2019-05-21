const Level1Melee = {};

Level1Melee.images = {
	walk: [
		{ name: "level1meleewalk00", file: "walk/frame0000.png" },
		{ name: "level1meleewalk01", file: "walk/frame0001.png" },
		{ name: "level1meleewalk02", file: "walk/frame0002.png" },
		{ name: "level1meleewalk03", file: "walk/frame0003.png" },
		{ name: "level1meleewalk04", file: "walk/frame0004.png" },
		{ name: "level1meleewalk05", file: "walk/frame0005.png" },
		{ name: "level1meleewalk06", file: "walk/frame0006.png" },
		{ name: "level1meleewalk07", file: "walk/frame0007.png" },
		{ name: "level1meleewalk08", file: "walk/frame0008.png" },
		{ name: "level1meleewalk09", file: "walk/frame0009.png" },
		{ name: "level1meleewalk10", file: "walk/frame0010.png" },
		{ name: "level1meleewalk11", file: "walk/frame0011.png" },
		{ name: "level1meleewalk12", file: "walk/frame0012.png" },
		{ name: "level1meleewalk13", file: "walk/frame0013.png" },
		{ name: "level1meleewalk14", file: "walk/frame0014.png" },
		{ name: "level1meleewalk15", file: "walk/frame0015.png" },
		{ name: "level1meleewalk16", file: "walk/frame0016.png" },
		{ name: "level1meleewalk17", file: "walk/frame0017.png" },
		{ name: "level1meleewalk18", file: "walk/frame0018.png" },
		{ name: "level1meleewalk19", file: "walk/frame0019.png" },
		{ name: "level1meleewalk20", file: "walk/frame0020.png" },
		{ name: "level1meleewalk21", file: "walk/frame0021.png" },
		{ name: "level1meleewalk22", file: "walk/frame0022.png" },
		{ name: "level1meleewalk23", file: "walk/frame0023.png" }
	],
	attack: [
		{ name: "level1meleeattack00", file: "attack/frame0000.png" },
		{ name: "level1meleeattack01", file: "attack/frame0001.png" },
		{ name: "level1meleeattack02", file: "attack/frame0002.png" },
		{ name: "level1meleeattack03", file: "attack/frame0003.png" },
		{ name: "level1meleeattack04", file: "attack/frame0004.png" },
		{ name: "level1meleeattack05", file: "attack/frame0005.png" },
		{ name: "level1meleeattack06", file: "attack/frame0006.png" },
		{ name: "level1meleeattack07", file: "attack/frame0007.png" },
		{ name: "level1meleeattack08", file: "attack/frame0008.png" },
		{ name: "level1meleeattack09", file: "attack/frame0009.png" },
		{ name: "level1meleeattack10", file: "attack/frame0010.png" },
		{ name: "level1meleeattack11", file: "attack/frame0011.png" },
		{ name: "level1meleeattack12", file: "attack/frame0012.png" },
		{ name: "level1meleeattack13", file: "attack/frame0013.png" },
		{ name: "level1meleeattack14", file: "attack/frame0014.png" },
		{ name: "level1meleeattack15", file: "attack/frame0015.png" },
		{ name: "level1meleeattack16", file: "attack/frame0016.png" },
		{ name: "level1meleeattack17", file: "attack/frame0017.png" },
		{ name: "level1meleeattack18", file: "attack/frame0018.png" },
		{ name: "level1meleeattack19", file: "attack/frame0019.png" },
		{ name: "level1meleeattack20", file: "attack/frame0020.png" },
		{ name: "level1meleeattack21", file: "attack/frame0021.png" },
		{ name: "level1meleeattack22", file: "attack/frame0022.png" },
		{ name: "level1meleeattack23", file: "attack/frame0023.png" }
	]
}

const base = {
	name: 'level1-melee',
	health: {
		total: 10
	},
	weapon: {
		animation: 'attack',
		start: 0.2,
		end: 0.6,
		damage: 1
	},
	controller: {
		type: 'controller',
	},
	sprite: {
		idle: 'idle',
		walk: 'walk',
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
		'level1melee-idle': {
			frameRate: 24,
			frames: Level1Melee.images.walk.map(frame => ({ key: frame.name })),
			repeat: Phaser.FOREVER
		},
		'level1melee-walk': {
			frameRate: 24,
			frames: Level1Melee.images.walk.map(frame => ({ key: frame.name })),
			repeat: Phaser.FOREVER
		},
		'level1melee-attack': {
			frameRate: 24,
			frames: Level1Melee.images.attack.map(frame => ({ key: frame.name })),
			repeat: 0
		},
	}
};

Level1Melee.config = {
	player: {
		...base,
		name: 'level1melee-player',
		weapon: {
			...base.weapon,
			animation: 'level1melee-attack',
			damage: 2
		},
		controller: {
			...base.controller,
			type: 'player'
		},
		sprite: {
			...base.sprite,
			tint: 0x11ff11,
			idle: 'level1melee-idle',
			walk: 'level1melee-walk'
		}
	},
	ally: {
		...base,
		name: 'level1melee-ally',
		weapon: {
			...base.weapon,
			animation: 'level1melee-attack',
		},
		controller: {
			...base.controller,
			type: 'aimelee',
			detect: {
				radius: 250,
				offset: { x: -230, y: -210 },
				rate: 1
			},
			attack: {
				radius: 80,
				rate: 0.5
			}
		},
		sprite: {
			...base.sprite,
			tint: 0x1111ff,
			idle: 'level1melee-idle',
			walk: 'level1melee-walk'
		}
	},
	enemy: {
		...base,
		name: 'level1melee-enemy',
		weapon: {
			...base.weapon,
			animation: 'level1melee-attack',
		},
		controller: {
			...base.controller,
			type: 'aimelee',
			detect: {
				radius: 250,
				offset: { x: -230, y: -210 },
				rate: 1
			},
			attack: {
				radius: 80,
				rate: 0.5
			}
		},
		sprite: {
			...base.sprite,
			tint: 0xff1111,
			idle: 'level1melee-idle',
			walk: 'level1melee-walk'
		}
	}
};

Level1Melee.preload = (scene) => {
	for (let sequence in Level1Melee.images) {
		for (let index in Level1Melee.images[sequence]) {
			let image = Level1Melee.images[sequence][index];
			scene.load.image(image.name, `images/level1melee/${image.file}`);
		}
	}
}

export default Level1Melee;
