class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.score = 0; // Initialize the score
    }
    
    init() {
        this.PLAYER_VELOCITY = 350
    }

    preload() {
        //this.load.image('ponyoLogo', './assets/ponyoLogo.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('seaweed', './assets/seaweed.png')
        this.load.image('floor', './assets/pebblefloor.png')
        this.load.image('enemy', './assets/enemyfish.png')
        this.load.spritesheet('fish1', './assets/fish1.png', {
            frameWidth: 48,
            frameHeight: 48
        });
    
    }

    create() {

        this.starfield = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'starfield').setOrigin(0);

        // Create a text object for displaying the score
        this.scoreText = this.add.text(
            this.game.config.width - 20, // X position from the right edge
            this.game.config.height - 20, // Y position from the bottom edge
            'Score: 0', // Initial text
            { fontFamily: 'Arial', fontSize: '20px', fill: '#ffffff' }
        ).setOrigin(1, 1); 

        // Create the ground and ceiling sprite and a corresponding physics body
        this.ground = this.add.tileSprite(0, this.scale.height - 60, this.scale.width, 60, 'floor').setOrigin(0);
        this.physics.world.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.ceiling = this.add.tileSprite(0, 0, this.scale.width, 60, 'floor').setOrigin(0);
        this.physics.world.enable(this.ceiling);
        this.ceiling.body.allowGravity = false;
        this.ceiling.body.immovable = true;

        // Create a group for seaweed at the top
        this.topSeaweeds = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            key: 'seaweed', // Replace 'seaweed' with the key of your seaweed image
            repeat: 5, // Adjust the number of seaweeds as needed
            setXY: {
                x: game.config.width + 50, // Initial X position off the right side of the screen
                y: 10, // Initial Y position for the top seaweed
                stepX: 100, // Horizontal spacing between seaweeds
            },
        });

        // Create a group for seaweed at the bottom
        this.bottomSeaweeds = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            key: 'seaweed', // Replace 'seaweed' with the key of your seaweed image
            repeat: 5, // Adjust the number of seaweeds as needed
            setXY: {
                x: game.config.width + 50, // Initial X position off the right side of the screen
                y: game.config.height - 20, // Initial Y position for the bottom seaweed
                stepX: 100, // Horizontal spacing between seaweeds
            },
        });

        // Set up movement and flipping for top seaweed
        this.topSeaweeds.children.iterate((seaweed) => {
            seaweed.setScale(0.35); // Adjust the scale factor
            this.physics.world.enable(seaweed); // Enable physics for the seaweed

            // Set up velocity on the body of the seaweed
            seaweed.body.setVelocityX(-150); // Adjust the speed as needed

            // Flip the seaweed upside down
            seaweed.setFlipY(true);

            // Add collision between seaweed and ceiling
            this.physics.add.collider(seaweed, this.ceiling, this.adjustSeaweedPosition, null, this);
        });

        // Set up movement and flipping for bottom seaweed
        this.bottomSeaweeds.children.iterate((seaweed) => {
            seaweed.setScale(0.35); // Adjust the scale factor
            this.physics.world.enable(seaweed); // Enable physics for the seaweed

            // Set up velocity on the body of the seaweed
            seaweed.body.setVelocityX(-250); // Adjust the speed as needed

            // Add collision between seaweed and ground
            this.physics.add.collider(seaweed, this.ground, this.adjustSeaweedPosition, null, this);
        });


        // Create a group to hold multiple enemies
        this.enemies = this.physics.add.group({
            classType: Phaser.GameObjects.Sprite,
            key: 'enemy',
            repeat: 2, // Adjust the number of enemies as needed
            setXY: {
                x: game.config.width + 50, // Initial X position off the right side of the screen
                y: Phaser.Math.Between(game.config.height / 3, (2 * game.config.height) / 3), // Initial Y position within the middle third
                stepX: 100, // Horizontal spacing between enemies
            }
        });

        // Set up movement for each enemy
        this.enemies.children.iterate((enemy) => {
            enemy.setScale(0.015); // Adjust the scale factor
            this.physics.world.enable(enemy); // Enable physics for the enemy

            // Set up velocity on the body of the enemy
            enemy.body.setVelocityX(-500); // Adjust the speed as needed
        });

        // Set up player sprite with physics
        this.player = this.physics.add.sprite(100, game.config.height / 2, 'fish1', 1).setScale(2);
        this.physics.world.enable(this.player); // Make sure this line is executed before setting up collisions

        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(25, 30).setOffset(10, 10);

        cursors = this.input.keyboard.createCursorKeys();

        // Start the Enemy scene
        //this.scene.launch('enemyScene');

        // Set up collision between fish1 and ground/ceiling with callback
        this.physics.add.collider(this.player, this.ground, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.ceiling, this.gameOver, null, this);

        // Set up collisions
        this.checkCollision(this.player, this.enemies);
        this.physics.add.collider(this.player, this.topSeaweeds, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.bottomSeaweeds, this.gameOver, null, this);

    
        // Add collisions between the player sprite and the top and bottom borders
        //this.physics.add.collider(this.player, topBorder, this.gameOver, null, this);
        //this.physics.add.collider(this.player, bottomBorder, this.gameOver, null, this);

        //Swim down
        this.anims.create({
        key: 'walk-down',
        frameRate: 12,
        reapeat: -1,
        frames: this.anims.generateFrameNumbers('fish1', {
            start: 0,
            end: 7
        })
    })

        //Swim up
        this.anims.create({
            key: 'walk-up',
            frameRate: 12,
            reapeat: -1,
            frames: this.anims.generateFrameNumbers('fish1', {
                start: 0,
                end: 7
            })
        })

        // // Set up player sprite with physics
        // this.player = this.physics.add.sprite(100, game.config.height / 2, 'fish1', 1).setScale(2);
        // this.physics.world.enable(this.player);

        // this.player.body.setCollideWorldBounds(true);
        // this.player.body.setSize(25, 30).setOffset(10, 10);

        // cursors = this.input.keyboard.createCursorKeys();
        
        // // Add collisions between the player sprite and the top and bottom borders
        // this.physics.add.collider(this.player, topBorder, this.gameOver, null, this);
        // this.physics.add.collider(this.player, bottomBorder, this.gameOver, null, this);
    }


    update() {

        // Increase the score over time (you can adjust the rate)
        this.score += 1;

        // Update the score text
        this.scoreText.setText('Score: ' + this.score);

        // Check if any top seaweed is off the left side of the screen
        this.topSeaweeds.children.iterate((seaweed) => {
            if (seaweed.x < 0) {
                // Respawn the seaweed on the right side
                seaweed.x = game.config.width + 50;
                seaweed.y = 20; // Adjust the initial Y position for the top seaweed
            }
        });

        // Check if any bottom seaweed is off the left side of the screen
        this.bottomSeaweeds.children.iterate((seaweed) => {
            if (seaweed.x < 0) {
                // Respawn the seaweed on the right side
                seaweed.x = game.config.width + 50;
                seaweed.y = game.config.height - 20; // Adjust the initial Y position for the bottom seaweed
            }
        });

        // Continuously scroll the background to the left
        this.starfield.tilePositionX += 4; // Adjust the scrolling speed as needed

        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'

        //Create animations
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            reapeat: -1,
            frames: this.anims.generateFrameNumbers('fish1', {
                start: 1,
                end: 1 
            })
        })

        //handle up/down
        if(cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = 'up'
        } else if(cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = 'down'
        }
        
            //playerVector.normalize()

            playerVector.normalize()

            this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
    
            let playerMovement
            playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
            this.player.play(playerMovement + '-' + playerDirection, true)
    
    // Check if any enemy is off the left side of the screen
    this.enemies.children.iterate((enemy) => {
        if (enemy.x < 0) {
            // Respawn the enemy on the right side with a new random vertical position
            enemy.x = game.config.width + 50; // Initial X position off the right side of the screen
            enemy.y = Phaser.Math.Between(game.config.height / 3, (2 * game.config.height) / 3); // Initial Y position within the middle third
        }
    });
}

    adjustSeaweedPosition(seaweed) {
        if (seaweed.y < game.config.height / 2) {
            // If top seaweed collides with ceiling, adjust its Y position
            seaweed.y = 125 ;
        } else {
            // If bottom seaweed collides with ground, adjust its Y position
            seaweed.y = game.config.height - 125 ;
        }
    }

    checkCollision(player, enemies) {
        this.physics.add.collider(player, enemies, this.gameOver, null, this);
    }
    

    gameOver() {
        // Custom game over logic
        // You can add any game over logic here, such as displaying a game over message or restarting the game.
        this.scene.start('menuScene');
        // Add your custom game over logic here
    }

}