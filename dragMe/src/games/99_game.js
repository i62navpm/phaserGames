(function() {
  var game = new Phaser.Game(400, 400, Phaser.CANVAS, '', null, true);
  game.state.add('Boot', DragMe.Boot);
  game.state.add('Preloader', DragMe.Preloader);
  game.state.add('MainMenu', DragMe.MainMenu);
  game.state.add('Game', DragMe.Game);
  game.state.add('EndMenu', DragMe.EndMenu);

  game.state.start('Boot');
})();