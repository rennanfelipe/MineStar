import Player from './Player.js';
import VirtualDPad from './VirtualDPad.js';

export default class Game extends Phaser.Scene {
    constructor () {
        super('Game');
        this.platforms;
        this.player;
        this.cursors;
        this.stars;
        this.score = 0;
        this.scoreText;
        this.bombs;
        this.gameOver = false;
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        this.score +=10;
        this.scoreText.setText('Score: ' + this.score);

        if(this.stars.countActive(true) == 0) {
            this.stars.children.iterate(function(child){
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 800);
            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    hitBomb(player) {
        this.physics.pause();
        this.player.hitBomb(player);

        let gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' });
        gameOverText.setOrigin(0.5);
        this.pressText = this.add.text( 168, 320, 'Press any key to re-start', { fontSize: '32px', fill: '#000' });
        this.input.keyboard.on('keydown', () => {
            this.scene.start('Game');
        });
        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }

    create () {
        this.add.image(400, 300, 'sky');
        
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = new Player(this, 100, 450);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {
                x: 12,
                y: 0,
                stepX:70
            }
        });

        this.stars.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'});
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        this.dpad = new VirtualDPad(this, 700, 500)
    }

    update () {
        if(this.cursors.left.isDown || this.dpad.direction === 'left' ) {
            this.player.setLeft();
        } else if (this.cursors.right.isDown || this.dpad.direction === 'right') {
            this.player.setRight();
        } else {
            this.player.setTurn();
        }

        if((this.cursors.up.isDown && this.player.body.touching.down) || (this.dpad.direction === 'up' && this.player.body.touching.down)) {
            this.player.setUp();
        }

        if(this.cursors.space.isDown && this.player.body.touching.down) {
            this.player.setUp();
        }

        if( this.gameOver ) {
            this.physics.pause();
        }
    }
}