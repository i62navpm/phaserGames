Pong.Game = function(game) {};

Pong.Game.prototype = {

  preload: function() {
    this.ballSprite        = null,
    this.ballRadius        = 20,
    this.ballTexture1      = null,
    this.ballTexture2      = null,
    this.playerSprite      = null, 
    this.opponentSprite    = null, 
    this.betGroup          = null,
    this.widthBet          = 20,
    this.heightBet         = 80,
    this.widthDotLine      = 4,
    this.scorePlayer       = 0,
    this.scoreOpponent     = 0,
    this.scoreTextPlayer   = null,
    this.scoreTextOpponent = null;

    this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.game.scale.forceOrientation(true, false);
    this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect, this);
    this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect, this);
  },

  create: function() {
    var game          = this,
        graphics      = null,
        renderTexture = null;

    this.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.scale.fullScreenScaleMode = this.game.device.desktop ? Phaser.ScaleManager.NO_SCALE : 
                                                                Phaser.ScaleManager.EXACT_FIT;

    function createButtons() {
      var fullscreenButton = game.add.button(game.world.width-42, 10, "fullscreenButton", game.goFull, game);
      fullscreenButton.input.useHandCursor = true;
      var pauseButton = game.add.button(game.world.width-74, 10, "pauseButton", game.pauseGame, game);
      pauseButton.input.useHandCursor = true;
    }

    function createLines() {
     var dotLine = game.add.bitmapData(game.world.width/2 + game.widthDotLine, game.world.height);
  
      dotLine.ctx.beginPath();
      dotLine.ctx.lineWidth = game.widthDotLine;
      dotLine.ctx.strokeStyle = 'white';
      dotLine.ctx.setLineDash([10, 10]);
      dotLine.ctx.moveTo(game.world.centerX, 0);
      dotLine.ctx.lineTo(game.world.centerX, game.world.height);
      dotLine.ctx.stroke();
      dotLine.ctx.closePath();
      game.add.sprite(0, 0, dotLine); 
    }

    function createBets() {
      game.betGroup = game.add.group(game.world, 'betGroup', false, true, Phaser.Physics.ARCADE);
      
      graphics = game.make.graphics(0,0);
      graphics.beginFill(0x049e0c);
      graphics.drawRect(0, 0, game.widthBet, game.heightBet);
      
      renderTexture = game.add.renderTexture(game.widthBet, game.heightBet);
      renderTexture.renderXY(graphics, 0, 0, true);
      
      game.playerSprite = game.betGroup.create(50, game.world.centerY, renderTexture);
      game.opponentSprite = game.betGroup.create(game.world.width - 50, game.world.centerY, renderTexture);

      game.betGroup.callAll('anchor.set', 'anchor', 0.5);
      game.betGroup.setAll('body.immovable', true);
    }

    function preparePlayerBet() {
      game.playerSprite.hitArea = new Phaser.Circle(0, 0, 200);
      game.playerSprite.inputEnabled = true;
      game.playerSprite.input.enableDrag();
      game.playerSprite.input.boundsRect = new Phaser.Rectangle(50 - game.widthBet/2, 
                                                           -game.heightBet/2,
                                                            50 + game.widthBet/2, 
                                                           game.world.height + game.heightBet);
      game.playerSprite.input.allowHorizontalDrag = false;
      game.playerSprite.body.moves = false;
    }

    function createBall() {
      graphics = game.make.graphics(0,0);
      graphics.beginFill(0xffa700);
      graphics.drawCircle(game.ballRadius/2, game.ballRadius/2, game.ballRadius);
      
      game.ballTexture1 = game.add.renderTexture(game.ballRadius, game.ballRadius);
      game.ballTexture1.renderXY(graphics, 0, 0, true);
      
      graphics.beginFill(0x0057e7);
      graphics.drawCircle(game.ballRadius/2, game.ballRadius/2, game.ballRadius);

      game.ballTexture2 = game.add.renderTexture(game.ballRadius, game.ballRadius);
      game.ballTexture2.renderXY(graphics, 0, 0, true);
      
      game.ballSprite = game.add.sprite(game.world.centerX, game.world.centerY, game.ballTexture1);

      game.physics.enable(game.ballSprite, Phaser.Physics.ARCADE);
      
      game.ballSprite.body.velocity.setTo(300, 300);
      game.ballSprite.body.collideWorldBounds = true;
      game.ballSprite.body.bounce.set(1);
    }

    function createText() {
      game.scoreTextPlayer = game.add.text(game.world.centerX-50, 50, "" + game.scorePlayer, 
                                      {font: 'Inconsolata', fontSize: 60});
      game.scoreTextPlayer.anchor.setTo(0.5);
      
      game.scoreTextOpponent = game.add.text(game.world.centerX+50, 50, "" + game.scoreOpponent, 
                                        {font: 'Inconsolata', fontSize: 60});
      game.scoreTextOpponent.anchor.setTo(0.5);
    }

    createButtons();
    createLines();
    createText();
    createBets();
    preparePlayerBet();
    createBall();
  },

  update: function() {
    this.physics.arcade.collide(this.ballSprite, this.betGroup, this.conlisionRaqueta);
    this.moveOpponent();
    this.movePlayer();
    this.changeBallColor();
    this.checkGoal();
  },

  render: function() {
    // Sprite debug info
    //this.game.debug.spriteInfo(this.ballSprite, 32, 32);
  },

  

  setBall: function(goal) {
    this.ballSprite.x = this.world.centerX;
    this.ballSprite.y = this.world.centerY;
    goal === 'player' ? this.ballSprite.body.velocity.setTo(-300, 300) :
                        this.ballSprite.body.velocity.setTo(300, 300);
  },
  
  changeBallColor: function() {
    Math.round(this.ballSprite.x/(this.world.width/5))%2 === 0 ? this.ballSprite.loadTexture(this.ballTexture2):
                                                                 this.ballSprite.loadTexture(this.ballTexture1);
  },

  checkGoal: function() {
    if (this.ballSprite.x === 0) {
      this.setBall('opponent');
      this.scoreTextOpponent.setText(this.scoreOpponent += 1);
      if(this.scoreOpponent === 5)
        this.game.state.start('EndMenu');
    } else if (this.ballSprite.x === this.world.width - this.ballRadius) {
      this.setBall('player');
      this.scoreTextPlayer.setText(this.scorePlayer += 1);
      if(this.scorePlayer === 5)
        this.game.state.start('EndMenu');
    }
  },

  moveOpponent: function() {
    if (this.opponentSprite.y - this.ballSprite.y < -15) {
      this.opponentSprite.body.velocity.y = 200;
    } else if(this.opponentSprite.y - this.ballSprite.y > 15) {
      this.opponentSprite.body.velocity.y = -200;
    } else {
      this.opponentSprite.body.velocity.y = 0;
    }
  },

  movePlayer: function() {
    if (this.input.keyboard.isDown(Phaser.Keyboard.UP) && this.playerSprite.y > 0){
      this.playerSprite.y -= 10;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.playerSprite.y < this.world.height){
      this.playerSprite.y += 10;
    }
  },
  
  conlisionRaqueta: function(_ball, _bet) {
    var diff = 0;
    if (_ball.y < _bet.y) {
      diff = _bet.y - _ball.y;
      _ball.body.velocity.y = (-10 * diff);
    } else if (_ball.y > _bet.y) {
      diff = _ball.y -_bet.y;
      _ball.body.velocity.y = (10 * diff);
    } else {
      _ball.body.velocity.y = 2 + Math.random() * 10;
    }
  },

  goFull: function() {
    this.game.scale.isFullScreen ? this.scale.stopFullScreen() : this.scale.startFullScreen();
  },

  pauseGame: function(){
    this.physics.arcade.isPaused = (this.physics.arcade.isPaused) ? false : true;
  },

  handleIncorrect: function(){
    if(!this.game.device.desktop){
     this.game.paused = true;
     document.getElementById("turn").style.display="block";
    }
  },

  handleCorrect: function(){
    if(!this.game.device.desktop){
      this.game.paused = false;
        document.getElementById("turn").style.display="none";
    }
  }

};
