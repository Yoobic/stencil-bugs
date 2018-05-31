export class AnimateState {
    constructor(public state: string, private toggleStateHandler: Function) { }

    toggleState() {
        this.state = this.toggleStateHandler(this.state);
    }
}
