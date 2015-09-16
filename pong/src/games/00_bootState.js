var Pong = {};

Pong.Boot = function(game) {};

Pong.Boot.prototype = {
  preload: function() {
    this.game.load.image("loading","assets/loading.png"); 
  },
  create: function() {
    this.game.state.start('Preloader');
  }
};