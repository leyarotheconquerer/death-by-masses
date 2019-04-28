class Attack {
	constructor(scene, position, myHealth, groups, damageCallback) {
		this.scene = scene;

		this.targetsHit = [];
		this.ready = false;

		this.sprite = this.scene.physics.add
			.sprite(position.x, position.y, 'attackspin');
		this.sprite.scaleX = 0.5
		this.sprite.scaleY = 0.5
		this.sprite.setSize(256, 110);
		this.sprite.setOffset(0, 64);
		this.sprite.setName('attacksprite');

		for(let i = 0; i < groups.length; ++i) {
			let group = groups[i];
			this.scene.physics.add.collider(this.sprite, group,
				(a, b) => {
					let targetHealth = b.getData('health');
					this.targetsHit = [ ...this.targetsHit, targetHealth ];
					damageCallback(targetHealth);
				},
				(a, b) => {
					let targetHealth = b.getData('health');
					if (
						this.ready &&
						targetHealth &&
						targetHealth != myHealth &&
						this.targetsHit.indexOf(targetHealth) < 0
					) { 
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
	}

	update(position) {
		this.sprite.setPosition(position.x, position.y);
	}

	enable() {
		this.ready = true;
	}
};

Attack.preload = (scene) => {
	scene.load.image('attackspin', 'images/AttackSpin.png');
};

export default Attack;
