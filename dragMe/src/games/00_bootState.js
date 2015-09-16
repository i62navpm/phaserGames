var DragMe = {};

DragMe.Boot = function(game) {};

DragMe.Boot.prototype = {
  preload: function() {
    this.game.load.image("loading","assets/loading.png");
  },
  create: function() {
    this.game.state.start('Preloader');
  }
};