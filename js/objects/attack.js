class Attack {
	constructor(scene, attacker, attackerHit, attackAnim, resumeAnim, start, end, groups) {
		this.scene = scene;
		this.attacker = attacker;
		this.attackerHit = attackerHit;
		this.attackAnim = attackAnim;
		this.resumeAnim = resumeAnim;
		this.start = start;
		this.end = end;

		this.targetsHit = [];
		this.ready = false;

		this.attacker.play(attackAnim);
		this.sprite = this.scene.physics.add
			.sprite(this.attacker.x, this.attacker.y, 'attackspin');
		this.sprite.scaleX = 0.5
		this.sprite.scaleY = 0.5
		this.sprite.setSize(256, 110);
		this.sprite.setOffset(0, 64);
		this.sprite.setName('attacksprite');

		for(let i = 0; i < groups.length; ++i) {
			let group = groups[i];
			this.scene.physics.add.collider(this.sprite, group,
				(a, b) => { console.log("attack hit"); },
				(a, b) => {
					if (
						this.ready &&
						b.getData('hitSprite') != this.attackerHit &&
						this.targetsHit.indexOf(b.getData('hitSprite')) < 0
					) { 
						this.targetsHit = [
							...this.targetsHit,
							b.getData('hitSprite')
						];
						return true;
					}
					return false;
				},
				this
			);
		}
	}

	destroy() {
		if (this.sprite != null) {
			this.sprite.destroy();
		}
		return null;
	}

	update() {
		let destroy = false;
		if (this.attacker.anims.getCurrentKey() == this.attackAnim) {
			if (this.sprite) {
				this.sprite.setPosition(this.attacker.x, this.attacker.y);
				if (this.attacker.anims.getProgress() >= this.start) {
					this.ready = true;
				}
				if (this.attacker.anims.getProgress() >= this.end) {
					this.sprite = this.destroy();
				}
			}
			if (this.attacker.anims.getProgress() >= 1) {
				this.attacker.play(this.resumeAnim);
				return null;
			}
		}
		return this;
	}
};

Attack.preload = (scene) => {
	scene.load.image('attackspin', 'images/AttackSpin.png');
};

export default Attack;
