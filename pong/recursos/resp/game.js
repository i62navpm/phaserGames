window.onload = function() {

	var gameRatio = window.innerWidth/window.innerHeight;		

	var game = new Phaser.Game(Math.ceil(640*gameRatio), 640, Phaser.CANVAS);

	var firstRunLandscape;

	

	var play = function(game){}  

	

	play.prototype = {

		preload:function(){

			

			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			game.scale.forceOrientation(true, false);

			game.scale.enterIncorrectOrientation.add(handleIncorrect);

        	game.scale.leaveIncorrectOrientation.add(handleCorrect);

			game.load.image("topleft", "topleft.png");

			game.load.image("center", "center.png");

			game.load.image("bottomright", "bottomright.png");

		},

		create:function(){

			game.add.sprite(0,0,"topleft");

			game.add.sprite(game.width/2,game.height/2,"center").anchor.set(0.5,0.5);	

			game.add.sprite(game.width,game.height,"bottomright").anchor.set(1,1);		

		}

	}

	

	function handleIncorrect(){

     	if(!game.device.desktop){

     		document.getElementById("turn").style.display="block";

     	}

	}

	

	function handleCorrect(){

		if(!game.device.desktop){


			document.getElementById("turn").style.display="none";

		}

	}

	

	game.state.add("Play",play);

	game.state.start("Play");

}