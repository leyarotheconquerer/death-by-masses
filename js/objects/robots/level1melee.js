const Level1Melee = {};

Level1Melee.images = {
	enemy: {
		walk: [
			{ name: "enemywalk00", file: "walk/frame0000.png" },
			{ name: "enemywalk01", file: "walk/frame0001.png" },
			{ name: "enemywalk02", file: "walk/frame0002.png" },
			{ name: "enemywalk03", file: "walk/frame0003.png" },
			{ name: "enemywalk04", file: "walk/frame0004.png" },
			{ name: "enemywalk05", file: "walk/frame0005.png" },
			{ name: "enemywalk06", file: "walk/frame0006.png" },
			{ name: "enemywalk07", file: "walk/frame0007.png" },
			{ name: "enemywalk08", file: "walk/frame0008.png" },
			{ name: "enemywalk09", file: "walk/frame0009.png" },
			{ name: "enemywalk10", file: "walk/frame0010.png" },
			{ name: "enemywalk11", file: "walk/frame0011.png" },
			{ name: "enemywalk12", file: "walk/frame0012.png" },
			{ name: "enemywalk13", file: "walk/frame0013.png" },
			{ name: "enemywalk14", file: "walk/frame0014.png" },
			{ name: "enemywalk15", file: "walk/frame0015.png" },
			{ name: "enemywalk16", file: "walk/frame0016.png" },
			{ name: "enemywalk17", file: "walk/frame0017.png" },
			{ name: "enemywalk18", file: "walk/frame0018.png" },
			{ name: "enemywalk19", file: "walk/frame0019.png" },
			{ name: "enemywalk20", file: "walk/frame0020.png" },
			{ name: "enemywalk21", file: "walk/frame0021.png" },
			{ name: "enemywalk22", file: "walk/frame0022.png" },
			{ name: "enemywalk23", file: "walk/frame0023.png" }
		],
		attack: [
			{ name: "enemyattack00", file: "attack/frame0000.png" },
			{ name: "enemyattack01", file: "attack/frame0001.png" },
			{ name: "enemyattack02", file: "attack/frame0002.png" },
			{ name: "enemyattack03", file: "attack/frame0003.png" },
			{ name: "enemyattack04", file: "attack/frame0004.png" },
			{ name: "enemyattack05", file: "attack/frame0005.png" },
			{ name: "enemyattack06", file: "attack/frame0006.png" },
			{ name: "enemyattack07", file: "attack/frame0007.png" },
			{ name: "enemyattack08", file: "attack/frame0008.png" },
			{ name: "enemyattack09", file: "attack/frame0009.png" },
			{ name: "enemyattack10", file: "attack/frame0010.png" },
			{ name: "enemyattack11", file: "attack/frame0011.png" },
			{ name: "enemyattack12", file: "attack/frame0012.png" },
			{ name: "enemyattack13", file: "attack/frame0013.png" },
			{ name: "enemyattack14", file: "attack/frame0014.png" },
			{ name: "enemyattack15", file: "attack/frame0015.png" },
			{ name: "enemyattack16", file: "attack/frame0016.png" },
			{ name: "enemyattack17", file: "attack/frame0017.png" },
			{ name: "enemyattack18", file: "attack/frame0018.png" },
			{ name: "enemyattack19", file: "attack/frame0019.png" },
			{ name: "enemyattack20", file: "attack/frame0020.png" },
			{ name: "enemyattack21", file: "attack/frame0021.png" },
			{ name: "enemyattack22", file: "attack/frame0022.png" },
			{ name: "enemyattack23", file: "attack/frame0023.png" }
		]
	},
	ally: {
		walk: [
			{ name: "allywalk00", file: "walk/frame0000.png" },
			{ name: "allywalk01", file: "walk/frame0001.png" },
			{ name: "allywalk02", file: "walk/frame0002.png" },
			{ name: "allywalk03", file: "walk/frame0003.png" },
			{ name: "allywalk04", file: "walk/frame0004.png" },
			{ name: "allywalk05", file: "walk/frame0005.png" },
			{ name: "allywalk06", file: "walk/frame0006.png" },
			{ name: "allywalk07", file: "walk/frame0007.png" },
			{ name: "allywalk08", file: "walk/frame0008.png" },
			{ name: "allywalk09", file: "walk/frame0009.png" },
			{ name: "allywalk10", file: "walk/frame0010.png" },
			{ name: "allywalk11", file: "walk/frame0011.png" },
			{ name: "allywalk12", file: "walk/frame0012.png" },
			{ name: "allywalk13", file: "walk/frame0013.png" },
			{ name: "allywalk14", file: "walk/frame0014.png" },
			{ name: "allywalk15", file: "walk/frame0015.png" },
			{ name: "allywalk16", file: "walk/frame0016.png" },
			{ name: "allywalk17", file: "walk/frame0017.png" },
			{ name: "allywalk18", file: "walk/frame0018.png" },
			{ name: "allywalk19", file: "walk/frame0019.png" },
			{ name: "allywalk20", file: "walk/frame0020.png" },
			{ name: "allywalk21", file: "walk/frame0021.png" },
			{ name: "allywalk22", file: "walk/frame0022.png" },
			{ name: "allywalk23", file: "walk/frame0023.png" }
		],
		attack: [
			{ name: "allyattack00", file: "attack/frame0000.png" },
			{ name: "allyattack01", file: "attack/frame0001.png" },
			{ name: "allyattack02", file: "attack/frame0002.png" },
			{ name: "allyattack03", file: "attack/frame0003.png" },
			{ name: "allyattack04", file: "attack/frame0004.png" },
			{ name: "allyattack05", file: "attack/frame0005.png" },
			{ name: "allyattack06", file: "attack/frame0006.png" },
			{ name: "allyattack07", file: "attack/frame0007.png" },
			{ name: "allyattack08", file: "attack/frame0008.png" },
			{ name: "allyattack09", file: "attack/frame0009.png" },
			{ name: "allyattack10", file: "attack/frame0010.png" },
			{ name: "allyattack11", file: "attack/frame0011.png" },
			{ name: "allyattack12", file: "attack/frame0012.png" },
			{ name: "allyattack13", file: "attack/frame0013.png" },
			{ name: "allyattack14", file: "attack/frame0014.png" },
			{ name: "allyattack15", file: "attack/frame0015.png" },
			{ name: "allyattack16", file: "attack/frame0016.png" },
			{ name: "allyattack17", file: "attack/frame0017.png" },
			{ name: "allyattack18", file: "attack/frame0018.png" },
			{ name: "allyattack19", file: "attack/frame0019.png" },
			{ name: "allyattack20", file: "attack/frame0020.png" },
			{ name: "allyattack21", file: "attack/frame0021.png" },
			{ name: "allyattack22", file: "attack/frame0022.png" },
			{ name: "allyattack23", file: "attack/frame0023.png" }
		]

	}
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
		idle: {
			frameRate: 24,
			frames: 0,
			repeat: Phaser.FOREVER
		},
		walk: {
			frameRate: 24,
			frames: 0,
			repeat: Phaser.FOREVER
		},
		attack: {
			frameRate: 24,
			frames: 0,
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
			animation: 'lmplayerattack',
			damage: 2
		},
		controller: {
			...base.controller,
			type: 'player'
		},
		sprite: {
			...base.sprite,
			idle: 'lmplayeridle',
			walk: 'lmplayerwalk'
		},
		animations: {
			lmplayeridle: {
				frameRate: 24,
				frames: Level1Melee.images.ally.walk.map(frame => ({ key: frame.name })),
				repeat: Phaser.FOREVER
			},
			lmplayerwalk: {
				frameRate: 24,
				frames: Level1Melee.images.ally.walk.map(frame => ({ key: frame.name })),
				repeat: Phaser.FOREVER
			},
			lmplayerattack: {
				frameRate: 24,
				frames: Level1Melee.images.ally.attack.map(frame => ({ key: frame.name })),
				repeat: 0
			},
		}
	},
	ally: {
		...base,
		name: 'level1melee-ally',
		weapon: {
			...base.weapon,
			animation: 'allyattack',
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
			idle: 'level1melee-allyidle',
			walk: 'level1melee-allywalk'
		},
		animations: {
			'level1melee-allyidle': {
				frameRate: 24,
				frames: Level1Melee.images.ally.walk.map(frame => ({ key: frame.name })),
				repeat: Phaser.FOREVER
			},
			'level1melee-allywalk': {
				frameRate: 24,
				frames: Level1Melee.images.ally.walk.map(frame => ({ key: frame.name })),
				repeat: Phaser.FOREVER
			},
			'level1melee-allyattack': {
				frameRate: 24,
				frames: Level1Melee.images.ally.attack.map(frame => ({ key: frame.name })),
				repeat: 0
			},
		}
	},
	enemy: {
		...base,
		name: 'level1melee-enemy',
		weapon: {
			...base.weapon,
			animation: 'level1melee-enemyattack',
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
			idle: 'level1melee-enemyidle',
			walk: 'level1melee-enemywalk'
		},
		animations: {
			'level1melee-enemyidle': {
				frameRate: 24,
				frames: Level1Melee.images.enemy.walk.map(frame => ({ key: frame.name })),
				repeat: Phaser.FOREVER
			},
			'level1melee-enemywalk': {
				frameRate: 24,
				frames: Level1Melee.images.enemy.walk.map(frame => ({ key: frame.name })),
				repeat: Phaser.FOREVER
			},
			'level1melee-enemyattack': {
				frameRate: 24,
				frames: Level1Melee.images.enemy.attack.map(frame => ({ key: frame.name })),
				repeat: 0
			},
		}
	}
};

Level1Melee.preload = (scene) => {
	for (let affiliation in Level1Melee.images) {
		for (let sequence in Level1Melee.images[affiliation]) {
			for (let index in Level1Melee.images[affiliation][sequence]) {
				let image = Level1Melee.images[affiliation][sequence][index];
				scene.load.image(image.name, `images/level1melee/${affiliation}/${image.file}`);
			}
		}
	}
}

export default Level1Melee;
