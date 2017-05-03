var demo = {};
var speed = 6;
var david;
var cursors;
var platforms;

demo.state0 = function () {};


demo.state0.prototype = {
	preload: function () {
        game.load.image('background', 'assets/TGGwinter.png');
        game.load.image('ground', 'assets/platforms.png');
        game.load.spritesheet('david','assets/davidSpritesheet.png', 54, 250, 16);
    },
    create:function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,'background');
        
        //The platforms group contains the ground and the 2 ledges we can jump on.
        platforms = game.add.group();
        //Enable physics for any object that is created in this group
        platforms.enableBody = true;
        
        //Create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        //Scale to fit the width of the game
        ground.scale.setTo(2,2);
        //This stop it from falling away when you jump on it.
        ground.body.immovable = true;
        
        //Now let's create two ledges.
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;
        
        //The player and its settings
        david = game.add.sprite(32, game.world.height - 150, 'david');
        
        //Enable physics on the player
        game.physics.arcade.enable(david);
        
        //David physics properties. Give the character a slight bounce.
        //david.body.bounce.y = 0.2;
        //david.body.gravity.y = 300;
        david.body.collideWorldBounds = true;
        
        //Our walking and jumping animations.
        david.animations.add('walk_left',[8,9,10]);
        david.animations.add('walk_right', [0, 1, 2]);
        
        //Our controls.
        cursors = game.input.keyboard.createCursorKeys();
    },
    update:function(){
        //Collide the player with the platforms.
        //game.physics.arcade.collide(david, platforms);
        
        david.body.velocity.x = 0;
        if(cursors.left.isDown){
            //Move to the left
            david.body.velocity.x = -150;
            david.animations.play('walk_left');
        }else if(cursors.right.isDown){
            //Move to the right
            david.body.velocity.x = 150;
            david.animations.play('walk_right');
        } else{
            //Stand still.
            david.animations.stop();
            david.frame = 3;
        }
        
        //Allow the player to jump if they are touching the ground.
        if(cursors.up.isDown && david.body.touching.down){
            david.body.velocity.y = -350;
            
        }
        
        
    }
		
};
 
