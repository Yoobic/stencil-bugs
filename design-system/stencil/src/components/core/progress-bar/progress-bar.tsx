import { Component, Prop, Element } from '@stencil/core';

@Component({
    tag: 'yoo-progress-bar',
    styleUrl: 'progress-bar.scss',
    scoped: true
})
export class YooProgressBarComponent {

    @Prop() progress: number;
    @Prop() circle: boolean = false;
    @Prop() hideProgress: boolean = false;
    @Prop() circleTitle: string;
    @Prop() circleLabel: string;
    @Prop() maxValue: number = 100;
    @Prop() percentage: boolean = false;
    @Prop() triangleBackgroundColor: string = 'dark-10';

     @Element() host: HTMLStencilElement;


    componentDidLoad() {
        if (this.host.classList.contains('triangle')) {
            this.updateTriangleStyle();
        }
    }

    updateTriangleStyle() {
        let width = 15;
        let progressMultiplier = (this.progress / this.maxValue) * 0.9;
        this.host.querySelector('.bar-container').setAttribute('style', `border-right: ${width}rem solid var(--${this.triangleBackgroundColor})`);
        this.host.querySelector('.progress-container').setAttribute('style', `border-right: ${(progressMultiplier * width) + 1.5}rem solid;
        border-top: ${(0.71875 * progressMultiplier) + 0.071875}rem solid transparent;
        border-bottom: ${(0.71875 * progressMultiplier) + 0.071875}rem solid transparent;`);
    }

    private properProgress(): number {
        let prog: number;
        if (this.progress < 0) {
            prog = 0;
        } else if (this.progress > this.maxValue) {
            prog = 100;
        } else {
            prog = ((this.progress / this.maxValue) * 100);
        }
        return prog;
    }

    private properBorder(): any {
        if (this.progress < 97) {
            return {};
        } else {
            return {'border-top-right-radius': '0.675rem', 'border-bottom-right-radius': '0.675rem'};
        }
    }

    private clipCoord(): {'clip-path': string, '-webkit-clip-path': string} {
        let prog = this.properProgress();
        let clipped = this.host.className.includes('clipped-circle');
        let angle =  Math.PI / 2 - ((2 * Math.PI * (prog / 100)) * (clipped ? 0.75 : 1));
        let y = 50 - 50 * Math.sin(angle);
        let x = 50 + 50 * Math.cos(angle);
        let positionTwo =  '50% 0';
        let positionThree = '0 0';
        let positionFour = '0 100%';
        let postionFive = '100% 100%';
        let postionSix = '100% 0';
        if (prog <= (clipped ? 33.3333 : 25)) {
            return {
                'clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour} ${postionFive}, ${postionSix}, ${x}% ${y}%`,
                '-webkit-clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${postionFive}, ${postionSix}, ${x}% ${y}%`
                };
        } else if (prog <= (clipped ? 66.6666 : 50)) {
            return {
                'clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${postionFive}, ${x}% ${y}%`,
                '-webkit-clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${postionFive}, ${x}% ${y}%`
            };
        } else if (prog <= (clipped ? 100 : 75)) {
            return {
                'clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${x}% ${y}%`,
                '-webkit-clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${positionFour}, ${x}% ${y}%`
            };
        } else {
            return {
                'clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${x}% ${y}%`,
                '-webkit-clip-path': `polygon(50% 50%, ${positionTwo}, ${positionThree}, ${x}% ${y}%`
            };
        }
    }

    render(): JSX.Element {
        let progressStyle = {...this.properBorder(), width: this.properProgress() + '%'};
        // let triangleStyle = 'border-right: 2rem solid blue';
        // let triangleStyle = {'border-right' : this.getTriangleWidth + 'rem solid', 'border-top': this.getTriangleHeight + 'rem solid transparent', 'border-bottom': this.getTriangleHeight + 'rem solid transparent'};
        return ( this.circle ? (
            <div class="wrap" attr-layout="column" attr-layout-align="center center">
                <div class="circle-outer-container" attr-layout="column">
                    <div class="circle-progress">
                    </div>
                    <div class="circle-background" style={this.clipCoord()}>
                    </div>
                    <div class="circle-center-container" attr-layout="row" attr-layout-align="center center">
                        <div class="circle-center" attr-layout="column">
                            {this.hideProgress ? <div></div> : <div class="circle-progress-label">{(this.percentage ? `${this.properProgress().toFixed(0)}%` : this.progress)}</div> }
                            {this.host.className.includes('large-circle') ? <div class="circle-title">{this.circleTitle}</div> : null}
                        </div>
                    </div>
                    {this.host.className.includes('clipped-circle') ?
                    <div class="clipped-circle">
                    </div>
                    : null}
                </div>
                <div class="circle-label">{this.host.className.includes('large-circle') ? this.circleLabel : this.circleTitle}</div>
            </div>
        ) : (
            <div class={'outer-container'} attr-layout="row">
                <div class={'bar-container'} attr-layout="row">
                    <div class={'progress-container'} style={this.host.classList.contains('triangle') ? '' : progressStyle}>
                    </div>
                </div>
                {this.host.classList.contains('triangle') ? <div class="triangle-cover"></div> : null}
                {this.hideProgress ? <div></div> : <span class="label">{(this.percentage ? `${this.properProgress().toFixed(0)}%` : this.progress)}</span>}
            </div>
        ));
    }
}
