import Attack from '../objects/attack.js';

class Weapon {
	constructor(scene, sprite, myHealth, damage, attackAnim, start, end) {
		this.scene = scene;
		this.sprite = sprite;
		this.damage = damage;
		this.attackAnim = attackAnim;
		this.myHealth = myHealth;
		this.start = start;
		this.end = end;

		this.groups;
		this.resumeAnim;
		this.currentAttack = null;
	}

	update() {
		if (this.sprite.anims.getCurrentKey() == this.attackAnim) {
			if (
				this.currentAttack == null &&
				this.sprite.anims.getProgress() >= this.start
			) {
				this.currentAttack = new Attack(
					this.scene,
					{ x: this.sprite.x, y: this.sprite.y, depth: this.sprite.depth },
					this.myHealth,
					this.groups,
					(targetHealth) => {
						targetHealth.damage(this.damage);
					}
				);
			}
			if (this.currentAttack != null)
			{
				if (this.sprite.anims.getProgress() >= this.start) {
					this.currentAttack.enable();
				}
				if (this.sprite.anims.getProgress() >= this.end) {
					this.currentAttack.destroy();
				}
			}
			if (this.sprite.anims.getProgress() >= 1) {
				this.sprite.play(this.resumeAnim);
				this.currentAttack = null;
			}
		}
		if (this.currentAttack) {
			this.currentAttack.update({ x: this.sprite.x, y: this.sprite.y, depth: this.sprite.depth });
		}
	}

	destroy() {
		if (this.currentAttack) {
			this.currentAttack.destroy();
		}
	}

	attack(direction, myHealth, groups) {
		if (this.currentAttack) {
			this.currentAttack.destroy();
			this.currentAttack = null;
		}
		this.resumeAnim = this.sprite.anims.getCurrentKey() != this.attackAnim ?
			this.sprite.anims.getCurrentKey() :
			this.resumeAnim;
		this.groups = groups;
		this.sprite.play(this.attackAnim);
	}
};

export default Weapon;
