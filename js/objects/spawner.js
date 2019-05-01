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
			this.config(type).player
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
			this.config(type).ally
		);
	}

	spawnEnemy(type, spawns, groups, deathCallback) {
		let index = Math.trunc(Math.random() * spawns.length);
		return new Robot(this.scene,
			spawns[index],
			null,
			groups,
			deathCallback,
			this.config(type).enemy
		);
	}

	config(type) {
		return {
			level1melee: Level1Melee.config
		}[type];
	}
};

export default Spawner;
