export default class VirtualDPad {

    constructor(scene, x, y) {
        this.scene = scene;
        this.direction = null;

        this.up = scene.add.image(x, y - 80, 'upButton')
            .setInteractive();
        this.setupButton(this.up, 'up');

        // this.down = scene.add.image(x, y + 100, 'downButton')
        //     .setInteractive();
        // this.setupButton(this.down, 'down');

        this.left = scene.add.image(x - 50, y, 'leftButton')
            .setInteractive();
        this.setupButton(this.left, 'left');    

        this.right = scene.add.image(x + 50, y, 'rightButton')
            .setInteractive();
        this.setupButton(this.right, 'right');
    }


    setupButton(button, direction) {

        button.on('pointerdown', () => {
            this.direction = direction;
        });

        button.on('pointerup', () => {
            this.direction = null;
        });

        button.on('pointerout', () => {
            this.direction = null;
        });
    }

    update() {
        this.direction = null;

        if (this.up.input.pointer.isDown) {
            this.direction = 'up';
        }
        else if (this.down.input.pointer.isDown) {
            this.direction = 'down';
        }
        else if (this.left.input.pointer.isDown) {
            this.direction = 'left';
        }
        else if (this.right.input.pointer.isDown) {
            this.direction = 'right';
        }
    }
}