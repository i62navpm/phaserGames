Pong.EndMenu = function(game) {};

Pong.EndMenu.prototype = {
  create: function() {
    var text = this.add.text(this.world.centerX, 100, "Game Over");
    text.anchor.set(0.5);
    text.align = 'center';
    text.font = 'Arial';
    text.fontWeight = 'bold';
    text.fontSize = 70;
    text.fill = '#000000';
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

    this.startButton = this.add.button(this.world.centerX, 225, 'buttonStart', this.startGame, this, 2, 0, 1);
    this.startButton.anchor.set(0.5,0);
    this.startButton.input.useHandCursor = true;
  },
  startGame: function() {
    this.game.state.start('Game');
  }
};