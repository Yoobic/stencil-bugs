import { AbstractGame } from '../abstract.game';
import { IAbstractGameEntry } from '@shared/interfaces';

// The custom entry of a game can be used to set-up different config in the initGameInstance
// You can see a basic example below
export interface ExampleEntry extends IAbstractGameEntry {
  size?: string;
}

export class ExampleGame extends AbstractGame {

    config = {
        gameWidth: 400,
        gameHeight: 600
    };

    constructor() {
        super();
    }

  // Re implementation of the init game Instance to switch between game configs
  // config for small/large size for example
  initGameInstance(props: ExampleEntry) {
    this.gameInstance = new AbstractGame._phaser.Game(this.config.gameWidth,
        this.config.gameHeight,
        AbstractGame._phaser.AUTO,
        props.fieldId,
        {
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
