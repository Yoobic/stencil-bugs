import { Subject } from 'rxjs';
import { IAbstractGameEntry } from '@shared/interfaces';

const DEFAULT_ASSETS_DIR = 'assets/game';

export class AbstractGame {

    protected static _phaser: any = null;

    public gameInstance: any;

    public gameover: Subject<boolean>;

    public fieldId: string;
    public assetDir: string;

    constructor() {
        this.gameover = new Subject<boolean>();
    }

    initWithPhaser(props: IAbstractGameEntry, phaser: any) {
        AbstractGame._phaser = phaser;
        if (props.assetDir) {
            this.assetDir = props.assetDir;
        } else {
            this.assetDir = DEFAULT_ASSETS_DIR;
        }
        this.fieldId = props.fieldId;
        this.initGameInstance(props);
        //this.gameInstance = this.gameInstance; ??
    }

    initGameInstance(_props: IAbstractGameEntry): any {
        return null;
    }

    protected getPreloadGame() {
        return null;
    }

    protected getCreateGame() {
        return null;
    }

    protected getUpdateGame() {
        return null;
    }
}
