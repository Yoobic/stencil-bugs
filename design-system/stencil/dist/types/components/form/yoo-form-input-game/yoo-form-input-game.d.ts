import { EventEmitter } from '@stencil/core';
export declare class YooFormInputGameComponent {
    name: string;
    phaser: any;
    fieldId: string;
    gameOver: EventEmitter<boolean>;
    isGameOver: boolean;
    _host: HTMLElement;
    private gameProps;
    private game;
    setGameProps(): void;
    init(): void;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    render(): JSX.Element;
}
