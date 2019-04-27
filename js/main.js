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
				gravity: { y: 0 },
			}
		},
		scene: {
			preload: function() {},
			create: function() {}
		}
	})
};

export default app;
