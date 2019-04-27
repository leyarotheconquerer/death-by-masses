import Map from '../objects/map.js';
import Robot from '../objects/robot.js';

class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'game' });
		this.map;
		this.player;
	}

	preload() {
		this.map = new Map(this);
		this.player = new Robot(this, 'player', 400, 300);
		this.other = new Robot(this, 'other', 500, 400);
	}

	create() {
		let groups = {
			robots: {
				walk: this.physics.add.group(),
				hit: this.physics.add.group()
			}
		};
		this.map.create();
		this.player.create(groups.robots);
		this.other.create(groups.robots);

		this.cameras.main.startFollow(
			this.player.getObject(),
			false,
			0.1, 0.1,
			0, 0
		);
		this.cameras.main.setBackgroundColor('rgba(113, 65, 32, 1)');

		this.physics.add.collider(groups.robots.walk, groups.robots.walk);

		this.input.setPollAlways();
		this.input.on('pointerdown', (pointer) => {
			if (pointer.buttons == 1) {
				this.player.moveToward(
					this.cameras.main.getWorldPoint(pointer.x, pointer.y)
				);
				this.input.on('pointermove', (pointe) => {
					this.player.moveToward(
						this.cameras.main.getWorldPoint(pointer.x, pointer.y)
					);
				});
			}
			else if (pointer.buttons == 2) {
				console.log("Attack!");
			}
		}, this);
		this.input.on('pointerup', (pointer) => {
			this.input.off('pointermove');
		});
	}

	update(time, delta) {
		this.player.update(delta);
		this.other.update(delta);
	}
}

export default Game;
