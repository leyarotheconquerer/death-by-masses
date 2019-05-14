class Player {
	constructor(input, camera, robot, targetGroups) {
		this.targetGroups = targetGroups;
		this.input = input;
		this.robot = robot;
		this.camera = camera;

		this.input.setPollAlways();
		this.input.on('pointerdown', this.click, this);
		this.input.on('pointerup', this.release, this);
	}

	update() {
	}

	destroy() {
		this.input.off('pointerdown', this.click, this);
		this.input.off('pointerup', this.release, this);
		this.input.off('pointermove', this.moveToward, this);
	}

	click(pointer) {
		if (pointer.buttons == 1) {
			this.robot.moveToward(
				this.camera.getWorldPoint(pointer.x, pointer.y)
			);
			this.input.on('pointermove', this.moveToward, this)
		}
		else if (pointer.buttons == 2) {
			this.robot.attack(
				this.camera.getWorldPoint(pointer.x, pointer.y),
				this.targetGroups
			);
		}
	}

	moveToward(pointer) {
		this.robot.moveToward(
			this.camera.getWorldPoint(pointer.x, pointer.y)
		);
	}

	release(pointer) {
		this.input.off('pointermove');
	}
};

export default Player;
