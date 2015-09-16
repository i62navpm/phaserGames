DragMe.MainMenu = function(game) {};

DragMe.MainMenu.prototype = {
  create: function() {
    var text = this.add.text(this.world.centerX, 100, "DRAG ME");
    text.anchor.set(0.5);
    text.align = 'center';
    text.font = 'Arial';
    text.fontWeight = 'bold';
    text.fontSize = 70;
    text.fill = '#000000';
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    
    var textReflect = this.add.text(this.world.centerX, 150, "DRAG ME");
    //  Centers the text
    textReflect.anchor.set(0.5);
    textReflect.align = 'center';
    textReflect.scale.y = -1;
    //  Our font + size
    textReflect.font = 'Arial';
    textReflect.fontWeight = 'bold';
    textReflect.fontSize = 70;
    //  Here we create a linear gradient on the Text context.
    //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
    var grd = textReflect.context.createLinearGradient(0, 0, 0, text.canvas.height);
    //  Add in 2 color stops
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(1, 'rgba(0,0,0,0.08)');
    //  And apply to the Text
    textReflect.fill = grd;


    this.startButton = this.add.button(this.world.centerX, 225, 'buttonStart', this.startGame, this, 2, 0, 1);
    this.startButton.anchor.set(0.5,0);
    this.startButton.input.useHandCursor = true;
  },
  startGame: function() {
    this.game.state.start('Game');
  }
};