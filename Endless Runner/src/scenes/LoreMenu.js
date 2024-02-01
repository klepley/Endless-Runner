class LoreMenu extends Phaser.Scene {
    constructor() {
        super("LoreScene")
    }

preload() {

}

    create() {
    // Add the lore text
    let loreText = "Once upon a time in the magical world of Ponyo, adventurous journeys await brave souls. Your mission is to navigate through treacherous obstacles, collect magical items, and discover the secrets of Ponyo. Are you ready to embark on this mystical adventure?";
    this.add.text(50, 50, loreText, {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#FFFFFF',
        align: 'left',
        wordWrap: { width: game.config.width - 500, useAdvancedWrap: true },
        backgroundColor: '#0000FF', // Blue background color
        padding: { left: 10, right: 10, top: 5, bottom: 5 } // Adjust the width as needed
    });

    // Add "How to Play" section on the right side
    let howToPlayText = "How to Play:\n\nUse the arrow keys to move your character.\nPress the spacebar to jump.\nAvoid obstacles and Grandma Turtle to score points.\nSwim for as long as possible to achieve the highest score!";
    this.add.text(game.config.width / 2 + 50, 50, howToPlayText, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'left',
            wordWrap: { width: game.config.width / 2 - 100, useAdvancedWrap: true }, // Adjust the width as needed
            backgroundColor: '#0000FF', // Blue background color
            padding: { left: 10, right: 10, top: 5, bottom: 5 } // Adjust the width as needed
        });

    let startGameText = "Click spacebar to start game";
    this.add.text(game.config.width / 2, game.config.height - 150, startGameText, {
        fontFamily: 'Arial',
        fontSize: '50px',
        color: '#FFFFFF',
        align: 'center',
        backgroundColor: '#0000FF', // Blue background color
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5);

    // Set up keyboard input for space bar
    this.input.keyboard.on('keydown-SPACE', function () {
    // Transition to the next scene
    this.scene.start('playScene'); // Replace 'NextScene' with the key of the scene you want to transition to
    }, this);    

    }

    update() {

    } 
}