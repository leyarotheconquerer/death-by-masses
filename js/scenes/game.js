import Map from '../objects/map.js';
import Robot from '../objects/robot.js';
import Level1Melee from '../objects/robots/level1melee.js';
import Score from '../objects/score.js';
import Hud from './hud.js';

class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'game' });
		this.map;
		this.player;
	}

	init() {
		this.scene.add('hud', Hud, true);
		this.hud = this.scene.get('hud');
	}

	preload() {
		Map.preload(this);
		Level1Melee.preload(this);
		Robot.preload(this);
	}

	create() {
		this.groups = {
			player: {
				hit: this.physics.add.group()
			},
			robots: {
				walk: this.physics.add.group(),
			},
			allies: {
				hit: this.physics.add.group()
			},
			enemies: {
				hit: this.physics.add.group()
			},
			attacks: this.physics.add.group()
		};
		let levels = [	
			{
				robot: 'level1melee',
				level: 5,
				spawns: [ 1, 1, 2 ]
			},
			{
				robot: 'level1melee',
				level: 8,
				spawns: [ 2, 2, 3 ]
			}
		];
		this.score = new Score(levels,
			(level, type) => console.log('spawn', level, type),
			(level, type) => console.log('level', level, type)
		);
		this.map = new Map(this);
		this.player = new Robot(this,
			this.map.playerSpawn(),
			null,
			{
				walk: this.groups.robots.walk,
				hit: this.groups.player.hit,
				target: [ this.groups.enemies.hit ]
			},
			() => console.log("You lose"),
			{
				...Level1Melee.config,
				name: 'player-level1melee',
				controller: Level1Melee.playerConfig
			}
		);
		let otherSpawns = this.map.level1meleeSpawns();
		this.level1melee = [];
		for(let index in otherSpawns) {
			this.level1melee = [
				...this.level1melee,
				new Robot(this,
					otherSpawns[index],
					null,
					{
						walk: this.groups.robots.walk,
						hit: this.groups.enemies.hit,
						target: [ this.groups.player.hit ]
					},
					() => { this.score.addKill(); },
					{
						...Level1Melee.config,
						name: 'other-level1melee',
						controller: Level1Melee.aiConfig
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
	}

	update(time, delta) {
		this.player.update(delta);
		for(let index in this.level1melee) {
			this.level1melee[index].update(delta);
		}
		this.level1melee = this.level1melee.filter(robot => !robot.dead());
		if (this.hud.score) {
			this.hud.score.kills(this.score.getStats());
			this.hud.score.health(
				this.player.health.get(),
				this.player.health.total()
			);
			this.hud.score.remaining([{
				label: 'Level 1 - Melee',
				count: this.level1melee.length
			}]);
		}
	}
}

export default Game;
