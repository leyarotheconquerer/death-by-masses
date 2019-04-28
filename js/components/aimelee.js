class AiMelee {
	constructor(config, follow, robotSprite, robot, targetGroups) {
		this.robot = robot;
		this.targetGroups = targetGroups;
		this.robotSprite = this.robot.getObject();
		this.follow = follow;
		this.config = config;
		this.detected = Date.now();
		this.lastAttack = Date.now();
		this.attackTarget = null;

		this.detectSprite = this.robotSprite.scene.physics.add
			.sprite(this.robotSprite.x, this.robotSprite.y, null);
		this.detectSprite.setAlpha(0);
		this.detectSprite.setCircle(
			this.config.detect.radius,
			this.config.detect.offset.x,
			this.config.detect.offset.y
		);
		this.detectSprite.body.overlapOnly = true;

		for (let i = 0; i < targetGroups.length; ++i) {
			this.robotSprite.scene.physics.add.overlap(this.detectSprite, targetGroups[i],
				(a, b) => {
					this.attackTarget = b;
					this.detected = Date.now();
				},
				(a, b) => this.attackTarget == null ||
					this.attackTarget == b,
				this
			);
		}
	}

	update() {
		this.detectSprite.setPosition(this.robotSprite.x, this.robotSprite.y);
		if (this.attackTarget != null) {
			if(Date.now() - this.detected <= (1000 / this.config.detect.rate)) {
				let distance = new Phaser.Math.Vector2(this.detectSprite.x, this.detectSprite.y)
					.distance({ x: this.attackTarget.x, y: this.attackTarget.y });
				if (
					distance < this.config.attack.radius &&
					(Date.now() - this.lastAttack) >= (1000 / this.config.attack.rate)
				) {
					this.lastAttack = Date.now();
					this.robot.attack(
						{ x: this.attackTarget.x, y: this.attackTarget.y },
						this.targetGroups
					);
				}
				else if (distance > this.config.attack.radius) {
					this.robot.moveToward({ x: this.attackTarget.x, y: this.attackTarget.y });
				}
			}
			else {
				this.attackTarget = null;
			}
		}
		else if (this.follow != null) {
			let distance = (new Phaser.Math.Vector2(this.robotSprite.x, this.robotSprite.y))
				.distance({ x: this.follow.x, y: this.follow.y }) - this.config.detect.radius / 2;
			let target = (new Phaser.Math.Vector2(this.robotSprite.x, this.robotSprite.y))
				.negate()
				.add({ x: this.follow.x, y: this.follow.y })
				.normalize()
				.multiply({ x: distance, y: distance })
				.add({ x: this.robotSprite.x, y: this.robotSprite.y });
			this.robot.moveToward(target);
		}
	}

	destroy() {
		this.detectSprite.destroy();
	}
};

export default AiMelee;
