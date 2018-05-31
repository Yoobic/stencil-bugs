import { Component, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { setAnimation, animations } from '../../../utils/anim';

@Component({
    tag: 'yoo-accordion',
    styleUrl: 'accordion.scss',
    scoped: true
})
export class YooAccordionComponent {

    @Prop() titles: string[] = ['accordion1'];
    @Prop() allowMultipleSelection: boolean;

    @Event() accordionSelected: EventEmitter<number>;

    @State() items: {title: string, selected: boolean}[] = [];

    @Element() host: HTMLStencilElement;

    private selectedIndex: number;
    private previousSelectedIndex: number;
    private animationRequiredAfterRender: boolean = false;

    @Watch('titles')
    titlesHandler(): void {
        this.itemsReset();
    }

    private itemsReset(): void {
        this.items = this.titles.map((item, index) => {
            if (this.host.querySelectorAll('.selected-accordion')[index]) {
                this.fadeAccordionContent('0', 0, index);
            }
            return {title: item, selected: false};
        });
    }

    private onAccordionClick(index: number): void {
        if (this.items[index].selected === true && !this.allowMultipleSelection) {
            this.fadeAccordionContent('0', 0, 0);
            this.animateTransition(index, true);
            this.itemsReset();
        } else {
            this.selectedIndex = index;
            if (!this.allowMultipleSelection) {
                this.items.map((o, i ) => {
                        if (o.selected) { this.previousSelectedIndex = i; }
                    });
                this.animationRequiredAfterRender = true;
                this.itemsReset();
                this.items[index].selected = !this.items[index].selected;
            } else {
                this.items = this.items.map((obj, index2) => {
                    if (index === index2) {
                        obj.selected ? (this.fadeAccordionContent('0', 0, 0), this.animateTransition(index, true)) : (this.animationRequiredAfterRender = true);
                        return { title: obj.title, selected: !obj.selected };
                    } else {
                        return obj;
                    }
                });
            }
        }
        this.accordionSelected.emit(index);
    }

    private fadeAccordionContent(opacity: string, timeout: number, index: number): void {
        let selected = this.allowMultipleSelection ? this.host.querySelector(`#${this.items[this.selectedIndex].title}`) : this.host.querySelectorAll('.selected-accordion')[index];
        if (selected) {
            setTimeout(() => {
                selected.setAttribute('style', `opacity: ${opacity};`);
            }, timeout);
        }
    }

    private animateTransition(index: number, up: boolean): void {
        let distance = this.host.querySelector('.selected-accordion').clientHeight;
        let count = 0;
        this.items.map((_o, i) => {
            if (this.previousSelectedIndex > this.selectedIndex) {
                const animationNumber = this.previousSelectedIndex - this.selectedIndex;
                if (i > this.selectedIndex && animationNumber > count) {
                    setAnimation(animations.slideVertical, this.host.querySelectorAll('.accordion-selector')[i], {up: false, distance: distance, open: true});
                    count = count + 1;
                }
            } else if (this.selectedIndex > this.previousSelectedIndex && (this.previousSelectedIndex !== null)) {
                const animationNumber = this.selectedIndex - this.previousSelectedIndex;
                if (i > this.previousSelectedIndex && animationNumber > count) {
                    setAnimation(animations.slideVertical, this.host.querySelectorAll('.accordion-selector')[i], {up: true, distance: distance, open: true});
                    count = count + 1;
                }
            } else {
                if (i > index) {
                    setAnimation(animations.slideVertical, this.host.querySelectorAll('.accordion-selector')[i], {up: up, distance: distance, open: true});
                }
            }
        });
    }

    componentWillLoad() {
        this.itemsReset();
    }

    componentDidUpdate() {
        if (this.animationRequiredAfterRender) {
                this.fadeAccordionContent('1', 150, 0);
                this.animateTransition(this.selectedIndex, false);
        }
        this.animationRequiredAfterRender = false;
        this.selectedIndex = null;
        this.previousSelectedIndex = null;
    }

    render(): JSX.Element {
        return (
            <div class="outer-container" >
                {this.items.map((obj, index) =>
                    <div class="accordion-selector">
                        <div class={'accordion-title ' + (this.items[index].selected ? 'active-title' : '')} onClick={() => this.onAccordionClick(index)} attr-layout="row" attr-layout-align="space-between">
                            <span class="text">{obj.title}</span>
                            <span class="icon"><i class={this.items[index].selected ? 'yo-minus' : 'yo-plus'}></i></span>
                        </div>
                        <div class={this.items[index].selected ? 'selected-accordion' : 'undisplayed-accordion'} id={obj.title}>
                                <slot name={obj.title}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}