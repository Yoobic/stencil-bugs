import { Component, Element } from '@stencil/core';

@Component({
    tag: 'yoo-feed-comments',
    styleUrl: 'feed-comments.scss',
    scoped: true
})
export class YooFeedCommentsComponent {

     @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div>FeedComments needs a proper template</div>
        );
    }
}
