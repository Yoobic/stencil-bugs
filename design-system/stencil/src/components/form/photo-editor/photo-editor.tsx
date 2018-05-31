import { Component, Element, Prop, Event, EventEmitter } from '@stencil/core';
import { ICoreConfig } from '@shared/interfaces';
import { getProtocol, getElementDimensions } from '../../../utils/helpers';

@Component({
    tag: 'yoo-photo-editor',
    styleUrl: 'photo-editor.scss',
    scoped: true
})
export class YooPhotoEditorComponent {

    @Prop() readonly: boolean;
    @Prop() src: string;

    // @State() imageHasLoaded: boolean = false;

    @Event() imageClicked: EventEmitter<boolean>;
    @Element() host: HTMLStencilElement;

    imageTop: number = 0;
    imageLeft: number = 0;
    zoomComponent: HTMLYooZoomElement;
    canvasContext: any;
    private canvas: HTMLCanvasElement;
    private image: HTMLImageElement;
    // private colors: Array<string> = [Colors.assertive, Colors.balanced, Colors.positive, Colors.royal, Colors.energized, Colors.stable];
    private isLoading: boolean = false;
    private imageWidth: number = 0;
    private imageHeight: number = 0;

    private coreConfig: ICoreConfig = (window as any).coreConfigService;
    private isMobile: boolean;

    componentWillLoad() {
        // query selectors here seem to be giving errors
        this.coreConfig ? this.isMobile = this.coreConfig.isIonic() : this.isMobile = false;
    }

    componentDidLoad() {
        if (this.isMobile) {
            this.zoomComponent = this.host.querySelector('yoo-zoom');
        }
        this.canvas = this.host.querySelector('canvas');
        this.image = this.host.querySelector('.image');
        if (this.image && this.src) {
            this.isLoading = true;
            this.image.onload = () => this.onPhotoLoad();
            let src = this.src.replace('/upload/', '/upload/c_fill/').replace('http:', getProtocol());
            this.image.src = src;
        }
        // this.imageHasLoaded = true;
    }

    onPhotoLoad() {
        this.canvasContext = this.canvas.getContext('2d');
        this.centerPhoto();
    }

    onImageClicked() {
        this.imageClicked.emit(true);
    }

    centerPhoto() {
        this.imageWidth = this.image.width;
        this.imageHeight = this.image.height;
        const { height: hostHeight, width: hostWidth } = getElementDimensions(this.host);

        this.imageTop = (hostHeight - this.imageHeight) / 2;
        this.imageLeft = (hostWidth - this.imageWidth) / 2;
        // console.log('canvas before centering', this.canvas);
        // Match canvas to image
        this.canvas.width = this.imageWidth;
        this.canvas.height = this.imageHeight;
        // console.log('canvas after centering', this.canvas);
        // console.log('should have set canvas height', this.canvas, this.image);
    }

    setupListeners() {}

    renderWeb(): JSX.Element {
        return ([
            <img class="image" src={this.src}/>,
            <canvas class="canvas"></canvas>
        ]);
    }

    renderMobile() {
        return (
            <yoo-zoom>
                <img class={'image image-mobile ' + (this.isLoading ? 'opacity-0' : '')}/>
                <canvas class="canvas canvas-mobile" onClick={() => this.onImageClicked()}></canvas>
            </yoo-zoom>
        );
    }

    render(): JSX.Element {
        return (
            this.isMobile ? this.renderMobile() : this.renderWeb()
        );
    }
}
