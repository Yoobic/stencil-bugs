import { Component, Element, Prop } from '@stencil/core';
import { IMission } from '@shared/interfaces';

@Component({
    tag: 'yoo-mission-results',
    styleUrl: 'mission-results.scss',
    scoped: true
})
export class YooMissionResultsComponent {
    @Prop() mission: IMission;
    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div>MissionResults needs a proper template</div>
        );
    }
}
