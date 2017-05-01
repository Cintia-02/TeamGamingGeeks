var demo = {};
var speed = 6;
var david;
var cursors;
var platforms;

demo.state0 = function () {};


demo.state0.prototype = {
	preload: function () {
		game.load.image('winter', 'assets/TGGwinter.png');
        game.load.spritesheet('david', 'assets/davidSpritesheet.png', 54, 250, 16);
        game.load.image('ground','assets/platforms.png');
	},

	create: function () {
        game.world.setBounds(0, 0, 2813, 1000);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        var winter = game.add.image(0, 0, 'winter');
        
       
        david = game.add.sprite(0, 450, 'david');
        game.physics.enable(david);
        david.body.gravity.y = 600;
        david.body.collideWorldBounds = true;
        david.scale.setTo(0.7, 0.7);
        david.animations.add('walkright',  [0, 1, 2]);
        david.animations.add('walkleft',  [8, 9, 10]);
        david.animations.add('jump_right',  [3,4,5]);
        david.animations.add('jump_left',[11,12,13])
        david.animations.add('duck_right', [6,7]);
        david.animations.add('duck_left', [14,15]);

        cursors = game.input.keyboard.createCursorKeys();
        
        //The platforms group contains the ground and the two ledges we can jump on
        platforms = game.add.group();
        platforms.enableBody = true;
        
        //Here we create the ground
        var ground = platforms.create(0, game.world.height-64, 'ground');
        gound.scale.setTo(2,2);
        ground.body.immovable = true;
        
        //Here we create two ledges
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        
        ledge = platforms.create(-150, 250, 'ground');
        

    },

	update: function(){
        game.physics.arcade.collide(david, platforms);
        
        david.body.velocity.x = 0;
        if(cursors.left.isDown){
            david.body.velocity.x = -150;
            david.animations.play('walkleft');
            
        }else if(cursors.right.isDown){
            david.body.velocity.x = 150;
            david.animations.play('walkright');
            
        }else {
            david.animations.stop();
            david.frame=1;
        }
        
        //Allow the player to jump if they are touching the ground
        if(cursors.up.isDown && david.body.touching.down){
            david.body.velocity.y = -350;
            david.animations.play('jump_right');
        }
}

};
 