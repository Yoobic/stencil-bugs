import { Subject } from 'rxjs';
import { IAbstractGameEntry } from '@shared/interfaces';
export declare class AbstractGame {
    protected static _phaser: any;
    gameInstance: any;
    gameover: Subject<boolean>;
    fieldId: string;
    assetDir: string;
    constructor();
    initWithPhaser(props: IAbstractGameEntry, phaser: any): void;
    initGameInstance(_props: IAbstractGameEntry): any;
    protected getPreloadGame(): any;
    protected getCreateGame(): any;
    protected getUpdateGame(): any;
}
