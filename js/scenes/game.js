import Map from '../objects/map.js';
import Robot from '../objects/robot.js';
import Level1Melee from '../objects/robots/level1melee.js';
import Score from '../objects/score.js';
import Spawner from '../objects/spawner.js';
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
		this.start = Date.now();
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
				level: 11,
				spawns: [ 1, 1, 1, 2, 2 ]
			},
			{
				robot: 'level1melee',
				level: 8,
				spawns: [ 2, 2, 3 ]
			}
		];
		this.score = new Score(levels,
			(level, type) => {
				this.allies = [
					...this.allies,
					this.spawner.spawnAlly(type,
						this.player.getObject(),
						{
							walk: this.groups.robots.walk,
							hit: this.groups.allies.hit,
							target: [ this.groups.enemies.hit ]
						},
						() => console.log("An ally has died")
					)
				];
			},
			(level, type) => console.log('level', level, type)
		);
		this.spawner = new Spawner(this);
		this.map = new Map(this);
		const playerRespawn = () => {
			if (this.allies.length > 0) {
				const ally = this.allies[0];
				this.player = this.spawner.spawnPlayer(
					'level1melee',
					{ x: ally.sprite.x, y: ally.sprite.y },
					{
						walk: this.groups.robots.walk,
						hit: this.groups.player.hit,
						target: [ this.groups.enemies.hit ]
					},
					playerRespawn
				);
				this.cameras.main.startFollow(
					this.player.getObject(),
					false,
					0.1, 0.1,
					0, 0
				);
				ally.destroy();
			}
			else {
				this.hud.score.lose();
			}
		};
		this.player = this.spawner.spawnPlayer(
			'level1melee',
			this.map.playerSpawn(),
			{
				walk: this.groups.robots.walk,
				hit: this.groups.player.hit,
				target: [ this.groups.enemies.hit ]
			},
			playerRespawn
		);
		let otherSpawns = this.map.level1meleeSpawns();
		this.enemies = [];
		this.allies = [];
		for(let index in otherSpawns) {
			for (let i = 0; i <= index; ++i) {
				this.enemies = [
					...this.enemies,
					this.spawner.spawnEnemy(
						'level1melee',
						[otherSpawns[index]],
						{
							walk: this.groups.robots.walk,
							hit: this.groups.enemies.hit,
							target: [ this.groups.player.hit, this.groups.allies.hit ]
						},
						() => {
							this.score.addKill();
							if (this.enemies.length <= 1) {
								this.hud.score.win(Date.now() - this.start);
							}
						}
					)
				];
			}
		}

		//this.cameras.main.setBackgroundColor('rgba(113, 65, 32, 1)');
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
		for(let index in this.enemies) {
			this.enemies[index].update(delta);
		}
		this.enemies = this.enemies.filter(robot => !robot.dead());
		if (!this.hack && this.enemies.length <= 0) {
			this.hack = true;
			this.hud.score.win(Date.now() - this.start);
		}
		for(let index in this.allies) {
			this.allies[index].update(delta);
		}
		this.allies = this.allies.filter(robot => !robot.dead());
		if (this.hud.score) {
			this.hud.score.kills(this.score.getStats());
			this.hud.score.health(
				this.player.health.get(),
				this.player.health.total()
			);
			this.hud.score.remaining([{
				label: 'Level 1 - Melee',
				count: this.enemies.length
			}]);
		}
	}
}

export default Game;
