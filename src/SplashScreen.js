export default class SplashScreen extends Phaser.Scene {
    constructor () {
        super('SplashScreen');
    }

    create () {
        this.add.image(400, 300, 'sky');

        const { width, height } = this.cameras.main;
        const x = width / 2;
        const y = height / 2;
        const scale = 10;
        const innerStar = this.add.image(x, y, 'star');

        innerStar.setScale(1);

        this.tweens.add({
            targets: innerStar,
            scaleX: scale,
            scaleY: scale,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        this.pressText = this.add.text(x - 200, y + 140, 'Press any key to start', { fontSize: '32px', fill: '#000' });
        this.input.keyboard.on('keydown', () => {
            this.scene.start('Game');
        });

        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }

    update() {
    }
}