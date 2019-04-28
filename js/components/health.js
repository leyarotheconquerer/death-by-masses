class Health {
	constructor(health, deathCallback) {
		this.health = health;
		this.maxHealth = health;
		this.deathCallback = deathCallback;
	}

	damage(amount) {
		this.health -= amount;
		console.log(`I took ${amount} damage: ${this.health} / ${this.maxHealth} remains`);
		if (this.health <= 0) {
			this.deathCallback();
		}
	}

	heal(amount) {
		this.health += amount;
		if (this.health > this.maxHealth) {
			this.health = this.maxHealth;
		}
	}

	get() {
		return this.health;
	}

	total() {
		return this.maxHealth;
	}
}

export default Health;
