import Score from '../objects/score.js';

class Hud extends Phaser.Scene {
	constructor(game) {
		super({ key: 'hud' });
	}

	init() {
		this.game = this.scene.get('game');
	}

	preload() {
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
	}

	create() {
		WebFont.load({
			custom: {
				families: ['ROBOTECH GP']
			},
			active: () => {
				this.score = new Score(this);
			}
		});
	}

	update(time, delta) {
	}
};

export default Hud;
