import Game from './scenes/game.js';

const app = {
	game: null,
	start: () => new Phaser.Game({
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		parent: 'ld44-game',
		physics: {
			default: 'arcade',
			arcade: {
				debug: true,
				gravity: { y: 0 },
			}
		},
		scene: [ Game ]
	})
};

export default app;
