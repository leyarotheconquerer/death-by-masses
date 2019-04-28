class Health {
	constructor(scene, position, offset, health, deathCallback) {
		this.health = health;
		this.maxHealth = health;
		this.deathCallback = deathCallback;
		this.offset = offset;

		this.damageBar = scene.add.rectangle(position.x, position.y, 100, 8, 0x990000);
		this.healthBar = scene.add.rectangle(position.x, position.y, 100, 8, 0x009900);

		this.update(position);
	}

	update(position) {
		this.damageBar.setPosition(
			position.x + this.offset.x,
			position.y + this.offset.y
		);
		this.damageBar.depth = position.y + 2;
		this.healthBar.setPosition(
			position.x + this.offset.x,
			position.y + this.offset.y
		);
		this.healthBar.depth = position.y + 2;
		this.healthBar.setScale(this.health / this.maxHealth, 1);
	}

	damage(amount) {
		this.health -= amount;
		this.health = this.health < 0 ? 0 : this.health;
		console.log(`I took ${amount} damage: ${this.health} / ${this.maxHealth} remains`);
		if (this.health <= 0) {
			this.damageBar.destroy();
			this.healthBar.destroy();
			this.deathCallback();
		}
	}

	heal(amount) {
		this.health += amount;
		this.health = this.health > this.maxHealth ? this.maxHealth : this.health;
	}

	get() {
		return this.health;
	}

	total() {
		return this.maxHealth;
	}
}

export default Health;
