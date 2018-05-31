import { Component, Element, Prop, State } from '@stencil/core';
import { ITranslateService } from '@shared/interfaces';

@Component({
    tag: 'yoo-property-card',
    styleUrl: 'property-card.scss',
    scoped: true
})
export class YooPropertyCardComponent {

    @Prop() properties: any;

    @Element() host: HTMLStencilElement;

    @State() isInit: boolean;

    private translate: ITranslateService = (window as any).translateService;

    componentDidLoad() {
        // let defaultConfig = {
        //     chart: {
        //         style: { fontFamily: 'Visby' },
        //         backgroundColor: null,
        //         height: '300px'
        //     },
        //     credits: { enabled: false },
        //     exporting: { enabled: false },
        //     tooltip: { followTouchMove: false }
        // };
        // if (this.properties) {
        //     this.properties.forEach(p => {
        //         if (p.type === 'chart') {
        //             // p.config = merge(cloneDeep(p.config), defaultConfig);
        //         }
        //     });
        // }
        this.translate = (window as any).translateService;

        this.isInit = true;
    }

    isString(value) {
        return typeof value === 'string';
    }

    onChartMoving($event) {
    }

    isVisible(p: any) {
        if (!p.group && !p.role) {
            return true;
        }
        let authorized = true;
        if (p.group) {
            // authorized = this.authentication.hasGroups([].concat(p.group));
        }
        if (p.role) {
            // authorized = this.authentication.hasRoles([].concat(p.role));
        }
        return authorized;
    }

    renderColumns(p: any): JSX.Element {
        return <div>
            {p.values.map((value) =>
                <div class="p-column">
                    <div class="number">
                        {(value.value ? <span>{value.value}</span> : null)}
                        {(value.isPercent ? <span>%</span> : null)}
                    </div>
                    {(value.title ?
                        <div class="title">
                            <span>{(this.translate ? this.translate.get(value.title) : value.title)}</span>
                        </div>
                        : null)}
                    <div class={'circle bg-' + value.color}></div>
                </div>
            )}
        </div>;
    }

    renderGrid(p: any): JSX.Element {
        return <div>
            <div class="p-row header">
                {p.headers.map((value) =>
                    (value.title ? <span class={(value.truncate ? 'break-lines' : null)}>{(this.translate ? this.translate.get(value.title) : value.title)}</span> : null)
                )}
            </div>
            {p.values.map((r) =>
                <div class={'p-row ' + r.color}>
                    {r.values.map((value) =>
                        (value ? <span class={(value.truncate ? 'break-lines' : null)}> {(this.isString(value) ? value : (this.translate ? this.translate.get(value.title) : value.title)) } </span> : null)
                    )}
                </div>
            )}
        </div>;
    }

    renderRows(p: any): JSX.Element {
        return <div>
            {p.values.map((value) =>
                <div class="p-row">
                    {(value.title ?
                        <div class="title">
                            <span>{(this.translate ? this.translate.get(value.title) : value.title)}</span>
                        </div>
                        : null)}
                    {(value.value ?
                        <div class="number">
                            <span>{value.value}</span>
                        </div>
                        : null)}
                    {(value.delta ?
                        <div class="delta">
                            <span>{value.delta}</span>
                        </div>
                        : null)}
                    {(value.color ?
                        <div class={'circle bg-' + value.color}></div>
                        : null)}
                </div>
            )}
        </div>;
    }

    renderChart(p: any): JSX.Element {
        return <div></div>;
        // return <chart-high config={p.config} hide-title={true} (moving)="onChartMoving($event)"></chart-high>;
    }

    renderHtml(p: any): JSX.Element {
        return <div>{p.value}</div>;
    }

    renderProperty(p: any): JSX.Element {
        return (this.isVisible(p) ?
            <div class="details">
                {(p.title ? <div class="details-title">{(this.translate ? this.translate.get(p.title) : p.title)}</div> : null)}
                {(p.type ?
                    <div class={'description p-type-' + p.type}>
                        {(p.type === 'columns' ? this.renderColumns(p) : null)}
                        {(p.type === 'grid' ? this.renderGrid(p) : null)}
                        {(p.type === 'rows' ? this.renderRows(p) : null)}
                        {(p.type === 'chart' ? this.renderChart(p) : null)}
                        {(p.type === 'html' ? this.renderHtml(p) : null)}
                    </div>
                    : null)}
            </div>
            : null);
    }

    render(): JSX.Element {
        return ((this.isInit && this.properties) ?
            <div>
                {this.properties.map((property) =>
                    this.renderProperty(property)
                )}
            </div>
            : null);
    }
}
