import { Component, Element, Prop } from '@stencil/core';

@Component({
    tag: 'yoo-feed-create',
    styleUrl: 'feed-create.scss',
    scoped: true
})
export class YooFeedCreateComponent {

     @Element() host: HTMLStencilElement;

    @Prop() photoItems: Array<any>;

    render(): JSX.Element {
        return (
            <div>{
                (this.photoItems || []).map(photo => <img class="thumbnail" src={photo.thumbnailURL} />)
            }</div>
        );
    }
}
