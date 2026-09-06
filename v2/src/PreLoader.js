export default class PreLoader extends Phaser.Scene {
    constructor () {
        super('PreLoader');
    }

    preload () {
        this.load.setPath('../assets/');
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude',
            'dude.png',
            {   
                frameWidth: 32,
                frameHeight: 48
            }
        );
    }

    create () {
        this.scene.start('Game');
    }
}