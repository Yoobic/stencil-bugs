import { Subject } from 'rxjs';
const DEFAULT_ASSETS_DIR = 'assets/game';
export class AbstractGame {
    constructor() {
        this.gameover = new Subject();
    }
    initWithPhaser(props, phaser) {
        AbstractGame._phaser = phaser;
        if (props.assetDir) {
            this.assetDir = props.assetDir;
        }
        else {
            this.assetDir = DEFAULT_ASSETS_DIR;
        }
        this.fieldId = props.fieldId;
        this.initGameInstance(props);
        //this.gameInstance = this.gameInstance; ??
    }
    initGameInstance(_props) {
        return null;
    }
    getPreloadGame() {
        return null;
    }
    getCreateGame() {
        return null;
    }
    getUpdateGame() {
        return null;
    }
}
AbstractGame._phaser = null;
