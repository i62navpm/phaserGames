(function() {
  var game = new Phaser.Game(500, 590, Phaser.CANVAS, '');
  game.state.add('Boot', Tetris.Boot);
  game.state.add('Preloader', Tetris.Preloader);
  game.state.add('MainMenu', Tetris.MainMenu);
  game.state.add('Game', Tetris.Game);
  game.state.add('EndMenu', Tetris.EndMenu);

  game.state.start('Boot');
})();