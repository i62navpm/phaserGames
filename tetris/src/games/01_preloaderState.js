Tetris.Preloader = function(game) {};

Tetris.Preloader.prototype = {
  preload: function() {
    this.stage.backgroundColor = '#ffffff';

    var text = this.add.text(this.world.centerX, 100, "Loading ...");
    text.anchor.set(0.5);

    var loadingBar = this.add.sprite(this.world.centerX, this.world.centerY,"loading");
    loadingBar.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(loadingBar);
    
    WebFontConfig = {
        google: {
            families: ['Inconsolata::latin']
        }
    };
    this.load.script('webfont', ('https:' == document.location.protocol ? 'https' : 'http') +
                                 '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    
    this.load.spritesheet('buttonStart', 'assets/buttonStart.png', 146, 51);
    this.load.image('fullscreenButton','assets/fullscreenButton32.png');
    this.load.image('pauseButton','assets/pauseButton32.png');
    this.load.atlas('xbox360', 'assets/xbox360.png', 'assets/xbox360.json');
},
  create: function() {
    this.game.state.start('MainMenu');
  }
};