Block = function(game, x, y, type){
  this.blockHeight = 30;
  this.blockWidth  = 30;
  
  this.blockTexture1 = null;
  this.blockTexture2 = null;

  this.boundLeft  = 21;
  this.boundRight = 280;

  this.centerX = x;
  this.centerY = y;

  this.blocktype  = type;  

  this.game = game;

  this.squares = [];

  this.md = (this.blockWidth) / 2;
  this.setupsquares();

};

Block.prototype = {
  setupsquares : function(){
    var game = this;
    this.squares.length = 0;

    var graphics = this.game.make.graphics(0,0);
    graphics.beginFill(0xff0000);
    graphics.lineStyle(1, 0x000000, 1);
    graphics.drawRect(0, 0, 30, 30);
    
    this.blockTexture1 = this.game.add.renderTexture(30, 30);
    this.blockTexture1.renderXY(graphics, 0, 0, true);

    graphics.beginFill(0x0000ff);
    graphics.lineStyle(1, 0x000000, 1);
    graphics.drawRect(0, 0, 30, 30);
    
    this.blockTexture2 = this.game.add.renderTexture(30, 30);
    this.blockTexture2.renderXY(graphics, 0, 0, true);
    
    switch(this.blocktype){

      case 'o' :  this.squares[0] = this.game.add.sprite(this.centerX-this.md,this.centerY-this.md, this.blockTexture1);
                  this.squares[1] = this.game.add.sprite(this.centerX-this.md,this.centerY+this.md, this.blockTexture1);
                  this.squares[2] = this.game.add.sprite(this.centerX+this.md,this.centerY+this.md, this.blockTexture1);
                  this.squares[3] = this.game.add.sprite(this.centerX+this.md,this.centerY-this.md, this.blockTexture1);
                  break;
      case 't' :  this.squares[0] = this.game.add.sprite(this.centerX+this.md,this.centerY-this.md, this.blockTexture1);
                  this.squares[1] = this.game.add.sprite(this.centerX+this.md,this.centerY+this.md, this.blockTexture1);
                  this.squares[2] = this.game.add.sprite(this.centerX-this.md,this.centerY+this.md, this.blockTexture1);
                  this.squares[3] = this.game.add.sprite(this.centerX+this.md*3,this.centerY+this.md, this.blockTexture1);
                  break;
      case 'l' :  this.squares[0] = this.game.add.sprite(this.centerX-this.md,this.centerY-this.md, this.blockTexture1);
                  this.squares[1] = this.game.add.sprite(this.centerX-this.md,this.centerY+this.md, this.blockTexture1);
                  this.squares[2] = this.game.add.sprite(this.centerX-this.md,this.centerY+this.md*3, this.blockTexture1);
                  this.squares[3] = this.game.add.sprite(this.centerX+this.md,this.centerY+this.md*3, this.blockTexture1);
                  break;
      case 'j' :  this.squares[0] = this.game.add.sprite(this.centerX+this.md,this.centerY-this.md, this.blockTexture1);
                  this.squares[1] = this.game.add.sprite(this.centerX+this.md,this.centerY+this.md, this.blockTexture1);
                  this.squares[2] = this.game.add.sprite(this.centerX+this.md,this.centerY+this.md*3, this.blockTexture1);
                  this.squares[3] = this.game.add.sprite(this.centerX-this.md,this.centerY+this.md*3, this.blockTexture1);
                  break;
      case 'i' :  this.squares[0] = this.game.add.sprite(this.centerX+this.md,this.centerY-this.md*3, this.blockTexture1);
                  this.squares[1] = this.game.add.sprite(this.centerX+this.md,this.centerY-this.md, this.blockTexture1);
                  this.squares[2] = this.game.add.sprite(this.centerX+this.md,this.centerY+this.md, this.blockTexture1);
                  this.squares[3] = this.game.add.sprite(this.centerX+this.md,this.centerY+this.md*3, this.blockTexture1);
                  break;
      case 's' :  this.squares[0] = this.game.add.sprite(this.centerX+this.md*3,this.centerY-this.md, this.blockTexture1);
                  this.squares[1] = this.game.add.sprite(this.centerX+this.md,this.centerY-this.md, this.blockTexture1);
                  this.squares[2] = this.game.add.sprite(this.centerX+this.md,this.centerY+this.md, this.blockTexture1);
                  this.squares[3] = this.game.add.sprite(this.centerX-this.md,this.centerY+this.md, this.blockTexture1);
                  break;
      case 'z' :  this.squares[0] = this.game.add.sprite(this.centerX-this.md,this.centerY-this.md, this.blockTexture1);
                  this.squares[1] = this.game.add.sprite(this.centerX+this.md,this.centerY-this.md, this.blockTexture1);
                  this.squares[2] = this.game.add.sprite(this.centerX+this.md,this.centerY+this.md, this.blockTexture1);
                  this.squares[3] = this.game.add.sprite(this.centerX+this.md*3,this.centerY+this.md, this.blockTexture1);
                  break;
    }

    for(var i=0;i<this.squares.length;i++){
      this.squares[i].anchor.setTo(0.5,0.5);
      this.squares[i].inputEnabled = true;
    } 
  },

  move : function(dir){
    switch(dir){
      case 'left':   
        this.centerX -= this.blockWidth;
        for(var i=0;i<this.squares.length;i++){
          this.squares[i].x -= this.blockWidth;
        }
        break;
      case 'right':
        this.centerX += this.blockWidth;
        for(i=0;i<this.squares.length;i++){
          this.squares[i].x += this.blockWidth;
        }
        break;
      case 'down':
        this.centerY += this.blockHeight;
        for(i=0;i<this.squares.length;i++){
          this.squares[i].y += this.blockHeight;
        }
        break;
    }
  },

  rotate : function(){
    var x1,x2,y1,y2;
    for (var i=0; i<this.squares.length; i++){
      // Get the center of the current square
      x1 = this.squares[i].x;
      y1 = this.squares[i].y;

      // Move the square so it's positioned at the origin 
      x1 -= this.centerX;
      y1 -= this.centerY;

      // Do the actual rotation
      x2 = - y1;
      y2 = x1;

      // Move the square back to its proper location 
      x2 += this.centerX;
      y2 += this.centerY;
  
      // Set the square's location to our temporary variables 
      this.squares[i].x = x2;
      this.squares[i].y = y2;
      }
  },

  getrotated : function(){
    var temp_array = [],
        x1, y1, x2, y2;
    for (var i=0; i<this.squares.length; i++){    
      x1 = this.squares[i].x;
      y1 = this.squares[i].y;
      x1 -= this.centerX;
      y1 -= this.centerY;

      x2 = - y1;
      y2 = x1;
      x2 += this.centerX;
      y2 += this.centerY;

      // Instead of setting the squares, we just store the values
      temp_array[i*2]   = x2;
      temp_array[i*2+1] = y2;
    }
    return temp_array;
  },

  wallcollide : function(oldsquares, dir){
    var i, j;
    var len = oldsquares.length;
    if(len === 0){
      switch(dir){
        case 'left' : 
          for(i=0;i<4;i++){
            if(this.squares[i].x-2*this.md<this.boundLeft) return true;
          }
          break;

        case 'right' : 
          for(i=0;i<4;i++){
            if(this.squares[i].x+2*this.md>this.boundRight) return true;
          }
          break;

        case 'down' : 
          for(i=0;i<4;i++){
            if(this.squares[i].y+2*this.md>this.game.world.height) return true;
          }
          break;

        default : return false;
      }
    } else{
      switch(dir){
        case 'left'  :  
          for(i=0;i<4;i++){
            for(j=0;j<len;j++){
              if(
                 (this.squares[i].x-2*this.md<this.boundLeft) ||
                 (this.squares[i].x>oldsquares[j].x&&this.squares[i].x-3*this.md<oldsquares[j].x&&this.squares[i].y===oldsquares[j].y)
                ) return true;
            }
          }
        break;

        case 'right' :  
          for(i=0;i<4;i++){
            for(j=0;j<len;j++){
              if(
                (this.squares[i].x+2*this.md>this.boundRight) ||
                (this.squares[i].x<oldsquares[j].x&&this.squares[i].x+3*this.md>oldsquares[j].x&&this.squares[i].y===oldsquares[j].y)
                ) return true;
            }
          }
          break;

        case 'down'  :  
          for(i=0;i<4;i++){
            for(j=0;j<len;j++){
              if(this.squares[i].y+2*this.md>this.game.world.bounds.height||(this.squares[i].y<oldsquares[j].y&&this.squares[i].y+3*this.md>oldsquares[j].y&&this.squares[i].x==oldsquares[j].x)) return true;
            }
          }
          break;

        default: return false; 
      }
    }
  },

  rotatecollide : function(oldsquares){
    var arr = this.getrotated();
    var len = oldsquares.length;

    for(var i=0;i<4;i++){
      if ( (arr[i*2] < this.boundLeft) ||  (arr[i*2] > this.boundRight) ) return true;
      if(arr[i*2+1]>this.game.world.bounds.height) return true;
      for(var j=0;j<len;j++){
        if ( ( Math.abs(arr[i*2] - oldsquares[j].x) < this.blockWidth ) && ( Math.abs(arr[i*2+1] - oldsquares[j].y) < this.blockHeight ) ){
          return true;
        }
      }
    }
    return false;
  }
};
