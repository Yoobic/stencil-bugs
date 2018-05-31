import { Component, Element, Prop, Event, EventEmitter, State, Method } from '@stencil/core';
import { IWebMenuEntry } from '@shared/interfaces';
import { getBackImageStyle, cloudinary, resizeWindow } from '../../../utils/helpers'; //intersectionObserve

@Component({
    tag: 'yoo-web-menu',
    styleUrl: 'web-menu.scss',
    scoped: true
})
export class WebMenuComponent {

    @Prop() entry: IWebMenuEntry;
    @Prop() activePage: string; // name of the active page

    @Event() itemClicked: EventEmitter<any>;
    @Event() profilClicked: EventEmitter<any>;

     @Element() host: HTMLStencilElement;

    @State() logoWidth: number = 34;
    @State() logoHeight: number = 34;
    @State() scrollHeight: string;

    tooltipOptions: any = {
        theme: 'dark',
        size: 'small',
        distance: 14
    };

    isActivePage(page: any): boolean {
        return page.href && this.activePage && page.href === this.activePage;
    }

    @Method()
    resize() {
        let slim = this.host.querySelector('yoo-slim-scroll');
        if (slim) {
            this.scrollHeight = slim.clientHeight - (this.host.querySelector('.menu-container').clientHeight - window.innerHeight) + 'px';
        }
    }

    componentDidLoad() {
        setTimeout(() => this.resize(), 300);
        resizeWindow(() => this.resize());
    }

    renderUser(): JSX.Element {
        return (this.entry ?
            <yoo-avatar class="small" user={this.entry.user} onClick={() => this.profilClicked.emit(this.entry.user)}></yoo-avatar>
            : null);
    }

    render(): JSX.Element {
        return (
            <div class="menu-container" attr-layout="column">
                {this.entry && this.entry.logo ?
                    <div class="menu-logo">
                        <div class="image" style={getBackImageStyle(cloudinary(this.entry.logo, this.logoWidth, this.logoHeight))} />
                    </div> : null}
                <yoo-slim-scroll height={this.scrollHeight}>
                    <div>
                        {this.entry && this.entry.items && this.entry.items.length ?
                            <div class="menu-items" attr-layout="column">
                                {this.entry.items.map(a =>
                                    <div class={'item-container ' + (a.separator ? 'item-separator' : '')}>
                                        <div>
                                            <yoo-tooltip placement="left" text={a.label} options={this.tooltipOptions}>
                                                {a.icon ?
                                                    <div class={'menu-icon' + (this.isActivePage(a) ? ' selected' : '')}
                                                        onClick={() => { this.itemClicked.emit(a); }}>
                                                        {a.iconSelected && this.isActivePage(a) ?
                                                            <i class={a.iconSelected}></i>
                                                            : <i class={a.icon}></i>}
                                                        {a.badge ? <yoo-badge text={a.badge} class="notification danger"></yoo-badge> : null}
                                                    </div> : null}
                                            </yoo-tooltip>
                                        </div>
                                    </div>
                                )}
                            </div> : null}
                    </div>
                </yoo-slim-scroll>
                {this.entry && this.entry.user ?
                    <div class="menu-user">
                        {this.renderUser()}
                    </div> : null}
            </div>
        );
    }
}
