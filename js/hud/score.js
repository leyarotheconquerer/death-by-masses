class Score {
	constructor(scene) {
		this.scene = scene;
		this.previousKill = '';
		this.killGroup = null;
		this.previousRemaining = '';
		this.remainingGroup = null;
		this.healthBar = null;
		this.healthLabel = null;

		this.remaining([]);
		this.kills({
			total: 0,
			spawn: 1,
			level: 4
		});
		this.health(5, 10);
	}

	remaining(counts) {
		// TODO: Something better than string "hashing"
		if (this.previousRemaining == JSON.stringify(counts)) { return; };
		this.previousRemaining = JSON.stringify(counts);
		if (this.remainingGroup) {
			this.remainingGroup.destroy(true);
		}
		this.remainingGroup = this.scene.add.group();
		let background = this.scene.add.rectangle(5, 5,
			200, 25 * (counts.length + 1) + 10,
			0x333333, 0.7
		);
		background.setOrigin(0, 0);
		this.remainingGroup.add(background);
		this.remainingGroup.add(
			this.createText(10, 5, 'Enemies Remaining', 20, 'white')
		);
		for (let i = 0; i < counts.length; ++i) {
			this.remainingGroup.add(
				this.createText(10, 35 + i * 25, `${counts[i].label}:`, 16)
			);
			this.remainingGroup.add(
				this.createText(170, 35 + i * 25, counts[i].count, 16, 'white')
			);
		}
	}

	kills(counts) {
		// TODO: Something better than string "hashing"
		if (this.previousKill == JSON.stringify(counts)) { return; };
		this.previousKill = JSON.stringify(counts);
		if (this.killGroup) {
			this.killGroup.destroy(true);
		}
		this.killGroup = this.scene.add.group();
		let background = this.scene.add.rectangle(795, 5,
			200, 110,
			0x333333, 0.7
		);
		background.setOrigin(1, 0);
		this.killGroup.add(background);
		this.killGroup.add(this.createText(605, 5, "Kills", 20, 'white'));
		this.killGroup.add(this.createText(605, 35, "Total: ", 16));
		this.killGroup.add(this.createText(730, 35, counts.total, 16, 'white'));
		this.killGroup.add(this.createText(605, 60, "Until Spawn: ", 16));
		this.killGroup.add(this.createText(730, 60, counts.spawn, 16, 'white'));
		this.killGroup.add(this.createText(605, 85, "Until Level: ", 16));
		this.killGroup.add(this.createText(730, 85, counts.level, 16, 'white'));
	}

	health(current, total) {
		if (!this.healthBar) {
			let background = this.scene.add.rectangle(400, 10, 360, 20, 0x990000);
			background.setOrigin(0.5, 0);
			this.healthBar = this.scene.add.rectangle(400, 10, 360, 20, 0x009900);
			this.healthBar.setOrigin(0.5, 0);
		}
		this.healthBar.setScale(current / total, 1.0);
		if (this.healthLabel) {
			this.healthLabel.destroy();
		}
		this.healthLabel = this.createText(400, 4, `${current} / ${total}`, 20, 'white');
		this.healthLabel.setOrigin(0.5, 0);
	}

	createText(x, y, message, size, color = '#999999') {
		return this.scene.add.text(x, y,
			message,
			{ fontFamily: '"ROBOTECH GP"', fontSize: `${size}pt`, color: color }
		);
	}

	update() {
	}
};

export default Score;
