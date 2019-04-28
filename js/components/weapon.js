import Attack from '../objects/attack.js';

class Weapon {
	constructor(scene, sprite, damage, attackAnim, start, end) {
		this.scene = scene;
		this.sprite = sprite;
		this.damage = damage;
		this.attackAnim = attackAnim;
		this.start = start;
		this.end = end;

		this.resumeAnim;
		this.currentAttack = null;
	}

	update() {
		if (this.sprite.anims.getCurrentKey() == this.attackAnim) {
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

	attack(direction, myHealth, groups) {
		if (this.currentAttack) {
			this.currentAttack.destroy();
		}
		this.resumeAnim = this.sprite.anims.getCurrentKey() != this.attackAnim ?
			this.sprite.anims.getCurrentKey() :
			this.resumeAnim;
		this.sprite.play(this.attackAnim);
		this.currentAttack = new Attack(
			this.scene,
			{ x: this.sprite.x, y: this.sprite.y, depth: this.sprite.depth },
			myHealth,
			groups,
			(targetHealth) => {
				targetHealth.damage(this.damage);
			}
		);
	}
};

export default Weapon;
