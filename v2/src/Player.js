export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dude');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
    }

    hitBomb(player) {
        player.setTint(0xff0000);
        let anim = player.anims.play('turn');
        console.log('Player hit bomb, animation:', anim);
    }

    setLeft() {
        this.setVelocityX(-160);
        this.anims.play('left', true);
    }

    setRight() {
        this.setVelocityX(160);
        this.anims.play('right', true);
    }

    setTurn() {
        this.setVelocityX(0);
        this.anims.play('turn');
    }

    setUp() {
        this.setVelocityY(-330);
    }
}