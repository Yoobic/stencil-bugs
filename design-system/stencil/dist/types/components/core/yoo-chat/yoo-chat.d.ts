import { IChatMessage } from '@shared/interfaces';
export declare class YooChatComponent {
    heading: string;
    messages: IChatMessage[];
    _host: HTMLElement;
    render(): JSX.Element;
}
