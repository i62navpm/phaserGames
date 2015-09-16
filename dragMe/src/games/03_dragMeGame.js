DragMe.Game = function(game) {};

DragMe.Game.prototype = {

  preload: function() {
    this.playerSprite   = null,
    this.playerSize     = 50,
    this.rectInt        = null,
    this.rectExt        = null,
    this.widthRectLine  = 4,
    this.opponentGroup  = null,
    this.playerSprite   = null,
    this.timer          = null,
    this.timeText       = 0,
    this.spriteTimeText = null,
    this.oppNubmber     = 4,
    this.oppPositions   = [];

    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.game.scale.forceOrientation(true, false);
    this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect, this);
    this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect, this);
  },

  create: function() {
    var game = this;

    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    function RoundedRect(width, height, radius, fillColor) {
      var rectLine = game.make.bitmapData(width+game.widthRectLine, height+game.widthRectLine);
      var x = game.widthRectLine/2,
          y = game.widthRectLine/2;
      rectLine.ctx.beginPath();
      rectLine.ctx.moveTo(x + radius, y);
      rectLine.ctx.lineTo(x + width - radius, y);
      rectLine.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      rectLine.ctx.lineTo(x + width, y + height - radius);
      rectLine.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      rectLine.ctx.lineTo(x + radius, y + height);
      rectLine.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      rectLine.ctx.lineTo(x, y + radius);
      rectLine.ctx.quadraticCurveTo(x, y, x + radius, y);
      rectLine.ctx.closePath();
      rectLine.ctx.strokeStyle = 'blue';
      rectLine.ctx.lineWidth = game.widthRectLine;
      rectLine.ctx.stroke();
      rectLine.ctx.fillStyle = fillColor;
      rectLine.ctx.fill();
      return rectLine;
    }

    function createButtons() {
      var fullscreenButton = game.add.button(game.world.width-42, 10, 'fullscreenButton', game.goFull, game);
      fullscreenButton.input.useHandCursor = true;
    }

    function createExtRectangle() {
      game.rectInt = game.add.sprite(0,0, RoundedRect(400-game.widthRectLine,400-game.widthRectLine, 10, '#dfe3ee'));
      game.physics.enable(game.rectInt, Phaser.Physics.ARCADE);
    }

    function createIntRectangle() {
      game.rectInt = game.add.sprite(game.world.centerX, game.world.centerY, RoundedRect(300,300, 10, 'white'));
      game.rectInt.anchor.setTo(0.5);
      game.physics.enable(game.rectInt, Phaser.Physics.ARCADE);
    }

    function createOpponents() {
      function initPosition(){
        game.oppPositions = [{x:50, y:game.world.centerY-50, width:50, height:50},
                             {x:game.world.width-50, y:game.world.centerY-50, width:75, height:25},
                             {x:50, y:game.world.centerY+50, width:25, height:75},
                             {x:game.world.width-50, y:game.world.centerY+50, width:50, height:50}];
      }

      initPosition();
      game.opponentGroup = game.add.group(game.world, 'opponentGroup', false, true, Phaser.Physics.ARCADE);
      for(var i=0; i<game.oppNubmber; i++){
        game.opponentGroup.create(game.oppPositions[i].x, game.oppPositions[i].y, RoundedRect(game.oppPositions[i].width, 
                                                                                              game.oppPositions[i].height,
                                                                                              10,
                                                                                              'red')
                                  );
      }
      game.opponentGroup.callAll('anchor.set', 'anchor', 0.5);
      game.opponentGroup.callAll('body.bounce.set', 'body.bounce', 1);
      game.opponentGroup.setAll('body.collideWorldBounds', true);
    }

    function createPlayer() {
      game.playerSprite = game.add.sprite(game.world.centerX, game.world.centerY, RoundedRect(game.playerSize,game.playerSize,10,'yellow'));
      game.playerSprite.anchor.setTo(0.5);
      game.playerSprite.inputEnabled = true;
      game.playerSprite.input.enableDrag();
      
      game.physics.enable(game.playerSprite, Phaser.Physics.ARCADE);
      game.playerSprite.body.moves = false;
      game.playerSprite.events.onDragStart.addOnce(game.onDragStart, game);
    }

    function createText() {
      game.timer = game.game.time.create(false);
      game.timer.loop(100, game.updateCounter, game);
      game.spriteTimeText = game.add.text(100, 30, '00:00:00', {font: 'Inconsolata', fontSize: 40});
      game.spriteTimeText.anchor.setTo(0.5);
    }
    
    createExtRectangle();
    createIntRectangle();
    createOpponents();
    createPlayer();
    createButtons();
    createText();
  },

  updateCounter: function() {
    this.timeText++;
    var time = new Date((this.timeText)*100);

    var minutes = (time.getMinutes()<9)?"0"+time.getMinutes():time.getMinutes();
    var seconds = (time.getSeconds()<=9)?"0"+time.getSeconds():time.getSeconds();
    var milliSeconds = (time.getMilliseconds()/100<=9)?"0"+time.getMilliseconds()/100:time.getMilliseconds()/100;
    this.spriteTimeText.setText(minutes + ':'+ seconds + ':'+ milliSeconds);
  },

  update: function() {
    this.physics.arcade.collide(this.opponentGroup, this.opponentGroup);
    this.physics.arcade.collide(this.playerSprite, this.opponentGroup, this.resetGame, null, this);
    this.rectangleIntCollide();
  },

  render: function() {
    // Sprite debug info
    //this.game.debug.spriteInfo(this.playerSprite, 32, 32);
  },

  rectangleIntCollide: function(){
    this.playerSprite.x - (this.playerSize/2) < 50  ? this.resetGame() :
    this.playerSprite.x + (this.playerSize/2) > 350 ? this.resetGame() :
    this.playerSprite.y - (this.playerSize/2) < 50  ? this.resetGame() :
    this.playerSprite.y + (this.playerSize/2) > 350 ? this.resetGame() : null;
  },

  onDragStart: function(){
    this.timeText = 0;
    this.timer.start();
    this.opponentGroup.forEach(function(child){child.body.velocity.setTo(Math.random() > 0.5 ? 150*-1: 150, 
                                                                         Math.random() > 0.5 ? 150*-1: 150);},
                              'this');
  },

  resetGame: function() {
    var game = this;
    this.timer.stop(false);
    this.playerSprite.x = this.world.centerX;
    this.playerSprite.y = this.world.centerY;
    
    this.playerSprite.input.disableDrag();
    this.opponentGroup.forEach(function(child){
                                                child.body.velocity.setTo(0,0);
                                                var indexChild = game.opponentGroup.getIndex(child);
                                                child.position.x = game.oppPositions[indexChild].x;
                                                child.position.y = game.oppPositions[indexChild].y;
                                              },
                              'this');
    this.playerSprite.events.onDragStart.addOnce(this.onDragStart, this);
    this.playerSprite.input.enableDrag();
  },

  goFull: function() {
    this.game.scale.isFullScreen ? this.scale.stopFullScreen() : this.scale.startFullScreen();
  },

  handleIncorrect: function(){
    if(!this.game.device.desktop){
     this.game.paused = true;
     document.getElementById('turn').style.display='block';
    }
  },

  handleCorrect: function(){
    if(!this.game.device.desktop){
      this.game.paused = false;
        document.getElementById('turn').style.display='none';
    }
  }
};
