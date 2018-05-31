import { AbstractGame } from '../abstract.game';
export class ExampleGame extends AbstractGame {
    constructor() {
        super();
        this.config = {
            gameWidth: 400,
            gameHeight: 600
        };
    }
    // Re implementation of the init game Instance to switch between game configs
    // config for small/large size for example
    initGameInstance(props) {
        this.gameInstance = new AbstractGame._phaser.Game(this.config.gameWidth, this.config.gameHeight, AbstractGame._phaser.AUTO, props.fieldId, {
            preload: () => this.getPreloadGame(),
            create: () => this.getCreateGame(),
            update: () => this.getUpdateGame()
        });
    }
    getPreloadGame() {
        // implement
    }
    getCreateGame() {
        // implement
    }
    emitGameOver() {
        this.gameover.next(true);
    }
}
