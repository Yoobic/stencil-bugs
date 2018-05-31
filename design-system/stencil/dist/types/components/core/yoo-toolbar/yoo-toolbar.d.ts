import { IActionBar } from '@shared/interfaces';
export declare class YooToolbarComponent {
    actions: IActionBar[];
    showActive: boolean;
    activeAction: IActionBar;
    _host: HTMLElement;
    colors: Array<string>;
    onClick(action: IActionBar): void;
    getColor(i: number): string;
    render(): JSX.Element;
}
