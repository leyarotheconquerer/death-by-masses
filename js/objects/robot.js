class Robot {
	images() {
		return [
			{ name: "playerwalk00", file: "frame0000.png" },
			{ name: "playerwalk01", file: "frame0001.png" },
			{ name: "playerwalk02", file: "frame0002.png" },
			{ name: "playerwalk03", file: "frame0003.png" },
			{ name: "playerwalk04", file: "frame0004.png" },
			{ name: "playerwalk05", file: "frame0005.png" },
			{ name: "playerwalk06", file: "frame0006.png" },
			{ name: "playerwalk07", file: "frame0007.png" },
			{ name: "playerwalk08", file: "frame0008.png" },
			{ name: "playerwalk09", file: "frame0009.png" },
			{ name: "playerwalk10", file: "frame0010.png" },
			{ name: "playerwalk11", file: "frame0011.png" },
			{ name: "playerwalk12", file: "frame0012.png" },
			{ name: "playerwalk13", file: "frame0013.png" },
			{ name: "playerwalk14", file: "frame0014.png" },
			{ name: "playerwalk15", file: "frame0015.png" },
			{ name: "playerwalk16", file: "frame0016.png" },
			{ name: "playerwalk17", file: "frame0017.png" },
			{ name: "playerwalk18", file: "frame0018.png" },
			{ name: "playerwalk19", file: "frame0019.png" },
			{ name: "playerwalk20", file: "frame0020.png" },
			{ name: "playerwalk21", file: "frame0021.png" },
			{ name: "playerwalk22", file: "frame0022.png" },
			{ name: "playerwalk23", file: "frame0023.png" }
		];
	}

	constructor(scene, name, x, y) {
		this.scene = scene;
		this.sprite;
		this.name = name;
		this.moving = false;
		this.target = {x, y};

		this.preload();
	}

	preload() {
		for (let index in this.images()) {
			let image = this.images()[index];
			this.scene.load.image(image.name, `images/robot/${image.file}`);
		}
	}

	create(groups) {
		this.scene.anims.create({
			key: 'playerwalk',
			frames: this.images().map(image => ({ key: image.name })),
			frameRate: 24,
			repeat: Phaser.FOREVER
		});

		this.sprite = this.scene.physics.add
			.sprite(this.target.x, this.target.y, this.name)
			.play('playerwalk');
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
	}

	getObject() {
		return this.sprite;
	}

	moveToward(target) {
		this.target = target;
		this.moving = true;
	}
};

export default Robot;
