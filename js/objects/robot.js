
class Robot {
	constructor(scene, name, x, y) {
		this.scene = scene;
		this.sprite;
		this.name = name;
		this.moving = false;
		this.target = {x, y};
	}

	create(groups) {
		this.scene.anims.create({
			key: 'playerwalk',
			frames: Robot.images.walk.map(image => ({ key: image.name })),
			frameRate: 24,
			repeat: Phaser.FOREVER
		});
		this.scene.anims.create({
			key: 'playerattack',
			frames: Robot.images.attack.map(image => ({ key: image.name })),
			frameRate: 24,
			repeat: 0
		});

		this.sprite = this.scene.physics.add
			.sprite(this.target.x, this.target.y, this.name)
			.play('playerwalk', false, Math.trunc(Math.random() * Robot.images.walk.length));
		this.sprite.scaleX = 0.5;
		this.sprite.scaleY = 0.5;
		this.sprite.setCircle(40, 84, 140);

		this.hitSprite = this.scene.physics.add
			.sprite(this.target.x, this.target.y, `${this.name}-hit`);
		this.hitSprite.setAlpha(0);
		this.hitSprite.setSize(60, 90);

		groups.walk.add(this.sprite);
		groups.hit.add(this.hitSprite);

		this.sprite.setDrag(1000, 1000);
	}

	update(delta) {
		const speed = 300;
		const sleep = 100;
		this.hitSprite.setPosition(this.sprite.x, this.sprite.y);
		if (this.moving) {
			let position = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
			let distance = position.distanceSq(this.target);
			if (distance > sleep) {
				this.scene.physics.moveToObject(this.sprite, this.target, speed);
			}
			else {
				this.moving = false;
				this.sprite.setVelocity(0,0);
			}
		}
		if (
			this.sprite.anims.getCurrentKey() == "playerattack" &&
			this.sprite.anims.getProgress() >= 1
		) {
			this.sprite.play('playerwalk');
		}
	}

	getObject() {
		return this.sprite;
	}

	attack(target) {
		let position = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
		let direction = position.negate().add(target).normalize();
		this.sprite.play('playerattack');
	}

	moveToward(target) {
		this.target = target;
		this.moving = true;
	}
};

Robot.preload = (scene) => {
	scene.load.image('attackspin', 'images/AttackSpin.png');
	for (let sequence in Robot.images) {
		for (let index in Robot.images[sequence])
		{
			let image = Robot.images[sequence][index];
			scene.load.image(image.name, `images/robot/${image.file}`);
		}
	}
};

Robot.images = {
	walk: [
		{ name: "playerwalk00", file: "walk/frame0000.png" },
		{ name: "playerwalk01", file: "walk/frame0001.png" },
		{ name: "playerwalk02", file: "walk/frame0002.png" },
		{ name: "playerwalk03", file: "walk/frame0003.png" },
		{ name: "playerwalk04", file: "walk/frame0004.png" },
		{ name: "playerwalk05", file: "walk/frame0005.png" },
		{ name: "playerwalk06", file: "walk/frame0006.png" },
		{ name: "playerwalk07", file: "walk/frame0007.png" },
		{ name: "playerwalk08", file: "walk/frame0008.png" },
		{ name: "playerwalk09", file: "walk/frame0009.png" },
		{ name: "playerwalk10", file: "walk/frame0010.png" },
		{ name: "playerwalk11", file: "walk/frame0011.png" },
		{ name: "playerwalk12", file: "walk/frame0012.png" },
		{ name: "playerwalk13", file: "walk/frame0013.png" },
		{ name: "playerwalk14", file: "walk/frame0014.png" },
		{ name: "playerwalk15", file: "walk/frame0015.png" },
		{ name: "playerwalk16", file: "walk/frame0016.png" },
		{ name: "playerwalk17", file: "walk/frame0017.png" },
		{ name: "playerwalk18", file: "walk/frame0018.png" },
		{ name: "playerwalk19", file: "walk/frame0019.png" },
		{ name: "playerwalk20", file: "walk/frame0020.png" },
		{ name: "playerwalk21", file: "walk/frame0021.png" },
		{ name: "playerwalk22", file: "walk/frame0022.png" },
		{ name: "playerwalk23", file: "walk/frame0023.png" }
	],
	attack: [
		{ name: "playerattack00", file: "attack/frame0000.png" },
		{ name: "playerattack01", file: "attack/frame0001.png" },
		{ name: "playerattack02", file: "attack/frame0002.png" },
		{ name: "playerattack03", file: "attack/frame0003.png" },
		{ name: "playerattack04", file: "attack/frame0004.png" },
		{ name: "playerattack05", file: "attack/frame0005.png" },
		{ name: "playerattack06", file: "attack/frame0006.png" },
		{ name: "playerattack07", file: "attack/frame0007.png" },
		{ name: "playerattack08", file: "attack/frame0008.png" },
		{ name: "playerattack09", file: "attack/frame0009.png" },
		{ name: "playerattack10", file: "attack/frame0010.png" },
		{ name: "playerattack11", file: "attack/frame0011.png" },
		{ name: "playerattack12", file: "attack/frame0012.png" },
		{ name: "playerattack13", file: "attack/frame0013.png" },
		{ name: "playerattack14", file: "attack/frame0014.png" },
		{ name: "playerattack15", file: "attack/frame0015.png" },
		{ name: "playerattack16", file: "attack/frame0016.png" },
		{ name: "playerattack17", file: "attack/frame0017.png" },
		{ name: "playerattack18", file: "attack/frame0018.png" },
		{ name: "playerattack19", file: "attack/frame0019.png" },
		{ name: "playerattack20", file: "attack/frame0020.png" },
		{ name: "playerattack21", file: "attack/frame0021.png" },
		{ name: "playerattack22", file: "attack/frame0022.png" },
		{ name: "playerattack23", file: "attack/frame0023.png" }
	]
};

export default Robot;
