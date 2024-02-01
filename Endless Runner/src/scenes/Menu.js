class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

preload() {
    this.load.image('ponyoLogo', './assets/ponyoLogo.png')
    this.load.image('tempback', './assets/tempback.png')

}

    create() {
        let menuConfig = {
            fontFamily: 'Comic Sans',
            fontSize: '50px',
            backgroundColor: '#008080',
            color: '#FFB6C1',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
    
        // Add the PonyoLogo image and scale it
        let ponyoLogo = this.add.image(game.config.width / 2, 290, 'ponyoLogo').setOrigin(0.5, 0.5);
        ponyoLogo.setScale(0.8);  // Adjust the scale factor as needed
    
        // Add the text elements
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'NO, PONYO!', menuConfig).setOrigin(0.5, 0.5);
        this.add.text(game.config.width / 2, game.config.height - 50, 'Press the SpaceBar to Start', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFB6C1';
        menuConfig.color = '#008080';

        // Set up keyboard input for space bar
        this.input.keyboard.on('keydown-SPACE', function () {
            // Transition to the next scene
            this.scene.start('LoreScene'); // Replace 'NextScene' with the key of the scene you want to transition to
        }, this);       
    }

    update() {

    } 
}