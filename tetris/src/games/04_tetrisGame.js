Tetris.Game = function(game) {
};

Tetris.Game.prototype = {
  preload: function(){
    this.squaresinrow        = [],
    this.oldsquares          = [],
    this.change_rot_time     = 0,
    this.force_down          = 0,
    this.blockHeight         = 30,
    this.blockWidth          = 30,
    this.force_down_max_time = 500,
    this.squaresinrow.length = 0,
    this.oldsquares.length   = 0,
    this.scorePlayer         = 0,
    this.scoreTextPlayer     = null,
    this.buttonA             = null,
    this.buttonB             = null,
    this.buttonX             = null,
    this.buttonY             = null;
  },

  create : function(){
    var game = this;

    this.scale.fullScreenScaleMode = this.game.device.desktop ? Phaser.ScaleManager.SHOW_ALL : 
                                                                Phaser.ScaleManager.EXACT_FIT;
    if (!this.game.device.desktop){
      this.game.scale.forceOrientation(false, true);
      this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect, this);
      this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect, this);
    }

    function createBorders(){
      var graphics = game.add.graphics(0, 0);
      graphics.lineStyle(2, 0x000000, 1);
      graphics.drawRect(20, -1, 270, 592);

      graphics.lineStyle(2, 0x000000, 1);
      graphics.drawRect(320, 195, 150, 150);
    }
    
    function createButtons() {
      var fullscreenButton = game.add.button(game.world.width-42, 10, "fullscreenButton", game.goFull, game);
      fullscreenButton.input.useHandCursor = true;
      var pauseButton = game.add.button(game.world.width-74, 10, "pauseButton", game.pauseGame, game);
      pauseButton.input.useHandCursor = true;
    }

    function createPad(){
      game.buttonA = game.add.sprite(360, 500, 'xbox360', '360_A');
      game.buttonA.scale.setTo(0.75);
      game.buttonA.inputEnabled = true;
      game.buttonA.events.onInputDown.add(function(){game.keyDown.isDown = true;}, game);
      game.buttonA.events.onInputUp.add(function(){game.keyDown.isDown = false;}, game);

      game.buttonB = game.add.sprite(420, 437, 'xbox360', '360_B');
      game.buttonB.scale.setTo(0.75);
      game.buttonB.inputEnabled = true;
      game.buttonB.events.onInputDown.add(function(){game.keyRight.isDown = true;}, game);
      game.buttonB.events.onInputUp.add(function(){game.keyRight.isDown = false;}, game);

      game.buttonX = game.add.sprite(300, 437, 'xbox360', '360_X');
      game.buttonX.scale.setTo(0.75);
      game.buttonX.inputEnabled = true;
      game.buttonX.events.onInputDown.add(function(){game.keyLeft.isDown = true;}, game);
      game.buttonX.events.onInputUp.add(function(){game.keyLeft.isDown = false;}, game);

      game.buttonY = game.add.sprite(360, 375, 'xbox360', '360_Y');
      game.buttonY.scale.setTo(0.75);
      game.buttonY.inputEnabled = true;
      game.buttonY.events.onInputDown.add(function(){game.keyUp.isDown = true;}, game);
      game.buttonY.events.onInputUp.add(function(){game.keyUp.isDown = false;}, game);
    }

    function createText() {
      game.add.text(360, 100, 'Score: ', {font: 'Inconsolata', fontSize: 30}).anchor.setTo(0.5);
      game.scoreTextPlayer = game.add.text(460, 100, '000', {font: 'Inconsolata', fontSize: 30});
      game.scoreTextPlayer.anchor.setTo(0.5);
    }

    this.focusblock = new Block(this.game, 170, -40, this.chooseblock());
    this.focusblock.squares.map(function(square){square.events.onInputDown.add(game.rotateBlock, game);});
    this.nextblocktype = this.chooseblock();
    this.nextblock = new Block(this.game, 380, 270, this.nextblocktype);

    this.keyRight = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.keyLeft  = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.keyUp    = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.keyDown  = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    createButtons();
    createBorders();
    createPad();
    createText();

    //this.game.input.addMoveCallback(this.movePhone, this);

  },

  chooseblock : function(){
    var x = Math.floor(Math.random()*7);

    switch(x){
      case 0 : return 'o';
      case 1 : return 't';
      case 2 : return 'l';
      case 3 : return 'j';
      case 4 : return 'i';
      case 5 : return 's';
      case 6 : return 'z';
    }
  },

  checkcompletedlines : function(){
    var i, j;
    var top = this.game.world.bounds.height - 19*this.blockHeight - this.blockHeight/2;
    var row;
    
    for(i=0; i<20; i++){
      this.squaresinrow[i]=0;
    }

    for(i=0; i<this.oldsquares.length; i++){
      row = (this.oldsquares[i].y - top)/this.blockHeight;
      this.squaresinrow[row]++;
    }

    for(i=0; i<20; i++){
      if(this.squaresinrow[i]===9){
        this.scoreTextPlayer.setText(this.scorePlayer += 100);
        for(j=0; j<this.oldsquares.length; j++){
          if((this.oldsquares[j].y - top)/this.blockHeight==i){
            this.oldsquares[j].destroy();
            this.oldsquares.splice(j,1);
            j--;
          }
        }
      }
    }

    for(i=0; i<this.oldsquares.length; i++){
      for(j=0; j<20; j++){
        if(this.squaresinrow[j]===9){
          row = (this.oldsquares[i].y - top)/this.blockHeight;
          if(row<j)
            this.oldsquares[i].y += this.blockHeight;
        }
      }
    }
  },

  update : function(){
    this.playGame();
    this.moveKeyboard();
  },

  playGame: function(){
    var game = this;
    if(this.game.time.now>this.force_down && this.game.isRunning){
      if(this.focusblock.wallcollide(this.oldsquares,'down')!==true) 
        this.focusblock.move('down');
      else{
        this.focusblock.squares.map(function(square){
                                      game.oldsquares.push(square);
                                      square.loadTexture(game.focusblock.blockTexture2);
                                    });

        this.focusblock = new Block(this.game, 170, -40, this.nextblocktype);
        this.focusblock.squares.map(function(square){square.events.onInputDown.add(game.rotateBlock, game);});
        this.nextblocktype = this.chooseblock();
        this.nextblock.squares.map(function(square){square.destroy();});
        this.nextblock = new Block(this.game, 380, 270, this.nextblocktype);

        if(this.focusblock.wallcollide(this.oldsquares,'down')===true) this.game.state.start('EndMenu');
      }

      this.checkcompletedlines();
      this.force_down = this.game.time.now + this.force_down_max_time;
    }
  },

  moveKeyboard: function(){
    if(this.keyRight.isDown){
      this.moveBlock('right');
    }
    else if(this.keyLeft.isDown){
      this.moveBlock('left');
    }
    else if(this.keyDown.isDown){
      this.moveBlock('down');
    }
    else if(this.keyUp.isDown){
      this.rotateBlock();
    }
    else{
      this.buttonA.alpha = 1;
      this.buttonB.alpha = 1;
      this.buttonX.alpha = 1;
      this.buttonY.alpha = 1;
      this.force_down_max_time = 500;
    }
  },

  moveBlock: function(direction){
    switch(direction){
      case 'right': this.buttonB.alpha = 0.5; break;
      case 'left': this.buttonX.alpha = 0.5; break;
      case 'down': this.buttonA.alpha = 0.5; break;
    }
    
    if(this.game.time.now>this.change_rot_time){
      if(this.focusblock.wallcollide(this.oldsquares, direction)!==true) 
        this.focusblock.move(direction);
      this.change_rot_time = this.game.time.now + 100;
    }
  },

  rotateBlock: function(){
    this.buttonY.alpha = 0.5;
    if(this.game.time.now>this.change_rot_time){
      if(this.focusblock.rotatecollide(this.oldsquares) !== true)
        this.focusblock.rotate(); 
      this.change_rot_time = this.game.time.now + 100;
    }
  },

  movePhone: function(pointer, x){
    if (pointer.isDown && !pointer.justPressed(100)){

      if (x < 170) {
        if(this.game.time.now>this.change_rot_time){
          if(this.focusblock.wallcollide(this.oldsquares,'left')!==true)  
            this.focusblock.move('left');
          this.change_rot_time = this.game.time.now + 100;
        }
      } 
      if (x > 170) {
        if(this.game.time.now>this.change_rot_time){
          if(this.focusblock.wallcollide(this.oldsquares,'right')!==true)  
            this.focusblock.move('right');
          this.change_rot_time = this.game.time.now + 100;
        }
      }
    }
  },

  goFull: function() {
    this.game.scale.isFullScreen ? this.scale.stopFullScreen() : this.scale.startFullScreen();
  },

  pauseGame: function(){
    this.game.isRunning = (this.game.isRunning) ? false : true;
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
  },

  render: function() {

    //  Just renders out the pointer data when you touch the canvas
    //this.game.debug.pointer(this.game.input.mousePointer);
    //this.game.debug.pointer(this.game.input.pointer1);
  }
};

