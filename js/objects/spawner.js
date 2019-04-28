import Robot from './robot.js';
import Level1Melee from './robots/level1melee.js';

class Spawner {
	constructor(scene) {
		this.scene = scene;
	}

	spawnPlayer(type, spawn, groups, deathCallback) {
		return new Robot(this.scene,
			spawn,
			null,
			groups,
			deathCallback,
			{ ...this.config(type, true),
				animations: {
					playerwalk: {
						frameRate: 24,
						frames: Level1Melee.allyimages.walk.map(image => ({ key: image.name })),
						repeat: Phaser.FOREVER
					},
					playerattack: {
						frameRate: 24,
						frames: Level1Melee.allyimages.attack.map(image => ({ key: image.name })),
						repeat: 0
					}
				}
				//*/
			}
		);
	}

	spawnAlly(type, follow, groups, deathCallback) {
		let offset = (new Phaser.Math.Vector2(Math.random(), Math.random()))
			.normalize()
			.multiply({ x: 100, y: 100});
		return new Robot(this.scene,
			{ x: follow.x + offset.x, y: follow.y + offset.y },
			follow,
			groups,
			deathCallback,
			{ ...this.config(type),
				animations: {
					playerwalk: {
						frameRate: 24,
						frames: Level1Melee.allyimages.walk.map(image => ({ key: image.name })),
						repeat: Phaser.FOREVER
					},
					playerattack: {
						frameRate: 24,
						frames: Level1Melee.allyimages.attack.map(image => ({ key: image.name })),
						repeat: 0
					}
				}
				//*/
			}
		);
	}

	spawnEnemy(type, spawns, groups, deathCallback) {
		let index = Math.trunc(Math.random() * spawns.length);
		return new Robot(this.scene,
			spawns[index],
			null,
			groups,
			deathCallback,
			{ ...this.config(type),
				sprite: {
					...this.config(type).sprite,
					idle: 'enemywalk',
					walk: 'enemywalk'
				},
				weapon: {
					...this.config(type).weapon,
					animation: 'enemyattack'
				},
				animations: {
					enemywalk: {
						frameRate: 24,
						frames: Level1Melee.enemyimages.walk.map(image => ({ key: image.name })),
						repeat: Phaser.FOREVER
					},
					enemyattack: {
						frameRate: 24,
						frames: Level1Melee.enemyimages.attack.map(image => ({ key: image.name })),
						repeat: 0
					}
				}
				//*/
			}
		);
	}

	config(type, player = false) {
		return {
			level1melee: {
				...Level1Melee.config,
				...(player ? {
					health: {
						total: 10
					},
					weapon: {
						...Level1Melee.config.weapon,
						damage: 2
					}
				} : {}),
				name: `${player ? 'player' : 'other'}-level1melee`,
				controller: (player ?
					Level1Melee.playerConfig :
					Level1Melee.aiConfig)
			}
		}[type];
	}
};

export default Spawner;
