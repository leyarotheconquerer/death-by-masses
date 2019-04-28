import Attack from './attack.js';
import Health from '../components/health.js';
import Weapon from '../components/weapon.js';

class Robot {
	constructor(scene, name, x, y, groups) {
		const config = {
			name: name,
			position: { x, y },
			groups: groups,
			health: {
				total: 10
			},
			weapon: {
				animation: 'playerattack',
				start: 0.2,
				end: 0.6,
				damage: 1
			},
			sprite: {
				idle: 'playerwalk',
				walk: 'playerwalk',
				scale: { x: 0.5, y: 0.5 },
				circle: {
					radius: 40,
					offset: { x: 84, y: 140 }
				}
			},
			hitbox: {
				size: { w: 60, h: 90 },
				offset: { x: -14, y: -30 }
			},
			animations: {
				playerwalk: {
					frameRate: 24,
					frames: Robot.images.walk.map(image => ({ key: image.name })),
					repeat: Phaser.FOREVER
				},
				playerattack: {
					frameRate: 24,
					frames: Robot.images.attack.map(image => ({ key: image.name })),
					repeat: 0
				},
			}
		};
		this.scene = scene;
		this.name = name;

		this.moving = false;
		this.target = config.position;

		for (let key in config.animations) {
			this.scene.anims.create({
				key,
				...config.animations[key]
			});
		}

		this.health = new Health(config.health.total, () => {
			console.log("I'm dead says", this.name);
			this.destroy();
		});
		this.sprite = this.createSprite(
			config.sprite,
			config.animations,
			this.target, this.name
		);
		this.hitSprite = this.createHitBox(
			config.hitbox,
			this.health,
			this.target, this.name
		);

		config.groups.walk.add(this.sprite);
		config.groups.hit.add(this.hitSprite);
		this.sprite.setDrag(1000, 1000);
		this.weapon = new Weapon(
			this.scene, this.sprite,
			config.weapon.damage,
			config.weapon.animation,
			config.weapon.start, config.weapon.end
		);
	}

	createSprite(config, animations, target, name) {
		let sprite = this.scene.physics.add
			.sprite(target.x, target.y, name)
			.play(
				config.idle,
				false,
				Math.trunc(Math.random() * animations[config.idle].frames.length)
			);
		sprite.setName(name);
		sprite.scaleX = config.scale.x;
		sprite.scaleY = config.scale.y;
		sprite.setCircle(
			config.circle.radius,
			config.circle.offset.x,
			config.circle.offset.y
		);
		return sprite;
	}

	createHitBox(config, health, target, name) {
		let hitbox = this.scene.physics.add
			.sprite(target.x, target.y, `${name}-hitbox`);
		hitbox.setAlpha(0);
		console.log("Hitbox config", config);
		hitbox.setSize(
			config.size.w,
			config.size.h
		);
		hitbox.setOffset(
			config.offset.x,
			config.offset.y
		);
		hitbox.setDataEnabled();
		hitbox.setName('hitsprite');
		hitbox.setData('hitSprite', hitbox);
		hitbox.setData('health', health);
		return hitbox;
	}

	update(delta) {
		if (!this.destroyed) {
			const speed = 300;
			const sleep = 100;
			this.hitSprite.setPosition(this.sprite.x, this.sprite.y);
			this.sprite.depth = this.sprite.y;
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
			this.weapon.update();
		}
	}

	destroy() {
		this.sprite.destroy();
		this.hitSprite.destroy();
		this.destroyed = true;
	}

	getObject() {
		return this.sprite;
	}

	attack(target, groups) {
		let position = new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
		let direction = position.negate().add(target).normalize();
		this.weapon.attack(direction, this.health, groups);
	}

	moveToward(target) {
		this.target = target;
		this.moving = true;
	}
};

Robot.preload = (scene) => {
	Attack.preload(scene);
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
