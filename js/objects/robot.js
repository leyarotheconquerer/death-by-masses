import Attack from './attack.js';
import Health from '../components/health.js';
import Weapon from '../components/weapon.js';
import Player from '../components/player.js';
import AiMelee from '../components/aimelee.js';

class Robot {
	constructor(scene, position, follow, groups, deathCallback, config) {
		this.scene = scene;
		this.name = config.name;

		this.moving = false;
		this.target = position;
		this.deathCallback = deathCallback;

		for (let key in config.animations) {
			if (!this.scene.anims.exists(key)) {
				let animation = this.scene.anims.create({
					key,
					...config.animations[key]
				});
			}
		}

		this.health = new Health(this.scene,
			this.target, { x: 0, y: -60 },
			config.health.total,
			() => {
				console.log("I'm dead says", this.name);
				this.deathCallback();
				this.destroy();
			}
		);
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

		groups.walk.add(this.sprite);
		groups.hit.add(this.hitSprite);
		this.sprite.setDrag(1000, 1000);
		this.weapon = new Weapon(
			this.scene, this.sprite,
			this.health,
			config.weapon.damage,
			config.weapon.animation,
			config.weapon.start, config.weapon.end
		);
		this.setController(config.controller, follow, groups.target);
	}

	createSprite(config, animations, target, name) {
		let frame = Math.trunc(Math.random() * animations[config.idle].frames.length);
		let sprite = this.scene.physics.add
			.sprite(target.x, target.y, name)
			.play(
				config.idle,
				false,
				frame
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

	setController(config, follow, targetGroups) {
		this.controller = {
			player: () => new Player(
				this.scene.input,
				this.scene.cameras.main,
				this,
				targetGroups
			),
			aimelee: () => new AiMelee(
				config,
				follow,
				this.sprite, this,
				targetGroups
			)
		}[config.type]();
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
			this.controller.update();
			this.weapon.update();
			this.health.update({ x: this.sprite.x, y: this.sprite.y });
		}
	}

	destroy() {
		this.sprite.destroy();
		this.hitSprite.destroy();
		this.health.destroy();
		this.weapon.destroy();
		this.controller.destroy();
		this.destroyed = true;
	}

	dead() {
		return this.destroyed;
	}

	getObject() {
		return this.sprite;
	}

	getController() {
		return this.controller;
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
};

export default Robot;
