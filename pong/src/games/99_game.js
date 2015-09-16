(function() {
  var game = new Phaser.Game(480, 320, Phaser.CANVAS, '');
  game.state.add('Boot', Pong.Boot);
  game.state.add('Preloader', Pong.Preloader);
  game.state.add('MainMenu', Pong.MainMenu);
  game.state.add('Game', Pong.Game);
  game.state.add('EndMenu', Pong.EndMenu);

  game.state.start('Boot');
})();