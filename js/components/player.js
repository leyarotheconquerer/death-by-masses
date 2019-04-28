class Player {
	constructor(input, camera, robot, targetGroups) {
		this.targetGroups = targetGroups;
		input.setPollAlways();
		input.on('pointerdown', (pointer) => {
			if (pointer.buttons == 1) {
				robot.moveToward(
					camera.getWorldPoint(pointer.x, pointer.y)
				);
				input.on('pointermove', (pointer) => {
					robot.moveToward(
						camera.getWorldPoint(pointer.x, pointer.y)
					);
				});
			}
			else if (pointer.buttons == 2) {
				console.log("Player is attacking", this.targetGroups);
				robot.attack(
					camera.getWorldPoint(pointer.x, pointer.y),
					this.targetGroups
				);
			}
		}, this);
		input.on('pointerup', (pointer) => {
			input.off('pointermove');
		});
	}

	update() {
	}

	destroy() {
	}
};

export default Player;
