import { EventEmitter } from '@stencil/core';
import { IAnimationProp } from '@shared/interfaces';
export declare class YooModalComponent {
    heading: string;
    headingIcon: string;
    content: HTMLElement;
    primaryButtonText: string;
    secondaryButtonText: string;
    hasHeader: boolean;
    hasFooter: boolean;
    footerText: string;
    cssClass: string;
    animationName: string;
    animationProp: IAnimationProp;
    primaryFn: Function;
    withYooCtrl: boolean;
    primaryButtonClicked: EventEmitter<boolean>;
    closed: EventEmitter<boolean>;
    host: HTMLElement;
    onPrimaryButtonClick(event: any): void;
    close(): void;
    componentDidLoad(): void;
    animation(open: boolean, sentFromClose?: boolean): void;
    componentDidUpdate(): void;
    hostData(): {
        class: {
            ['custom-controller']: boolean;
        };
    };
    render(): JSX.Element;
}
