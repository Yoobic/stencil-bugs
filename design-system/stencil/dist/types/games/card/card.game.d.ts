import { IAbstractGameEntry } from '@shared/interfaces';
import { AbstractGame } from '../abstract.game';
export interface CardGameEntry extends IAbstractGameEntry {
    values?: Array<string>;
    correctValues?: Array<string>;
    wrongValues?: Array<string>;
}
export declare class CardGame extends AbstractGame {
    config: {
        gameWidth: number;
        gameHeight: number;
    };
    protected values: Array<string>;
    protected correctValues: Array<string>;
    protected wrongValues: Array<string>;
    private gameOptions;
    private REVEALED_FRAME;
    private cards;
    private texts;
    private flippingCards;
    private lastPickedCards;
    private mainLabel;
    constructor();
    initGameInstance(props: CardGameEntry): void;
    getPreloadGame(): void;
    getCreateGame(): void;
    initDeck(): void;
    initHUD(): void;
    playerHasWon(): boolean;
    createCard(cardIndex: any, pos: any, initRevealed: any): any;
    createCardText(sprite: any): any;
    createFlippingTweens(cardIndex: any, card: any, text: any): void;
    onTapCard(cardIndex: any, card: any): void;
    isSomeCardFlipping(): boolean;
    canFlipAnotherCard(): boolean;
    hideAllCards(): void;
    computeGameState(): void;
    resetGameData(): void;
}
