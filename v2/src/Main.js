import PreLoader from "./PreLoader.js";
import Game from "./Game.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: [ PreLoader, Game ]
};

let game = new Phaser.Game(config);