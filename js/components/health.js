class Health {
	constructor(health, deathCallback) {
		this.health = health;
		this.maxHealth = health;
		this.deathCallback = deathCallback;
	}

	damage(amount) {
		this.health -= amount;
		this.health = this.health < 0 ? 0 : this.health;
		console.log(`I took ${amount} damage: ${this.health} / ${this.maxHealth} remains`);
		if (this.health <= 0) {
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
