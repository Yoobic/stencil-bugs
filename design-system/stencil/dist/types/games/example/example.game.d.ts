import { AbstractGame } from '../abstract.game';
import { IAbstractGameEntry } from '@shared/interfaces';
export interface ExampleEntry extends IAbstractGameEntry {
    size?: string;
}
export declare class ExampleGame extends AbstractGame {
    config: {
        gameWidth: number;
        gameHeight: number;
    };
    constructor();
    initGameInstance(props: ExampleEntry): void;
    getPreloadGame(): void;
    getCreateGame(): void;
    emitGameOver(): void;
}
