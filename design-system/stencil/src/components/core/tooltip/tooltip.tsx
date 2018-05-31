import { Component, Prop, Element, Watch } from '@stencil/core';
import tippy from 'tippy.js';

@Component({
    tag: 'yoo-tooltip',
    styleUrl: 'tooltip.scss',
    scoped: true
})
export class YooTooltipComponent {
    @Prop() placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end';
    @Prop() options: any;
    @Prop() text: string;

    @Element() protected host: HTMLElement;

    protected tippy: any = null;

    @Watch('options')
    onOptionsChange() {
        this.loadTippy();
    }

    @Watch('text')
    onTextChange() {
        this.loadTippy();
    }

    componentWillLoad() {
        this.loadTippy();
    }

    loadTippy(): void {
        // Title is not an option in the API; set it directly as an attribute
        this.host.setAttribute('title', this.text);
        let tippyOptions = {
            theme: 'light',
            placement: this.placement,
            arrow: true,
            arrowType: 'round',
            createPopperInstanceOnInit: false,
            ...this.options
        };
        if (this.tippy) {
            this.tippy.destroyAll();
        }
        // Moved tooltip to always be on the host element
        this.tippy = tippy(this.host, tippyOptions);
    }

    render(): JSX.Element {
        return <slot></slot>;
    }
}
