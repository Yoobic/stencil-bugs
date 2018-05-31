import { Component, Prop, Event, EventEmitter, State, Element } from '@stencil/core';
import { IAbstractGameEntry } from '@shared/interfaces';

import * as fromGame from '../../../games';

@Component({
    tag: 'yoo-form-input-game',
    styleUrl: 'form-input-game.scss',
    scoped: true
})
export class YooFormInputGameComponent {

    @Prop() name: string = fromGame.games.runner;
    @Prop() phaser: any; // Phaser instance imported by the framework
    @Prop() fieldId: string = 'game-div';

    @Event() gameOver: EventEmitter<boolean>;

    @State() isGameOver: boolean;

    @Element() host: HTMLStencilElement;

    private gameProps: IAbstractGameEntry = null; // test purpose
    private game: fromGame.AbstractGame;

    setGameProps(): void {
        this.gameProps = {fieldId: this.fieldId};
        // console.log('gameProps', this.gameProps);
    }

    init(): void {
        this.game = fromGame.gameFactory(this.name);
        this.game.gameover.subscribe(val => {
            this.isGameOver = val;
          });
        // console.log('game', this.game);
        this.setGameProps();
        this.game.initWithPhaser(this.gameProps, this.phaser);
    }

    componentDidLoad() {
        setTimeout(() => this.init(), 300);
    }

    componentWillUpdate() {
        // console.log('Comp Phaser will Upload, isGameOver?, event emitted by Stencil !', this.isGameOver);
        if (this.isGameOver) {
          this.gameOver.emit(true);
        }
      }

    render(): JSX.Element {
        return (
            <div>
                <div class="container" id={this.fieldId}></div>
            </div>
        );
    }
}
