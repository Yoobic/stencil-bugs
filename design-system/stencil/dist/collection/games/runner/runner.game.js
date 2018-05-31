import { AbstractGame } from '../abstract.game';
import { getRandomInt } from '../game-helpers';
//ToDo define additional attributes
//export interface RunnerGameEntry extends AbstractGameEntry {}
export class RunnerGame extends AbstractGame {
    constructor() {
        super(...arguments);
        this.gameWidth = 300;
        this.gameHeight = 200;
        this.wrongValues = [];
        this.correctValues = [];
        this.fontStyle = {
            font: '15px Arial',
            fill: '#fff',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        this.isPaused = true;
        this.isGameOver = false;
        this.words = [];
        this.clouds = [];
        this.cloudSpeeds = [];
        this.backgrounds = [];
        this.blockSpeed = 3;
        this.nextJump = 0;
    }
    // Define how to init
    initGameInstance(props) {
        this.gameInstance = new AbstractGame._phaser.Game(this.gameWidth, this.gameHeight, AbstractGame._phaser.AUTO, props.fieldId, {
            preload: () => this.getPreloadGame(),
            create: () => this.getCreateGame(),
            update: () => this.getUpdateGame()
        });
    }
    getPreloadGame() {
        this.gameInstance.load.image('sky', this.assetDir + '/sky.png');
        this.gameInstance.load.image('ground', this.assetDir + '/ground.png');
        this.gameInstance.load.image('cloud', this.assetDir + '/cloud.png');
        this.gameInstance.load.image('bg_hill_1', this.assetDir + '/bg_hill_1.png');
        this.gameInstance.load.image('bg_hill_2', this.assetDir + '/bg_hill_2.png');
        this.gameInstance.load.image('block', this.assetDir + '/block.png');
        this.gameInstance.load.spritesheet('mario', this.assetDir + '/mario.png', 50, 50);
    }
    getCreateGame() {
        this.gameInstance.physics.startSystem(AbstractGame._phaser.Physics.ARCADE); // We're going to be using physics, so enable the Arcade Physics system
        this.resetGameData();
        this.initBackgroundElements();
        this.initCollectibleObjects();
        this.initHUD();
        this.initPlayer();
        this.initListeners();
    }
    getUpdateGame() {
        if (this.gameInstance &&
            this.gameInstance.physics &&
            this.gameInstance.physics.arcade) {
            this.gameInstance.physics.arcade.collide(this.player, this.groundTile); // Collide the player with the ground
            this.gameInstance.physics.arcade.overlap(this.player, this.block, this.handleCollision, null, this);
        }
        if (!this.isPaused && !this.isGameOver) {
            if (this.isJumping) {
                this.player.loadTexture('mario', 5);
                this.jumpNow();
            }
            else {
                this.player.animations.play('walk');
            }
            for (let i = 0; i < this.backgrounds.length; i++) {
                let background = this.backgrounds[i];
                if (background.x > -600) {
                    background.x -= 4;
                }
                else {
                    background.x = this.gameInstance.world.width + 600;
                }
            }
            for (let i = 0; i < this.clouds.length; i++) {
                let cloud = this.clouds[i];
                if (cloud.x > -100) {
                    cloud.x -= this.cloudSpeeds[i];
                }
                else {
                    cloud.x = 500;
                }
            }
            if (this.block.x > -250) {
                this.block.x -= this.blockSpeed;
            }
            else {
                this.block.x = this.gameInstance.world.width + 250;
                this.remainingWordsText.setText('WORDS' //this.translate.get('WORDS') + ': ' + this.words.length
                );
                if (this.words.length > 0) {
                    // next word
                    this.currentWord = this.words.shift();
                    this.block.removeChild(this.blockLabel);
                    this.blockLabel = this.gameInstance.add.text(40, 5, this.currentWord, this.fontStyle);
                    this.block.addChild(this.blockLabel);
                }
                else {
                    this.player.loadTexture('mario', 5);
                    this.gameOver();
                }
            }
        }
        else {
            this.player.animations.stop();
        }
    }
    initBackgroundElements() {
        this.gameInstance.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, 'sky'); // A simple background for our game
        for (let i = 0; i < 4; i++) {
            let operator = getRandomInt(1, 4) === 2 ? 1 : -1;
            let cloud = this.gameInstance.add.sprite(this.gameInstance.world.width / 2 + operator * (30 * i), i * 30 + 80, 'cloud');
            cloud.anchor.set(0.5, 0.5);
            cloud.alpha = Math.random();
            this.clouds.push(cloud);
            this.cloudSpeeds.push(getRandomInt(0, 5) + 2);
        }
        this.backgrounds.push(this.gameInstance.add.sprite(0, this.gameInstance.world.height - 100, 'bg_hill_1'));
        this.backgrounds.push(this.gameInstance.add.sprite(800, this.gameInstance.world.height - 100, 'bg_hill_2'));
        this.groundTile = this.gameInstance.add.tileSprite(0, this.gameInstance.world.height - 16, this.gameInstance.world.width, this.gameInstance.world.height, 'ground');
        this.gameInstance.physics.arcade.enable(this.groundTile);
        this.groundTile.body.allowGravity = false;
        this.groundTile.body.immovable = true; // This stops it from falling away when you jump on it
    }
    initCollectibleObjects() {
        this.block = this.gameInstance.add.sprite(this.gameInstance.world.width + 500, this.gameInstance.world.height - 60, 'block');
        this.block.animations.add('spin');
        this.block.animations.play('spin', 2, true);
        this.remainingWordsText = this.gameInstance.add.text(16, 20, 'WORDS' + ':' + this.words.length, //this.translate.get('WORDS') + ': ' + +this.words.length,
        this.fontStyle);
        this.currentWord = this.words.shift();
        this.blockLabel = this.gameInstance.add.text(40, 5, this.currentWord, this.fontStyle);
        this.block.addChild(this.blockLabel);
        this.gameInstance.physics.arcade.enable(this.block);
    }
    initHUD() {
        this.centeredLabel = this.gameInstance.add.text(0, 0, 'START', //this.translate.get('START'),
        this.fontStyle);
        this.centeredLabel.setTextBounds(0, this.gameInstance.world.height / 2 - 15, this.gameInstance.world.width, 30);
        this.centeredLabel.inputEnabled = true;
        this.centeredLabel.events.onInputDown.add(() => {
            this.isPaused = false;
            this.centeredLabel.setText('');
            this.centeredLabel.inputEnabled = false;
        });
        this.pauseLabel = this.gameInstance.add.text(this.gameInstance.world.width - 100, 20, 'PAUSE', //this.translate.get('PAUSE'),
        this.fontStyle);
        this.pauseLabel.inputEnabled = true;
        this.pauseLabel.events.onInputDown.add(() => {
            this.pauseUnPauseGame();
        });
    }
    initPlayer() {
        // The player and its settings
        this.player = this.gameInstance.add.sprite(30, this.gameInstance.world.height - 70, 'mario');
        // We need to enable physics on the player
        this.gameInstance.physics.arcade.enable(this.player);
        // Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 700;
        this.player.body.collideWorldBounds = true;
        // add animations, walking
        this.player.animations.add('walk', [1, 2, 3, 4], 20, true);
    }
    initListeners() {
        this.gameInstance.input.onDown.add(() => {
            if (!this.isPaused && !this.isGameOver) {
                this.isJumping = true;
            }
        });
        this.gameInstance.input.onUp.add(() => {
            if (!this.isPaused && !this.isGameOver) {
                this.isJumping = false;
            }
        });
    }
    pauseUnPauseGame() {
        if (this.isPaused) {
            this.isPaused = false;
            this.gameInstance.state.resume();
            this.centeredLabel.setText('');
            //this.pauseLabel.setText(this.translate.get('PAUSE'));
            this.pauseLabel.setText('PAUSE');
        }
        else {
            this.isPaused = true;
            this.gameInstance.state.pause();
            //this.pauseLabel.setText(this.translate.get('UNPAUSE'));
            this.pauseLabel.setText('PAUSE');
        }
    }
    jumpNow() {
        if (this.gameInstance.time.now > this.nextJump) {
            this.player.body.velocity.y = -400;
            this.nextJump = this.gameInstance.time.now + 1500;
        }
    }
    handleCollision(player, block) {
        block.x = this.gameInstance.world.width + 500;
        if (this.wrongValues.indexOf(this.currentWord) >= 0) {
            player.loadTexture('mario', 6);
            this.gameOver();
        }
        else {
            this.score++;
            this.remainingWordsText.setText(
            //this.translate.get('WORDS') + ': ' + this.words.length
            'WORDS' + ':' + this.words.length);
            if (this.words.length > 0) {
                this.currentWord = this.words.shift();
                block.removeChild(this.blockLabel);
                this.blockLabel = this.gameInstance.add.text(40, 5, this.currentWord, this.fontStyle);
                block.addChild(this.blockLabel);
            }
            else {
                player.loadTexture('mario', 5);
                this.gameOver();
            }
        }
    }
    resetGameData() {
        this.score = 0;
        this.clouds = [];
        this.cloudSpeeds = [];
        this.block = {
            x: -250
        };
        this.isGameOver = false;
        this.isPaused = true;
        this.isJumping = false;
    }
    gameOver() {
        //this.centeredLabel.setText(this.translate.get('GAMEOVER'));
        this.centeredLabel.setText('GAMEOVER');
        this.pauseLabel.setText('');
        this.isGameOver = true;
        this.gameover.next(true);
    }
}
