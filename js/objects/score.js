class Score {
	constructor(levels, spawnCallback, levelCallback) {
		this.spawnCallback = spawnCallback;
		this.levelCallback = levelCallback;
		this.levels = levels;

		this.currentLevel = 0;
		this.currentSpawn = 0;
		this.total = 0;
		this.level = this.levels[this.currentLevel].level;
		this.spawn = this.levels[this.currentLevel].spawns[0];
	}

	addKill() {
		this.total += 1;
		this.level -= 1;
		if (this.level <= 0) {
			this.currentLevel += 1;
			this.currentSpawn = 0;
			this.levelCallback(this.currentLevel, this.levels[this.currentLevel].robot);
			this.spawn = this.levels[this.currentLevel].level;
			this.level = this.levels[this.currentLevel].spawns[0];
		}
		if (this.spawn >= 0) {
			this.spawn -= 1;
			if (this.spawn <= 0) {
				this.currentSpawn += 1;
				this.spawnCallback(this.currentSpawn, this.levels[this.currentLevel].robot);
				this.spawn = this.levels[this.currentLevel].spawns.length > this.currentSpawn ?
					this.levels[this.currentLevel].spawns[this.currentSpawn] :
					0;
			}
		}
	}

	getStats() {
		return {
			total: this.total,
			spawn: this.spawn,
			level: this.level
		};
	}
};

export default Score;
