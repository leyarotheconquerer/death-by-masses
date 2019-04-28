import Map from '../objects/map.js';
import Robot from '../objects/robot.js';
import Level1Melee from '../objects/robots/level1melee.js';

class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'game' });
		this.map;
		this.player;
	}

	preload() {
		Map.preload(this);
		Level1Melee.preload(this);
		Robot.preload(this);
	}

	create() {
		this.groups = {
			robots: {
				walk: this.physics.add.group(),
				hit: this.physics.add.group()
			},
			attacks: this.physics.add.group()
		};
		this.map = new Map(this);
		this.player = new Robot(this,
			this.map.playerSpawn(),
			this.groups.robots,
			{
				...Level1Melee.config,
				name: 'player-level1melee',
			}
		);
		let otherSpawns = this.map.level1meleeSpawns();
		this.level1melee = [];
		for(let index in otherSpawns) {
			this.level1melee = [
				...this.level1melee,
				new Robot(this,
					otherSpawns[index],
					this.groups.robots,
					{
						...Level1Melee.config,
						name: 'other-level1melee',
					}
				)
			];
		}

		this.cameras.main.setBackgroundColor('rgba(113, 65, 32, 1)');
		this.cameras.main.startFollow(
			this.player.getObject(),
			false,
			0.1, 0.1,
			0, 0
		);

		this.physics.add.collider(this.groups.robots.walk, this.groups.robots.walk);
		this.setupInput();
	}

	setupInput() {
		this.input.setPollAlways();
		this.input.on('pointerdown', (pointer) => {
			if (pointer.buttons == 1) {
				this.player.moveToward(
					this.cameras.main.getWorldPoint(pointer.x, pointer.y)
				);
				this.input.on('pointermove', (pointer) => {
					this.player.moveToward(
						this.cameras.main.getWorldPoint(pointer.x, pointer.y)
					);
				});
			}
			else if (pointer.buttons == 2) {
				this.player.attack(
					this.cameras.main.getWorldPoint(pointer.x, pointer.y),
					[ this.groups.robots.hit ]
				);
			}
		}, this);
		this.input.on('pointerup', (pointer) => {
			this.input.off('pointermove');
		});
	}

	update(time, delta) {
		this.player.update(delta);
		for(let index in this.level1melee) {
			this.level1melee[index].update(delta);
		}
		this.level1melee = this.level1melee.filter(robot => !robot.dead());
	}
}

export default Game;
