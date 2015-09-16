var DragMe={};DragMe.Boot=function(t){},DragMe.Boot.prototype={preload:function(){this.game.load.image("loading","assets/loading.png")},create:function(){this.game.state.start("Preloader")}},DragMe.Preloader=function(t){},DragMe.Preloader.prototype={preload:function(){var t=this.add.text(this.world.centerX,100,"Loading ...");t.anchor.set(.5);var e=this.add.sprite(this.world.centerX,this.world.centerY,"loading");e.anchor.setTo(.5,.5),this.load.setPreloadSprite(e),WebFontConfig={google:{families:["Inconsolata::latin"]}},this.load.script("webfont",("https:"==document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"),this.load.spritesheet("buttonStart","assets/buttonStart.png",146,51),this.load.image("fullscreenButton","assets/fullscreenButton32.png")},create:function(){this.game.state.start("MainMenu")}},DragMe.MainMenu=function(t){},DragMe.MainMenu.prototype={create:function(){var t=this.add.text(this.world.centerX,100,"DRAG ME");t.anchor.set(.5),t.align="center",t.font="Arial",t.fontWeight="bold",t.fontSize=70,t.fill="#000000",t.setShadow(3,3,"rgba(0,0,0,0.5)",5);var e=this.add.text(this.world.centerX,150,"DRAG ME");e.anchor.set(.5),e.align="center",e.scale.y=-1,e.font="Arial",e.fontWeight="bold",e.fontSize=70;var i=e.context.createLinearGradient(0,0,0,t.canvas.height);i.addColorStop(0,"rgba(0,0,0,0)"),i.addColorStop(1,"rgba(0,0,0,0.08)"),e.fill=i,this.startButton=this.add.button(this.world.centerX,225,"buttonStart",this.startGame,this,2,0,1),this.startButton.anchor.set(.5,0),this.startButton.input.useHandCursor=!0},startGame:function(){this.game.state.start("Game")}},DragMe.Game=function(t){},DragMe.Game.prototype={preload:function(){this.playerSprite=null,this.playerSize=50,this.rectInt=null,this.rectExt=null,this.widthRectLine=4,this.opponentGroup=null,this.playerSprite=null,this.timer=null,this.timeText=0,this.spriteTimeText=null,this.oppNubmber=4,this.oppPositions=[],this.game.scale.scaleMode=Phaser.ScaleManager.NO_SCALE,this.game.scale.forceOrientation(!0,!1),this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect,this),this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect,this)},create:function(){function t(t,e,i,n){var r=s.make.bitmapData(t+s.widthRectLine,e+s.widthRectLine),o=s.widthRectLine/2,a=s.widthRectLine/2;return r.ctx.beginPath(),r.ctx.moveTo(o+i,a),r.ctx.lineTo(o+t-i,a),r.ctx.quadraticCurveTo(o+t,a,o+t,a+i),r.ctx.lineTo(o+t,a+e-i),r.ctx.quadraticCurveTo(o+t,a+e,o+t-i,a+e),r.ctx.lineTo(o+i,a+e),r.ctx.quadraticCurveTo(o,a+e,o,a+e-i),r.ctx.lineTo(o,a+i),r.ctx.quadraticCurveTo(o,a,o+i,a),r.ctx.closePath(),r.ctx.strokeStyle="blue",r.ctx.lineWidth=s.widthRectLine,r.ctx.stroke(),r.ctx.fillStyle=n,r.ctx.fill(),r}function e(){var t=s.add.button(s.world.width-42,10,"fullscreenButton",s.goFull,s);t.input.useHandCursor=!0}function i(){s.rectInt=s.add.sprite(0,0,t(400-s.widthRectLine,400-s.widthRectLine,10,"#dfe3ee")),s.physics.enable(s.rectInt,Phaser.Physics.ARCADE)}function n(){s.rectInt=s.add.sprite(s.world.centerX,s.world.centerY,t(300,300,10,"white")),s.rectInt.anchor.setTo(.5),s.physics.enable(s.rectInt,Phaser.Physics.ARCADE)}function r(){function e(){s.oppPositions=[{x:50,y:s.world.centerY-50,width:50,height:50},{x:s.world.width-50,y:s.world.centerY-50,width:75,height:25},{x:50,y:s.world.centerY+50,width:25,height:75},{x:s.world.width-50,y:s.world.centerY+50,width:50,height:50}]}e(),s.opponentGroup=s.add.group(s.world,"opponentGroup",!1,!0,Phaser.Physics.ARCADE);for(var i=0;i<s.oppNubmber;i++)s.opponentGroup.create(s.oppPositions[i].x,s.oppPositions[i].y,t(s.oppPositions[i].width,s.oppPositions[i].height,10,"red"));s.opponentGroup.callAll("anchor.set","anchor",.5),s.opponentGroup.callAll("body.bounce.set","body.bounce",1),s.opponentGroup.setAll("body.collideWorldBounds",!0)}function o(){s.playerSprite=s.add.sprite(s.world.centerX,s.world.centerY,t(s.playerSize,s.playerSize,10,"yellow")),s.playerSprite.anchor.setTo(.5),s.playerSprite.inputEnabled=!0,s.playerSprite.input.enableDrag(),s.physics.enable(s.playerSprite,Phaser.Physics.ARCADE),s.playerSprite.body.moves=!1,s.playerSprite.events.onDragStart.addOnce(s.onDragStart,s)}function a(){s.timer=s.game.time.create(!1),s.timer.loop(100,s.updateCounter,s),s.spriteTimeText=s.add.text(100,30,"00:00:00",{font:"Inconsolata",fontSize:40}),s.spriteTimeText.anchor.setTo(.5)}var s=this;this.physics.startSystem(Phaser.Physics.ARCADE),this.scale.fullScreenScaleMode=Phaser.ScaleManager.SHOW_ALL,i(),n(),r(),o(),e(),a()},updateCounter:function(){this.timeText++;var t=new Date(100*this.timeText),e=t.getMinutes()<9?"0"+t.getMinutes():t.getMinutes(),i=t.getSeconds()<=9?"0"+t.getSeconds():t.getSeconds(),n=t.getMilliseconds()/100<=9?"0"+t.getMilliseconds()/100:t.getMilliseconds()/100;this.spriteTimeText.setText(e+":"+i+":"+n)},update:function(){this.physics.arcade.collide(this.opponentGroup,this.opponentGroup),this.physics.arcade.collide(this.playerSprite,this.opponentGroup,this.resetGame,null,this),this.rectangleIntCollide()},render:function(){},rectangleIntCollide:function(){this.playerSprite.x-this.playerSize/2<50?this.resetGame():this.playerSprite.x+this.playerSize/2>350?this.resetGame():this.playerSprite.y-this.playerSize/2<50?this.resetGame():this.playerSprite.y+this.playerSize/2>350?this.resetGame():null},onDragStart:function(){this.timeText=0,this.timer.start(),this.opponentGroup.forEach(function(t){t.body.velocity.setTo(Math.random()>.5?-150:150,Math.random()>.5?-150:150)},"this")},resetGame:function(){var t=this;this.timer.stop(!1),this.playerSprite.x=this.world.centerX,this.playerSprite.y=this.world.centerY,this.playerSprite.input.disableDrag(),this.opponentGroup.forEach(function(e){e.body.velocity.setTo(0,0);var i=t.opponentGroup.getIndex(e);e.position.x=t.oppPositions[i].x,e.position.y=t.oppPositions[i].y},"this"),this.playerSprite.events.onDragStart.addOnce(this.onDragStart,this),this.playerSprite.input.enableDrag()},goFull:function(){this.game.scale.isFullScreen?this.scale.stopFullScreen():this.scale.startFullScreen()},handleIncorrect:function(){this.game.device.desktop||(this.game.paused=!0,document.getElementById("turn").style.display="block")},handleCorrect:function(){this.game.device.desktop||(this.game.paused=!1,document.getElementById("turn").style.display="none")}},DragMe.EndMenu=function(t){},DragMe.EndMenu.prototype={create:function(){var t=this.add.text(this.world.centerX,100,"Game Over");t.anchor.set(.5),t.align="center",t.font="Arial",t.fontWeight="bold",t.fontSize=70,t.fill="#000000",t.setShadow(3,3,"rgba(0,0,0,0.5)",5),this.startButton=this.add.button(this.world.centerX,225,"buttonStart",this.startGame,this,2,0,1),this.startButton.anchor.set(.5,0),this.startButton.input.useHandCursor=!0},startGame:function(){this.game.state.start("Game")}},function(){var t=new Phaser.Game(400,400,Phaser.CANVAS,"",null,!0);t.state.add("Boot",DragMe.Boot),t.state.add("Preloader",DragMe.Preloader),t.state.add("MainMenu",DragMe.MainMenu),t.state.add("Game",DragMe.Game),t.state.add("EndMenu",DragMe.EndMenu),t.state.start("Boot")}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAwX2Jvb3RTdGF0ZS5qcyIsIjAxX3ByZWxvYWRlclN0YXRlLmpzIiwiMDJfbWFpbk1lbnVTdGF0ZS5qcyIsIjAzX2RyYWdNZUdhbWUuanMiLCIwNF9lbmRTdGF0ZS5qcyIsIjk5X2dhbWUuanMiXSwibmFtZXMiOlsiRHJhZ01lIiwiQm9vdCIsImdhbWUiLCJwcm90b3R5cGUiLCJwcmVsb2FkIiwidGhpcyIsImxvYWQiLCJpbWFnZSIsImNyZWF0ZSIsInN0YXRlIiwic3RhcnQiLCJQcmVsb2FkZXIiLCJ0ZXh0IiwiYWRkIiwid29ybGQiLCJjZW50ZXJYIiwiYW5jaG9yIiwic2V0IiwibG9hZGluZ0JhciIsInNwcml0ZSIsImNlbnRlclkiLCJzZXRUbyIsInNldFByZWxvYWRTcHJpdGUiLCJXZWJGb250Q29uZmlnIiwiZ29vZ2xlIiwiZmFtaWxpZXMiLCJzY3JpcHQiLCJkb2N1bWVudCIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJzcHJpdGVzaGVldCIsIk1haW5NZW51IiwiYWxpZ24iLCJmb250IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiZmlsbCIsInNldFNoYWRvdyIsInRleHRSZWZsZWN0Iiwic2NhbGUiLCJ5IiwiZ3JkIiwiY29udGV4dCIsImNyZWF0ZUxpbmVhckdyYWRpZW50IiwiY2FudmFzIiwiaGVpZ2h0IiwiYWRkQ29sb3JTdG9wIiwic3RhcnRCdXR0b24iLCJidXR0b24iLCJzdGFydEdhbWUiLCJpbnB1dCIsInVzZUhhbmRDdXJzb3IiLCJHYW1lIiwicGxheWVyU3ByaXRlIiwicGxheWVyU2l6ZSIsInJlY3RJbnQiLCJyZWN0RXh0Iiwid2lkdGhSZWN0TGluZSIsIm9wcG9uZW50R3JvdXAiLCJ0aW1lciIsInRpbWVUZXh0Iiwic3ByaXRlVGltZVRleHQiLCJvcHBOdWJtYmVyIiwib3BwUG9zaXRpb25zIiwic2NhbGVNb2RlIiwiUGhhc2VyIiwiU2NhbGVNYW5hZ2VyIiwiTk9fU0NBTEUiLCJmb3JjZU9yaWVudGF0aW9uIiwiZW50ZXJJbmNvcnJlY3RPcmllbnRhdGlvbiIsImhhbmRsZUluY29ycmVjdCIsImxlYXZlSW5jb3JyZWN0T3JpZW50YXRpb24iLCJoYW5kbGVDb3JyZWN0IiwiUm91bmRlZFJlY3QiLCJ3aWR0aCIsInJhZGl1cyIsImZpbGxDb2xvciIsInJlY3RMaW5lIiwibWFrZSIsImJpdG1hcERhdGEiLCJ4IiwiY3R4IiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibGluZVRvIiwicXVhZHJhdGljQ3VydmVUbyIsImNsb3NlUGF0aCIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwic3Ryb2tlIiwiZmlsbFN0eWxlIiwiY3JlYXRlQnV0dG9ucyIsImZ1bGxzY3JlZW5CdXR0b24iLCJnb0Z1bGwiLCJjcmVhdGVFeHRSZWN0YW5nbGUiLCJwaHlzaWNzIiwiZW5hYmxlIiwiUGh5c2ljcyIsIkFSQ0FERSIsImNyZWF0ZUludFJlY3RhbmdsZSIsImNyZWF0ZU9wcG9uZW50cyIsImluaXRQb3NpdGlvbiIsImdyb3VwIiwiaSIsImNhbGxBbGwiLCJzZXRBbGwiLCJjcmVhdGVQbGF5ZXIiLCJpbnB1dEVuYWJsZWQiLCJlbmFibGVEcmFnIiwiYm9keSIsIm1vdmVzIiwiZXZlbnRzIiwib25EcmFnU3RhcnQiLCJhZGRPbmNlIiwiY3JlYXRlVGV4dCIsInRpbWUiLCJsb29wIiwidXBkYXRlQ291bnRlciIsInN0YXJ0U3lzdGVtIiwiZnVsbFNjcmVlblNjYWxlTW9kZSIsIlNIT1dfQUxMIiwiRGF0ZSIsIm1pbnV0ZXMiLCJnZXRNaW51dGVzIiwic2Vjb25kcyIsImdldFNlY29uZHMiLCJtaWxsaVNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJzZXRUZXh0IiwidXBkYXRlIiwiYXJjYWRlIiwiY29sbGlkZSIsInJlc2V0R2FtZSIsInJlY3RhbmdsZUludENvbGxpZGUiLCJyZW5kZXIiLCJmb3JFYWNoIiwiY2hpbGQiLCJ2ZWxvY2l0eSIsIk1hdGgiLCJyYW5kb20iLCJzdG9wIiwiZGlzYWJsZURyYWciLCJpbmRleENoaWxkIiwiZ2V0SW5kZXgiLCJwb3NpdGlvbiIsImlzRnVsbFNjcmVlbiIsInN0b3BGdWxsU2NyZWVuIiwic3RhcnRGdWxsU2NyZWVuIiwiZGV2aWNlIiwiZGVza3RvcCIsInBhdXNlZCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJkaXNwbGF5IiwiRW5kTWVudSIsIkNBTlZBUyJdLCJtYXBwaW5ncyI6IkFBQUEsR0FBQUEsVUFFQUEsUUFBQUMsS0FBQSxTQUFBQyxLQUVBRixPQUFBQyxLQUFBRSxXQUNBQyxRQUFBLFdBQ0FDLEtBQUFILEtBQUFJLEtBQUFDLE1BQUEsVUFBQSx1QkFFQUMsT0FBQSxXQUNBSCxLQUFBSCxLQUFBTyxNQUFBQyxNQUFBLGVDVEFWLE9BQUFXLFVBQUEsU0FBQVQsS0FFQUYsT0FBQVcsVUFBQVIsV0FDQUMsUUFBQSxXQUNBLEdBQUFRLEdBQUFQLEtBQUFRLElBQUFELEtBQUFQLEtBQUFTLE1BQUFDLFFBQUEsSUFBQSxjQUNBSCxHQUFBSSxPQUFBQyxJQUFBLEdBRUEsSUFBQUMsR0FBQWIsS0FBQVEsSUFBQU0sT0FBQWQsS0FBQVMsTUFBQUMsUUFBQVYsS0FBQVMsTUFBQU0sUUFBQSxVQUNBRixHQUFBRixPQUFBSyxNQUFBLEdBQUEsSUFDQWhCLEtBQUFDLEtBQUFnQixpQkFBQUosR0FFQUssZUFDQUMsUUFDQUMsVUFBQSx3QkFHQXBCLEtBQUFDLEtBQUFvQixPQUFBLFdBQUEsVUFBQUMsU0FBQUMsU0FBQUMsU0FBQSxRQUFBLFFBQ0EseURBRUF4QixLQUFBQyxLQUFBd0IsWUFBQSxjQUFBLHlCQUFBLElBQUEsSUFDQXpCLEtBQUFDLEtBQUFDLE1BQUEsbUJBQUEsa0NBRUFDLE9BQUEsV0FDQUgsS0FBQUgsS0FBQU8sTUFBQUMsTUFBQSxjQ3ZCQVYsT0FBQStCLFNBQUEsU0FBQTdCLEtBRUFGLE9BQUErQixTQUFBNUIsV0FDQUssT0FBQSxXQUNBLEdBQUFJLEdBQUFQLEtBQUFRLElBQUFELEtBQUFQLEtBQUFTLE1BQUFDLFFBQUEsSUFBQSxVQUNBSCxHQUFBSSxPQUFBQyxJQUFBLElBQ0FMLEVBQUFvQixNQUFBLFNBQ0FwQixFQUFBcUIsS0FBQSxRQUNBckIsRUFBQXNCLFdBQUEsT0FDQXRCLEVBQUF1QixTQUFBLEdBQ0F2QixFQUFBd0IsS0FBQSxVQUNBeEIsRUFBQXlCLFVBQUEsRUFBQSxFQUFBLGtCQUFBLEVBRUEsSUFBQUMsR0FBQWpDLEtBQUFRLElBQUFELEtBQUFQLEtBQUFTLE1BQUFDLFFBQUEsSUFBQSxVQUVBdUIsR0FBQXRCLE9BQUFDLElBQUEsSUFDQXFCLEVBQUFOLE1BQUEsU0FDQU0sRUFBQUMsTUFBQUMsRUFBQSxHQUVBRixFQUFBTCxLQUFBLFFBQ0FLLEVBQUFKLFdBQUEsT0FDQUksRUFBQUgsU0FBQSxFQUdBLElBQUFNLEdBQUFILEVBQUFJLFFBQUFDLHFCQUFBLEVBQUEsRUFBQSxFQUFBL0IsRUFBQWdDLE9BQUFDLE9BRUFKLEdBQUFLLGFBQUEsRUFBQSxpQkFDQUwsRUFBQUssYUFBQSxFQUFBLG9CQUVBUixFQUFBRixLQUFBSyxFQUdBcEMsS0FBQTBDLFlBQUExQyxLQUFBUSxJQUFBbUMsT0FBQTNDLEtBQUFTLE1BQUFDLFFBQUEsSUFBQSxjQUFBVixLQUFBNEMsVUFBQTVDLEtBQUEsRUFBQSxFQUFBLEdBQ0FBLEtBQUEwQyxZQUFBL0IsT0FBQUMsSUFBQSxHQUFBLEdBQ0FaLEtBQUEwQyxZQUFBRyxNQUFBQyxlQUFBLEdBRUFGLFVBQUEsV0FDQTVDLEtBQUFILEtBQUFPLE1BQUFDLE1BQUEsVUNyQ0FWLE9BQUFvRCxLQUFBLFNBQUFsRCxLQUVBRixPQUFBb0QsS0FBQWpELFdBRUFDLFFBQUEsV0FDQUMsS0FBQWdELGFBQUEsS0FDQWhELEtBQUFpRCxXQUFBLEdBQ0FqRCxLQUFBa0QsUUFBQSxLQUNBbEQsS0FBQW1ELFFBQUEsS0FDQW5ELEtBQUFvRCxjQUFBLEVBQ0FwRCxLQUFBcUQsY0FBQSxLQUNBckQsS0FBQWdELGFBQUEsS0FDQWhELEtBQUFzRCxNQUFBLEtBQ0F0RCxLQUFBdUQsU0FBQSxFQUNBdkQsS0FBQXdELGVBQUEsS0FDQXhELEtBQUF5RCxXQUFBLEVBQ0F6RCxLQUFBMEQsZ0JBRUExRCxLQUFBSCxLQUFBcUMsTUFBQXlCLFVBQUFDLE9BQUFDLGFBQUFDLFNBQ0E5RCxLQUFBSCxLQUFBcUMsTUFBQTZCLGtCQUFBLEdBQUEsR0FDQS9ELEtBQUFILEtBQUFxQyxNQUFBOEIsMEJBQUF4RCxJQUFBUixLQUFBaUUsZ0JBQUFqRSxNQUNBQSxLQUFBSCxLQUFBcUMsTUFBQWdDLDBCQUFBMUQsSUFBQVIsS0FBQW1FLGNBQUFuRSxPQUdBRyxPQUFBLFdBTUEsUUFBQWlFLEdBQUFDLEVBQUE3QixFQUFBOEIsRUFBQUMsR0FDQSxHQUFBQyxHQUFBM0UsRUFBQTRFLEtBQUFDLFdBQUFMLEVBQUF4RSxFQUFBdUQsY0FBQVosRUFBQTNDLEVBQUF1RCxlQUNBdUIsRUFBQTlFLEVBQUF1RCxjQUFBLEVBQ0FqQixFQUFBdEMsRUFBQXVELGNBQUEsQ0FpQkEsT0FoQkFvQixHQUFBSSxJQUFBQyxZQUNBTCxFQUFBSSxJQUFBRSxPQUFBSCxFQUFBTCxFQUFBbkMsR0FDQXFDLEVBQUFJLElBQUFHLE9BQUFKLEVBQUFOLEVBQUFDLEVBQUFuQyxHQUNBcUMsRUFBQUksSUFBQUksaUJBQUFMLEVBQUFOLEVBQUFsQyxFQUFBd0MsRUFBQU4sRUFBQWxDLEVBQUFtQyxHQUNBRSxFQUFBSSxJQUFBRyxPQUFBSixFQUFBTixFQUFBbEMsRUFBQUssRUFBQThCLEdBQ0FFLEVBQUFJLElBQUFJLGlCQUFBTCxFQUFBTixFQUFBbEMsRUFBQUssRUFBQW1DLEVBQUFOLEVBQUFDLEVBQUFuQyxFQUFBSyxHQUNBZ0MsRUFBQUksSUFBQUcsT0FBQUosRUFBQUwsRUFBQW5DLEVBQUFLLEdBQ0FnQyxFQUFBSSxJQUFBSSxpQkFBQUwsRUFBQXhDLEVBQUFLLEVBQUFtQyxFQUFBeEMsRUFBQUssRUFBQThCLEdBQ0FFLEVBQUFJLElBQUFHLE9BQUFKLEVBQUF4QyxFQUFBbUMsR0FDQUUsRUFBQUksSUFBQUksaUJBQUFMLEVBQUF4QyxFQUFBd0MsRUFBQUwsRUFBQW5DLEdBQ0FxQyxFQUFBSSxJQUFBSyxZQUNBVCxFQUFBSSxJQUFBTSxZQUFBLE9BQ0FWLEVBQUFJLElBQUFPLFVBQUF0RixFQUFBdUQsY0FDQW9CLEVBQUFJLElBQUFRLFNBQ0FaLEVBQUFJLElBQUFTLFVBQUFkLEVBQ0FDLEVBQUFJLElBQUE3QyxPQUNBeUMsRUFHQSxRQUFBYyxLQUNBLEdBQUFDLEdBQUExRixFQUFBVyxJQUFBbUMsT0FBQTlDLEVBQUFZLE1BQUE0RCxNQUFBLEdBQUEsR0FBQSxtQkFBQXhFLEVBQUEyRixPQUFBM0YsRUFDQTBGLEdBQUExQyxNQUFBQyxlQUFBLEVBR0EsUUFBQTJDLEtBQ0E1RixFQUFBcUQsUUFBQXJELEVBQUFXLElBQUFNLE9BQUEsRUFBQSxFQUFBc0QsRUFBQSxJQUFBdkUsRUFBQXVELGNBQUEsSUFBQXZELEVBQUF1RCxjQUFBLEdBQUEsWUFDQXZELEVBQUE2RixRQUFBQyxPQUFBOUYsRUFBQXFELFFBQUFVLE9BQUFnQyxRQUFBQyxRQUdBLFFBQUFDLEtBQ0FqRyxFQUFBcUQsUUFBQXJELEVBQUFXLElBQUFNLE9BQUFqQixFQUFBWSxNQUFBQyxRQUFBYixFQUFBWSxNQUFBTSxRQUFBcUQsRUFBQSxJQUFBLElBQUEsR0FBQSxVQUNBdkUsRUFBQXFELFFBQUF2QyxPQUFBSyxNQUFBLElBQ0FuQixFQUFBNkYsUUFBQUMsT0FBQTlGLEVBQUFxRCxRQUFBVSxPQUFBZ0MsUUFBQUMsUUFHQSxRQUFBRSxLQUNBLFFBQUFDLEtBQ0FuRyxFQUFBNkQsZUFBQWlCLEVBQUEsR0FBQXhDLEVBQUF0QyxFQUFBWSxNQUFBTSxRQUFBLEdBQUFzRCxNQUFBLEdBQUE3QixPQUFBLEtBQ0FtQyxFQUFBOUUsRUFBQVksTUFBQTRELE1BQUEsR0FBQWxDLEVBQUF0QyxFQUFBWSxNQUFBTSxRQUFBLEdBQUFzRCxNQUFBLEdBQUE3QixPQUFBLEtBQ0FtQyxFQUFBLEdBQUF4QyxFQUFBdEMsRUFBQVksTUFBQU0sUUFBQSxHQUFBc0QsTUFBQSxHQUFBN0IsT0FBQSxLQUNBbUMsRUFBQTlFLEVBQUFZLE1BQUE0RCxNQUFBLEdBQUFsQyxFQUFBdEMsRUFBQVksTUFBQU0sUUFBQSxHQUFBc0QsTUFBQSxHQUFBN0IsT0FBQSxLQUdBd0QsSUFDQW5HLEVBQUF3RCxjQUFBeEQsRUFBQVcsSUFBQXlGLE1BQUFwRyxFQUFBWSxNQUFBLGlCQUFBLEdBQUEsRUFBQW1ELE9BQUFnQyxRQUFBQyxPQUNBLEtBQUEsR0FBQUssR0FBQSxFQUFBQSxFQUFBckcsRUFBQTRELFdBQUF5QyxJQUNBckcsRUFBQXdELGNBQUFsRCxPQUFBTixFQUFBNkQsYUFBQXdDLEdBQUF2QixFQUFBOUUsRUFBQTZELGFBQUF3QyxHQUFBL0QsRUFBQWlDLEVBQUF2RSxFQUFBNkQsYUFBQXdDLEdBQUE3QixNQUNBeEUsRUFBQTZELGFBQUF3QyxHQUFBMUQsT0FDQSxHQUNBLE9BR0EzQyxHQUFBd0QsY0FBQThDLFFBQUEsYUFBQSxTQUFBLElBQ0F0RyxFQUFBd0QsY0FBQThDLFFBQUEsa0JBQUEsY0FBQSxHQUNBdEcsRUFBQXdELGNBQUErQyxPQUFBLDJCQUFBLEdBR0EsUUFBQUMsS0FDQXhHLEVBQUFtRCxhQUFBbkQsRUFBQVcsSUFBQU0sT0FBQWpCLEVBQUFZLE1BQUFDLFFBQUFiLEVBQUFZLE1BQUFNLFFBQUFxRCxFQUFBdkUsRUFBQW9ELFdBQUFwRCxFQUFBb0QsV0FBQSxHQUFBLFdBQ0FwRCxFQUFBbUQsYUFBQXJDLE9BQUFLLE1BQUEsSUFDQW5CLEVBQUFtRCxhQUFBc0QsY0FBQSxFQUNBekcsRUFBQW1ELGFBQUFILE1BQUEwRCxhQUVBMUcsRUFBQTZGLFFBQUFDLE9BQUE5RixFQUFBbUQsYUFBQVksT0FBQWdDLFFBQUFDLFFBQ0FoRyxFQUFBbUQsYUFBQXdELEtBQUFDLE9BQUEsRUFDQTVHLEVBQUFtRCxhQUFBMEQsT0FBQUMsWUFBQUMsUUFBQS9HLEVBQUE4RyxZQUFBOUcsR0FHQSxRQUFBZ0gsS0FDQWhILEVBQUF5RCxNQUFBekQsRUFBQUEsS0FBQWlILEtBQUEzRyxRQUFBLEdBQ0FOLEVBQUF5RCxNQUFBeUQsS0FBQSxJQUFBbEgsRUFBQW1ILGNBQUFuSCxHQUNBQSxFQUFBMkQsZUFBQTNELEVBQUFXLElBQUFELEtBQUEsSUFBQSxHQUFBLFlBQUFxQixLQUFBLGNBQUFFLFNBQUEsS0FDQWpDLEVBQUEyRCxlQUFBN0MsT0FBQUssTUFBQSxJQWpGQSxHQUFBbkIsR0FBQUcsSUFFQUEsTUFBQTBGLFFBQUF1QixZQUFBckQsT0FBQWdDLFFBQUFDLFFBQ0E3RixLQUFBa0MsTUFBQWdGLG9CQUFBdEQsT0FBQUMsYUFBQXNELFNBaUZBMUIsSUFDQUssSUFDQUMsSUFDQU0sSUFDQWYsSUFDQXVCLEtBR0FHLGNBQUEsV0FDQWhILEtBQUF1RCxVQUNBLElBQUF1RCxHQUFBLEdBQUFNLE1BQUEsSUFBQXBILEtBQUEsVUFFQXFILEVBQUFQLEVBQUFRLGFBQUEsRUFBQSxJQUFBUixFQUFBUSxhQUFBUixFQUFBUSxhQUNBQyxFQUFBVCxFQUFBVSxjQUFBLEVBQUEsSUFBQVYsRUFBQVUsYUFBQVYsRUFBQVUsYUFDQUMsRUFBQVgsRUFBQVksa0JBQUEsS0FBQSxFQUFBLElBQUFaLEVBQUFZLGtCQUFBLElBQUFaLEVBQUFZLGtCQUFBLEdBQ0ExSCxNQUFBd0QsZUFBQW1FLFFBQUFOLEVBQUEsSUFBQUUsRUFBQSxJQUFBRSxJQUdBRyxPQUFBLFdBQ0E1SCxLQUFBMEYsUUFBQW1DLE9BQUFDLFFBQUE5SCxLQUFBcUQsY0FBQXJELEtBQUFxRCxlQUNBckQsS0FBQTBGLFFBQUFtQyxPQUFBQyxRQUFBOUgsS0FBQWdELGFBQUFoRCxLQUFBcUQsY0FBQXJELEtBQUErSCxVQUFBLEtBQUEvSCxNQUNBQSxLQUFBZ0ksdUJBR0FDLE9BQUEsYUFLQUQsb0JBQUEsV0FDQWhJLEtBQUFnRCxhQUFBMkIsRUFBQTNFLEtBQUFpRCxXQUFBLEVBQUEsR0FBQWpELEtBQUErSCxZQUNBL0gsS0FBQWdELGFBQUEyQixFQUFBM0UsS0FBQWlELFdBQUEsRUFBQSxJQUFBakQsS0FBQStILFlBQ0EvSCxLQUFBZ0QsYUFBQWIsRUFBQW5DLEtBQUFpRCxXQUFBLEVBQUEsR0FBQWpELEtBQUErSCxZQUNBL0gsS0FBQWdELGFBQUFiLEVBQUFuQyxLQUFBaUQsV0FBQSxFQUFBLElBQUFqRCxLQUFBK0gsWUFBQSxNQUdBcEIsWUFBQSxXQUNBM0csS0FBQXVELFNBQUEsRUFDQXZELEtBQUFzRCxNQUFBakQsUUFDQUwsS0FBQXFELGNBQUE2RSxRQUFBLFNBQUFDLEdBQUFBLEVBQUEzQixLQUFBNEIsU0FBQXBILE1BQUFxSCxLQUFBQyxTQUFBLEdBQUEsS0FBQSxJQUNBRCxLQUFBQyxTQUFBLEdBQUEsS0FBQSxNQUNBLFNBR0FQLFVBQUEsV0FDQSxHQUFBbEksR0FBQUcsSUFDQUEsTUFBQXNELE1BQUFpRixNQUFBLEdBQ0F2SSxLQUFBZ0QsYUFBQTJCLEVBQUEzRSxLQUFBUyxNQUFBQyxRQUNBVixLQUFBZ0QsYUFBQWIsRUFBQW5DLEtBQUFTLE1BQUFNLFFBRUFmLEtBQUFnRCxhQUFBSCxNQUFBMkYsY0FDQXhJLEtBQUFxRCxjQUFBNkUsUUFBQSxTQUFBQyxHQUNBQSxFQUFBM0IsS0FBQTRCLFNBQUFwSCxNQUFBLEVBQUEsRUFDQSxJQUFBeUgsR0FBQTVJLEVBQUF3RCxjQUFBcUYsU0FBQVAsRUFDQUEsR0FBQVEsU0FBQWhFLEVBQUE5RSxFQUFBNkQsYUFBQStFLEdBQUE5RCxFQUNBd0QsRUFBQVEsU0FBQXhHLEVBQUF0QyxFQUFBNkQsYUFBQStFLEdBQUF0RyxHQUVBLFFBQ0FuQyxLQUFBZ0QsYUFBQTBELE9BQUFDLFlBQUFDLFFBQUE1RyxLQUFBMkcsWUFBQTNHLE1BQ0FBLEtBQUFnRCxhQUFBSCxNQUFBMEQsY0FHQWYsT0FBQSxXQUNBeEYsS0FBQUgsS0FBQXFDLE1BQUEwRyxhQUFBNUksS0FBQWtDLE1BQUEyRyxpQkFBQTdJLEtBQUFrQyxNQUFBNEcsbUJBR0E3RSxnQkFBQSxXQUNBakUsS0FBQUgsS0FBQWtKLE9BQUFDLFVBQ0FoSixLQUFBSCxLQUFBb0osUUFBQSxFQUNBM0gsU0FBQTRILGVBQUEsUUFBQUMsTUFBQUMsUUFBQSxVQUlBakYsY0FBQSxXQUNBbkUsS0FBQUgsS0FBQWtKLE9BQUFDLFVBQ0FoSixLQUFBSCxLQUFBb0osUUFBQSxFQUNBM0gsU0FBQTRILGVBQUEsUUFBQUMsTUFBQUMsUUFBQSxVQ3pMQXpKLE9BQUEwSixRQUFBLFNBQUF4SixLQUVBRixPQUFBMEosUUFBQXZKLFdBQ0FLLE9BQUEsV0FDQSxHQUFBSSxHQUFBUCxLQUFBUSxJQUFBRCxLQUFBUCxLQUFBUyxNQUFBQyxRQUFBLElBQUEsWUFDQUgsR0FBQUksT0FBQUMsSUFBQSxJQUNBTCxFQUFBb0IsTUFBQSxTQUNBcEIsRUFBQXFCLEtBQUEsUUFDQXJCLEVBQUFzQixXQUFBLE9BQ0F0QixFQUFBdUIsU0FBQSxHQUNBdkIsRUFBQXdCLEtBQUEsVUFDQXhCLEVBQUF5QixVQUFBLEVBQUEsRUFBQSxrQkFBQSxHQUVBaEMsS0FBQTBDLFlBQUExQyxLQUFBUSxJQUFBbUMsT0FBQTNDLEtBQUFTLE1BQUFDLFFBQUEsSUFBQSxjQUFBVixLQUFBNEMsVUFBQTVDLEtBQUEsRUFBQSxFQUFBLEdBQ0FBLEtBQUEwQyxZQUFBL0IsT0FBQUMsSUFBQSxHQUFBLEdBQ0FaLEtBQUEwQyxZQUFBRyxNQUFBQyxlQUFBLEdBRUFGLFVBQUEsV0FDQTVDLEtBQUFILEtBQUFPLE1BQUFDLE1BQUEsVUNsQkEsV0FDQSxHQUFBUixHQUFBLEdBQUErRCxRQUFBYixLQUFBLElBQUEsSUFBQWEsT0FBQTBGLE9BQUEsR0FBQSxNQUFBLEVBQ0F6SixHQUFBTyxNQUFBSSxJQUFBLE9BQUFiLE9BQUFDLE1BQ0FDLEVBQUFPLE1BQUFJLElBQUEsWUFBQWIsT0FBQVcsV0FDQVQsRUFBQU8sTUFBQUksSUFBQSxXQUFBYixPQUFBK0IsVUFDQTdCLEVBQUFPLE1BQUFJLElBQUEsT0FBQWIsT0FBQW9ELE1BQ0FsRCxFQUFBTyxNQUFBSSxJQUFBLFVBQUFiLE9BQUEwSixTQUVBeEosRUFBQU8sTUFBQUMsTUFBQSIsImZpbGUiOiJnYW1lcy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBEcmFnTWUgPSB7fTtcclxuXHJcbkRyYWdNZS5Cb290ID0gZnVuY3Rpb24oZ2FtZSkge307XHJcblxyXG5EcmFnTWUuQm9vdC5wcm90b3R5cGUgPSB7XHJcbiAgcHJlbG9hZDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmdhbWUubG9hZC5pbWFnZShcImxvYWRpbmdcIixcImFzc2V0cy9sb2FkaW5nLnBuZ1wiKTtcclxuICB9LFxyXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ1ByZWxvYWRlcicpO1xyXG4gIH1cclxufTsiLCJEcmFnTWUuUHJlbG9hZGVyID0gZnVuY3Rpb24oZ2FtZSkge307XHJcblxyXG5EcmFnTWUuUHJlbG9hZGVyLnByb3RvdHlwZSA9IHtcclxuICBwcmVsb2FkOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0ZXh0ID0gdGhpcy5hZGQudGV4dCh0aGlzLndvcmxkLmNlbnRlclgsIDEwMCwgXCJMb2FkaW5nIC4uLlwiKTtcclxuICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xyXG5cclxuICAgIHZhciBsb2FkaW5nQmFyID0gdGhpcy5hZGQuc3ByaXRlKHRoaXMud29ybGQuY2VudGVyWCwgdGhpcy53b3JsZC5jZW50ZXJZLFwibG9hZGluZ1wiKTtcclxuICAgIGxvYWRpbmdCYXIuYW5jaG9yLnNldFRvKDAuNSwwLjUpO1xyXG4gICAgdGhpcy5sb2FkLnNldFByZWxvYWRTcHJpdGUobG9hZGluZ0Jhcik7XHJcbiAgICBcclxuICAgIFdlYkZvbnRDb25maWcgPSB7XHJcbiAgICAgICAgZ29vZ2xlOiB7XHJcbiAgICAgICAgICAgIGZhbWlsaWVzOiBbJ0luY29uc29sYXRhOjpsYXRpbiddXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMubG9hZC5zY3JpcHQoJ3dlYmZvbnQnLCAoJ2h0dHBzOicgPT0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPyAnaHR0cHMnIDogJ2h0dHAnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc6Ly9hamF4Lmdvb2dsZWFwaXMuY29tL2FqYXgvbGlicy93ZWJmb250LzEvd2ViZm9udC5qcycpO1xyXG4gICAgXHJcbiAgICB0aGlzLmxvYWQuc3ByaXRlc2hlZXQoJ2J1dHRvblN0YXJ0JywgJ2Fzc2V0cy9idXR0b25TdGFydC5wbmcnLCAxNDYsIDUxKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnZnVsbHNjcmVlbkJ1dHRvbicsJ2Fzc2V0cy9mdWxsc2NyZWVuQnV0dG9uMzIucG5nJyk7XHJcbn0sXHJcbiAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnTWFpbk1lbnUnKTtcclxuICB9XHJcbn07IiwiRHJhZ01lLk1haW5NZW51ID0gZnVuY3Rpb24oZ2FtZSkge307XHJcblxyXG5EcmFnTWUuTWFpbk1lbnUucHJvdG90eXBlID0ge1xyXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGV4dCA9IHRoaXMuYWRkLnRleHQodGhpcy53b3JsZC5jZW50ZXJYLCAxMDAsIFwiRFJBRyBNRVwiKTtcclxuICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgdGV4dC5hbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgdGV4dC5mb250ID0gJ0FyaWFsJztcclxuICAgIHRleHQuZm9udFdlaWdodCA9ICdib2xkJztcclxuICAgIHRleHQuZm9udFNpemUgPSA3MDtcclxuICAgIHRleHQuZmlsbCA9ICcjMDAwMDAwJztcclxuICAgIHRleHQuc2V0U2hhZG93KDMsIDMsICdyZ2JhKDAsMCwwLDAuNSknLCA1KTtcclxuICAgIFxyXG4gICAgdmFyIHRleHRSZWZsZWN0ID0gdGhpcy5hZGQudGV4dCh0aGlzLndvcmxkLmNlbnRlclgsIDE1MCwgXCJEUkFHIE1FXCIpO1xyXG4gICAgLy8gIENlbnRlcnMgdGhlIHRleHRcclxuICAgIHRleHRSZWZsZWN0LmFuY2hvci5zZXQoMC41KTtcclxuICAgIHRleHRSZWZsZWN0LmFsaWduID0gJ2NlbnRlcic7XHJcbiAgICB0ZXh0UmVmbGVjdC5zY2FsZS55ID0gLTE7XHJcbiAgICAvLyAgT3VyIGZvbnQgKyBzaXplXHJcbiAgICB0ZXh0UmVmbGVjdC5mb250ID0gJ0FyaWFsJztcclxuICAgIHRleHRSZWZsZWN0LmZvbnRXZWlnaHQgPSAnYm9sZCc7XHJcbiAgICB0ZXh0UmVmbGVjdC5mb250U2l6ZSA9IDcwO1xyXG4gICAgLy8gIEhlcmUgd2UgY3JlYXRlIGEgbGluZWFyIGdyYWRpZW50IG9uIHRoZSBUZXh0IGNvbnRleHQuXHJcbiAgICAvLyAgVGhpcyB1c2VzIHRoZSBleGFjdCBzYW1lIG1ldGhvZCBvZiBjcmVhdGluZyBhIGdyYWRpZW50IGFzIHlvdSBkbyBvbiBhIG5vcm1hbCBDYW52YXMgY29udGV4dC5cclxuICAgIHZhciBncmQgPSB0ZXh0UmVmbGVjdC5jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIHRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICAvLyAgQWRkIGluIDIgY29sb3Igc3RvcHNcclxuICAgIGdyZC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMCwwLDAsMCknKTtcclxuICAgIGdyZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDAsMC4wOCknKTtcclxuICAgIC8vICBBbmQgYXBwbHkgdG8gdGhlIFRleHRcclxuICAgIHRleHRSZWZsZWN0LmZpbGwgPSBncmQ7XHJcblxyXG5cclxuICAgIHRoaXMuc3RhcnRCdXR0b24gPSB0aGlzLmFkZC5idXR0b24odGhpcy53b3JsZC5jZW50ZXJYLCAyMjUsICdidXR0b25TdGFydCcsIHRoaXMuc3RhcnRHYW1lLCB0aGlzLCAyLCAwLCAxKTtcclxuICAgIHRoaXMuc3RhcnRCdXR0b24uYW5jaG9yLnNldCgwLjUsMCk7XHJcbiAgICB0aGlzLnN0YXJ0QnV0dG9uLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gIH0sXHJcbiAgc3RhcnRHYW1lOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGF0ZS5zdGFydCgnR2FtZScpO1xyXG4gIH1cclxufTsiLCJEcmFnTWUuR2FtZSA9IGZ1bmN0aW9uKGdhbWUpIHt9O1xyXG5cclxuRHJhZ01lLkdhbWUucHJvdG90eXBlID0ge1xyXG5cclxuICBwcmVsb2FkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMucGxheWVyU3ByaXRlICAgPSBudWxsLFxyXG4gICAgdGhpcy5wbGF5ZXJTaXplICAgICA9IDUwLFxyXG4gICAgdGhpcy5yZWN0SW50ICAgICAgICA9IG51bGwsXHJcbiAgICB0aGlzLnJlY3RFeHQgICAgICAgID0gbnVsbCxcclxuICAgIHRoaXMud2lkdGhSZWN0TGluZSAgPSA0LFxyXG4gICAgdGhpcy5vcHBvbmVudEdyb3VwICA9IG51bGwsXHJcbiAgICB0aGlzLnBsYXllclNwcml0ZSAgID0gbnVsbCxcclxuICAgIHRoaXMudGltZXIgICAgICAgICAgPSBudWxsLFxyXG4gICAgdGhpcy50aW1lVGV4dCAgICAgICA9IDAsXHJcbiAgICB0aGlzLnNwcml0ZVRpbWVUZXh0ID0gbnVsbCxcclxuICAgIHRoaXMub3BwTnVibWJlciAgICAgPSA0LFxyXG4gICAgdGhpcy5vcHBQb3NpdGlvbnMgICA9IFtdO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5zY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLk5PX1NDQUxFO1xyXG4gICAgdGhpcy5nYW1lLnNjYWxlLmZvcmNlT3JpZW50YXRpb24odHJ1ZSwgZmFsc2UpO1xyXG4gICAgdGhpcy5nYW1lLnNjYWxlLmVudGVySW5jb3JyZWN0T3JpZW50YXRpb24uYWRkKHRoaXMuaGFuZGxlSW5jb3JyZWN0LCB0aGlzKTtcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5sZWF2ZUluY29ycmVjdE9yaWVudGF0aW9uLmFkZCh0aGlzLmhhbmRsZUNvcnJlY3QsIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZ2FtZSA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5waHlzaWNzLnN0YXJ0U3lzdGVtKFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICB0aGlzLnNjYWxlLmZ1bGxTY3JlZW5TY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlNIT1dfQUxMO1xyXG5cclxuICAgIGZ1bmN0aW9uIFJvdW5kZWRSZWN0KHdpZHRoLCBoZWlnaHQsIHJhZGl1cywgZmlsbENvbG9yKSB7XHJcbiAgICAgIHZhciByZWN0TGluZSA9IGdhbWUubWFrZS5iaXRtYXBEYXRhKHdpZHRoK2dhbWUud2lkdGhSZWN0TGluZSwgaGVpZ2h0K2dhbWUud2lkdGhSZWN0TGluZSk7XHJcbiAgICAgIHZhciB4ID0gZ2FtZS53aWR0aFJlY3RMaW5lLzIsXHJcbiAgICAgICAgICB5ID0gZ2FtZS53aWR0aFJlY3RMaW5lLzI7XHJcbiAgICAgIHJlY3RMaW5lLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgcmVjdExpbmUuY3R4Lm1vdmVUbyh4ICsgcmFkaXVzLCB5KTtcclxuICAgICAgcmVjdExpbmUuY3R4LmxpbmVUbyh4ICsgd2lkdGggLSByYWRpdXMsIHkpO1xyXG4gICAgICByZWN0TGluZS5jdHgucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHksIHggKyB3aWR0aCwgeSArIHJhZGl1cyk7XHJcbiAgICAgIHJlY3RMaW5lLmN0eC5saW5lVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgcmVjdExpbmUuY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCArIHdpZHRoLCB5ICsgaGVpZ2h0LCB4ICsgd2lkdGggLSByYWRpdXMsIHkgKyBoZWlnaHQpO1xyXG4gICAgICByZWN0TGluZS5jdHgubGluZVRvKHggKyByYWRpdXMsIHkgKyBoZWlnaHQpO1xyXG4gICAgICByZWN0TGluZS5jdHgucXVhZHJhdGljQ3VydmVUbyh4LCB5ICsgaGVpZ2h0LCB4LCB5ICsgaGVpZ2h0IC0gcmFkaXVzKTtcclxuICAgICAgcmVjdExpbmUuY3R4LmxpbmVUbyh4LCB5ICsgcmFkaXVzKTtcclxuICAgICAgcmVjdExpbmUuY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHJhZGl1cywgeSk7XHJcbiAgICAgIHJlY3RMaW5lLmN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgcmVjdExpbmUuY3R4LnN0cm9rZVN0eWxlID0gJ2JsdWUnO1xyXG4gICAgICByZWN0TGluZS5jdHgubGluZVdpZHRoID0gZ2FtZS53aWR0aFJlY3RMaW5lO1xyXG4gICAgICByZWN0TGluZS5jdHguc3Ryb2tlKCk7XHJcbiAgICAgIHJlY3RMaW5lLmN0eC5maWxsU3R5bGUgPSBmaWxsQ29sb3I7XHJcbiAgICAgIHJlY3RMaW5lLmN0eC5maWxsKCk7XHJcbiAgICAgIHJldHVybiByZWN0TGluZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVCdXR0b25zKCkge1xyXG4gICAgICB2YXIgZnVsbHNjcmVlbkJ1dHRvbiA9IGdhbWUuYWRkLmJ1dHRvbihnYW1lLndvcmxkLndpZHRoLTQyLCAxMCwgJ2Z1bGxzY3JlZW5CdXR0b24nLCBnYW1lLmdvRnVsbCwgZ2FtZSk7XHJcbiAgICAgIGZ1bGxzY3JlZW5CdXR0b24uaW5wdXQudXNlSGFuZEN1cnNvciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXh0UmVjdGFuZ2xlKCkge1xyXG4gICAgICBnYW1lLnJlY3RJbnQgPSBnYW1lLmFkZC5zcHJpdGUoMCwwLCBSb3VuZGVkUmVjdCg0MDAtZ2FtZS53aWR0aFJlY3RMaW5lLDQwMC1nYW1lLndpZHRoUmVjdExpbmUsIDEwLCAnI2RmZTNlZScpKTtcclxuICAgICAgZ2FtZS5waHlzaWNzLmVuYWJsZShnYW1lLnJlY3RJbnQsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlSW50UmVjdGFuZ2xlKCkge1xyXG4gICAgICBnYW1lLnJlY3RJbnQgPSBnYW1lLmFkZC5zcHJpdGUoZ2FtZS53b3JsZC5jZW50ZXJYLCBnYW1lLndvcmxkLmNlbnRlclksIFJvdW5kZWRSZWN0KDMwMCwzMDAsIDEwLCAnd2hpdGUnKSk7XHJcbiAgICAgIGdhbWUucmVjdEludC5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgICAgZ2FtZS5waHlzaWNzLmVuYWJsZShnYW1lLnJlY3RJbnQsIFBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlT3Bwb25lbnRzKCkge1xyXG4gICAgICBmdW5jdGlvbiBpbml0UG9zaXRpb24oKXtcclxuICAgICAgICBnYW1lLm9wcFBvc2l0aW9ucyA9IFt7eDo1MCwgeTpnYW1lLndvcmxkLmNlbnRlclktNTAsIHdpZHRoOjUwLCBoZWlnaHQ6NTB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt4OmdhbWUud29ybGQud2lkdGgtNTAsIHk6Z2FtZS53b3JsZC5jZW50ZXJZLTUwLCB3aWR0aDo3NSwgaGVpZ2h0OjI1fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eDo1MCwgeTpnYW1lLndvcmxkLmNlbnRlclkrNTAsIHdpZHRoOjI1LCBoZWlnaHQ6NzV9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt4OmdhbWUud29ybGQud2lkdGgtNTAsIHk6Z2FtZS53b3JsZC5jZW50ZXJZKzUwLCB3aWR0aDo1MCwgaGVpZ2h0OjUwfV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGluaXRQb3NpdGlvbigpO1xyXG4gICAgICBnYW1lLm9wcG9uZW50R3JvdXAgPSBnYW1lLmFkZC5ncm91cChnYW1lLndvcmxkLCAnb3Bwb25lbnRHcm91cCcsIGZhbHNlLCB0cnVlLCBQaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG4gICAgICBmb3IodmFyIGk9MDsgaTxnYW1lLm9wcE51Ym1iZXI7IGkrKyl7XHJcbiAgICAgICAgZ2FtZS5vcHBvbmVudEdyb3VwLmNyZWF0ZShnYW1lLm9wcFBvc2l0aW9uc1tpXS54LCBnYW1lLm9wcFBvc2l0aW9uc1tpXS55LCBSb3VuZGVkUmVjdChnYW1lLm9wcFBvc2l0aW9uc1tpXS53aWR0aCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYW1lLm9wcFBvc2l0aW9uc1tpXS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdyZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBnYW1lLm9wcG9uZW50R3JvdXAuY2FsbEFsbCgnYW5jaG9yLnNldCcsICdhbmNob3InLCAwLjUpO1xyXG4gICAgICBnYW1lLm9wcG9uZW50R3JvdXAuY2FsbEFsbCgnYm9keS5ib3VuY2Uuc2V0JywgJ2JvZHkuYm91bmNlJywgMSk7XHJcbiAgICAgIGdhbWUub3Bwb25lbnRHcm91cC5zZXRBbGwoJ2JvZHkuY29sbGlkZVdvcmxkQm91bmRzJywgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xyXG4gICAgICBnYW1lLnBsYXllclNwcml0ZSA9IGdhbWUuYWRkLnNwcml0ZShnYW1lLndvcmxkLmNlbnRlclgsIGdhbWUud29ybGQuY2VudGVyWSwgUm91bmRlZFJlY3QoZ2FtZS5wbGF5ZXJTaXplLGdhbWUucGxheWVyU2l6ZSwxMCwneWVsbG93JykpO1xyXG4gICAgICBnYW1lLnBsYXllclNwcml0ZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgICAgZ2FtZS5wbGF5ZXJTcHJpdGUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgZ2FtZS5wbGF5ZXJTcHJpdGUuaW5wdXQuZW5hYmxlRHJhZygpO1xyXG4gICAgICBcclxuICAgICAgZ2FtZS5waHlzaWNzLmVuYWJsZShnYW1lLnBsYXllclNwcml0ZSwgUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuICAgICAgZ2FtZS5wbGF5ZXJTcHJpdGUuYm9keS5tb3ZlcyA9IGZhbHNlO1xyXG4gICAgICBnYW1lLnBsYXllclNwcml0ZS5ldmVudHMub25EcmFnU3RhcnQuYWRkT25jZShnYW1lLm9uRHJhZ1N0YXJ0LCBnYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVUZXh0KCkge1xyXG4gICAgICBnYW1lLnRpbWVyID0gZ2FtZS5nYW1lLnRpbWUuY3JlYXRlKGZhbHNlKTtcclxuICAgICAgZ2FtZS50aW1lci5sb29wKDEwMCwgZ2FtZS51cGRhdGVDb3VudGVyLCBnYW1lKTtcclxuICAgICAgZ2FtZS5zcHJpdGVUaW1lVGV4dCA9IGdhbWUuYWRkLnRleHQoMTAwLCAzMCwgJzAwOjAwOjAwJywge2ZvbnQ6ICdJbmNvbnNvbGF0YScsIGZvbnRTaXplOiA0MH0pO1xyXG4gICAgICBnYW1lLnNwcml0ZVRpbWVUZXh0LmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjcmVhdGVFeHRSZWN0YW5nbGUoKTtcclxuICAgIGNyZWF0ZUludFJlY3RhbmdsZSgpO1xyXG4gICAgY3JlYXRlT3Bwb25lbnRzKCk7XHJcbiAgICBjcmVhdGVQbGF5ZXIoKTtcclxuICAgIGNyZWF0ZUJ1dHRvbnMoKTtcclxuICAgIGNyZWF0ZVRleHQoKTtcclxuICB9LFxyXG5cclxuICB1cGRhdGVDb3VudGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMudGltZVRleHQrKztcclxuICAgIHZhciB0aW1lID0gbmV3IERhdGUoKHRoaXMudGltZVRleHQpKjEwMCk7XHJcblxyXG4gICAgdmFyIG1pbnV0ZXMgPSAodGltZS5nZXRNaW51dGVzKCk8OSk/XCIwXCIrdGltZS5nZXRNaW51dGVzKCk6dGltZS5nZXRNaW51dGVzKCk7XHJcbiAgICB2YXIgc2Vjb25kcyA9ICh0aW1lLmdldFNlY29uZHMoKTw9OSk/XCIwXCIrdGltZS5nZXRTZWNvbmRzKCk6dGltZS5nZXRTZWNvbmRzKCk7XHJcbiAgICB2YXIgbWlsbGlTZWNvbmRzID0gKHRpbWUuZ2V0TWlsbGlzZWNvbmRzKCkvMTAwPD05KT9cIjBcIit0aW1lLmdldE1pbGxpc2Vjb25kcygpLzEwMDp0aW1lLmdldE1pbGxpc2Vjb25kcygpLzEwMDtcclxuICAgIHRoaXMuc3ByaXRlVGltZVRleHQuc2V0VGV4dChtaW51dGVzICsgJzonKyBzZWNvbmRzICsgJzonKyBtaWxsaVNlY29uZHMpO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnBoeXNpY3MuYXJjYWRlLmNvbGxpZGUodGhpcy5vcHBvbmVudEdyb3VwLCB0aGlzLm9wcG9uZW50R3JvdXApO1xyXG4gICAgdGhpcy5waHlzaWNzLmFyY2FkZS5jb2xsaWRlKHRoaXMucGxheWVyU3ByaXRlLCB0aGlzLm9wcG9uZW50R3JvdXAsIHRoaXMucmVzZXRHYW1lLCBudWxsLCB0aGlzKTtcclxuICAgIHRoaXMucmVjdGFuZ2xlSW50Q29sbGlkZSgpO1xyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBTcHJpdGUgZGVidWcgaW5mb1xyXG4gICAgLy90aGlzLmdhbWUuZGVidWcuc3ByaXRlSW5mbyh0aGlzLnBsYXllclNwcml0ZSwgMzIsIDMyKTtcclxuICB9LFxyXG5cclxuICByZWN0YW5nbGVJbnRDb2xsaWRlOiBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5wbGF5ZXJTcHJpdGUueCAtICh0aGlzLnBsYXllclNpemUvMikgPCA1MCAgPyB0aGlzLnJlc2V0R2FtZSgpIDpcclxuICAgIHRoaXMucGxheWVyU3ByaXRlLnggKyAodGhpcy5wbGF5ZXJTaXplLzIpID4gMzUwID8gdGhpcy5yZXNldEdhbWUoKSA6XHJcbiAgICB0aGlzLnBsYXllclNwcml0ZS55IC0gKHRoaXMucGxheWVyU2l6ZS8yKSA8IDUwICA/IHRoaXMucmVzZXRHYW1lKCkgOlxyXG4gICAgdGhpcy5wbGF5ZXJTcHJpdGUueSArICh0aGlzLnBsYXllclNpemUvMikgPiAzNTAgPyB0aGlzLnJlc2V0R2FtZSgpIDogbnVsbDtcclxuICB9LFxyXG5cclxuICBvbkRyYWdTdGFydDogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMudGltZVRleHQgPSAwO1xyXG4gICAgdGhpcy50aW1lci5zdGFydCgpO1xyXG4gICAgdGhpcy5vcHBvbmVudEdyb3VwLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpe2NoaWxkLmJvZHkudmVsb2NpdHkuc2V0VG8oTWF0aC5yYW5kb20oKSA+IDAuNSA/IDE1MCotMTogMTUwLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgPiAwLjUgPyAxNTAqLTE6IDE1MCk7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RoaXMnKTtcclxuICB9LFxyXG5cclxuICByZXNldEdhbWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGdhbWUgPSB0aGlzO1xyXG4gICAgdGhpcy50aW1lci5zdG9wKGZhbHNlKTtcclxuICAgIHRoaXMucGxheWVyU3ByaXRlLnggPSB0aGlzLndvcmxkLmNlbnRlclg7XHJcbiAgICB0aGlzLnBsYXllclNwcml0ZS55ID0gdGhpcy53b3JsZC5jZW50ZXJZO1xyXG4gICAgXHJcbiAgICB0aGlzLnBsYXllclNwcml0ZS5pbnB1dC5kaXNhYmxlRHJhZygpO1xyXG4gICAgdGhpcy5vcHBvbmVudEdyb3VwLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5ib2R5LnZlbG9jaXR5LnNldFRvKDAsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleENoaWxkID0gZ2FtZS5vcHBvbmVudEdyb3VwLmdldEluZGV4KGNoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQucG9zaXRpb24ueCA9IGdhbWUub3BwUG9zaXRpb25zW2luZGV4Q2hpbGRdLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnBvc2l0aW9uLnkgPSBnYW1lLm9wcFBvc2l0aW9uc1tpbmRleENoaWxkXS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RoaXMnKTtcclxuICAgIHRoaXMucGxheWVyU3ByaXRlLmV2ZW50cy5vbkRyYWdTdGFydC5hZGRPbmNlKHRoaXMub25EcmFnU3RhcnQsIHRoaXMpO1xyXG4gICAgdGhpcy5wbGF5ZXJTcHJpdGUuaW5wdXQuZW5hYmxlRHJhZygpO1xyXG4gIH0sXHJcblxyXG4gIGdvRnVsbDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUuaXNGdWxsU2NyZWVuID8gdGhpcy5zY2FsZS5zdG9wRnVsbFNjcmVlbigpIDogdGhpcy5zY2FsZS5zdGFydEZ1bGxTY3JlZW4oKTtcclxuICB9LFxyXG5cclxuICBoYW5kbGVJbmNvcnJlY3Q6IGZ1bmN0aW9uKCl7XHJcbiAgICBpZighdGhpcy5nYW1lLmRldmljZS5kZXNrdG9wKXtcclxuICAgICB0aGlzLmdhbWUucGF1c2VkID0gdHJ1ZTtcclxuICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybicpLnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBoYW5kbGVDb3JyZWN0OiBmdW5jdGlvbigpe1xyXG4gICAgaWYoIXRoaXMuZ2FtZS5kZXZpY2UuZGVza3RvcCl7XHJcbiAgICAgIHRoaXMuZ2FtZS5wYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHVybicpLnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIiwiRHJhZ01lLkVuZE1lbnUgPSBmdW5jdGlvbihnYW1lKSB7fTtcclxuXHJcbkRyYWdNZS5FbmRNZW51LnByb3RvdHlwZSA9IHtcclxuICBjcmVhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLmFkZC50ZXh0KHRoaXMud29ybGQuY2VudGVyWCwgMTAwLCBcIkdhbWUgT3ZlclwiKTtcclxuICAgIHRleHQuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgdGV4dC5hbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgdGV4dC5mb250ID0gJ0FyaWFsJztcclxuICAgIHRleHQuZm9udFdlaWdodCA9ICdib2xkJztcclxuICAgIHRleHQuZm9udFNpemUgPSA3MDtcclxuICAgIHRleHQuZmlsbCA9ICcjMDAwMDAwJztcclxuICAgIHRleHQuc2V0U2hhZG93KDMsIDMsICdyZ2JhKDAsMCwwLDAuNSknLCA1KTtcclxuXHJcbiAgICB0aGlzLnN0YXJ0QnV0dG9uID0gdGhpcy5hZGQuYnV0dG9uKHRoaXMud29ybGQuY2VudGVyWCwgMjI1LCAnYnV0dG9uU3RhcnQnLCB0aGlzLnN0YXJ0R2FtZSwgdGhpcywgMiwgMCwgMSk7XHJcbiAgICB0aGlzLnN0YXJ0QnV0dG9uLmFuY2hvci5zZXQoMC41LDApO1xyXG4gICAgdGhpcy5zdGFydEJ1dHRvbi5pbnB1dC51c2VIYW5kQ3Vyc29yID0gdHJ1ZTtcclxuICB9LFxyXG4gIHN0YXJ0R2FtZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhdGUuc3RhcnQoJ0dhbWUnKTtcclxuICB9XHJcbn07IiwiKGZ1bmN0aW9uKCkge1xyXG4gIHZhciBnYW1lID0gbmV3IFBoYXNlci5HYW1lKDQwMCwgNDAwLCBQaGFzZXIuQ0FOVkFTLCAnJywgbnVsbCwgdHJ1ZSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBEcmFnTWUuQm9vdCk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ1ByZWxvYWRlcicsIERyYWdNZS5QcmVsb2FkZXIpO1xyXG4gIGdhbWUuc3RhdGUuYWRkKCdNYWluTWVudScsIERyYWdNZS5NYWluTWVudSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ0dhbWUnLCBEcmFnTWUuR2FtZSk7XHJcbiAgZ2FtZS5zdGF0ZS5hZGQoJ0VuZE1lbnUnLCBEcmFnTWUuRW5kTWVudSk7XHJcblxyXG4gIGdhbWUuc3RhdGUuc3RhcnQoJ0Jvb3QnKTtcclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=