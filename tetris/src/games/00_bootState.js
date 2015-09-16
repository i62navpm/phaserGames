var Tetris = {};

Tetris.Boot = function(game) {};

Tetris.Boot.prototype = {
  preload: function() {
    this.game.load.image("loading","assets/loading.png");
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
  },
  create: function() {
    this.game.state.start('Preloader');
  }
};