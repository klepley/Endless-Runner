let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [Menu, LoreMenu, Play ]
}

let cursors
let game = new Phaser.Game(config);

let { height, width } = game.config

// setting UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3