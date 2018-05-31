import { Component, Element, Prop } from '@stencil/core';
import { CardType, EntityType } from '@shared/interfaces';

@Component({
    tag: 'yoo-card-placeholder',
    styleUrl: 'card-placeholder.scss',
    scoped: true
})
export class YooCardPlaceholderComponent {

     @Element() host: HTMLStencilElement;

    @Prop() displayType: CardType;
    @Prop() entityType: EntityType;

    renderCardFeed(): JSX.Element {
        return (
            <div class="outer-container card-feed">
                <div class="animated-background">
                    <div class="feed-top">
                        <div class="masker feed-heading-left"></div>
                        <div class="masker feed-heading-middle"></div>
                        <div class="masker feed-heading-right"></div>
                        <div class="masker feed-heading-right-2"></div>
                        <div class="masker feed-heading-bottom-2"></div>
                        <div class="masker feed-heading-bottom"></div>
                    </div>
                    <div class="feed-under-img">
                        <div class="masker feed-under-img-top"></div>
                        <div class="masker feed-under-img-middle"></div>
                        <div class="feed-icon">
                            <div class="masker feed-icon-left"></div>
                            <div class="masker feed-icon-left-2"></div>
                            <div class="masker feed-icon-bottom"></div>
                        </div>
                        <div class="feed-like">
                            <div class="masker feed-like-left"></div>
                            <div class="masker feed-like-bottom"></div>
                        </div>
                        <div class="feed-description">
                            <div class="masker feed-description-bottom"></div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }


    renderCardList(): JSX.Element {
        let entity = this.entityType;
        return (
            <div class={'outer-container card-list ' + entity}>
                <div class="animated-background">
                    {((entity !== 'missions') && (entity !== 'environnement') ?
                        <div class="image-container">
                            <div class="masker container-image"></div>
                            {(entity !== 'feedsComments' ?
                                <div class="masker container-image-2"></div>
                                : null)}
                        </div>
                        : null)}
                    <div class="content-container">
                        <div class="masker container-top"></div>
                        {((entity !== 'missions') && (entity !== 'environnement') ?
                            <div class="masker container-left"></div>
                            : null)}
                        {((entity !== 'folders') && (entity !== 'environnement') ?
                            <div class="masker container-middle"></div>
                            : null)}
                        {((entity === 'feedsComments') ?
                            <div class="masker container-middle-2"></div>
                            : null)}
                        {((entity === 'missions') || (entity === 'notifications') || (entity === 'folders') || (entity === 'environnement') ?
                            <div class="masker container-right"></div>
                            : null)}
                        {((entity === 'missions') ?
                            <div class="masker container-right-2"></div>
                            : null)}
                        <div class="masker container-bottom"></div>
                    </div>
                </div>
            </div>
        );
    }

    renderCardListViews(): JSX.Element {
        return (
            <div class="outer-container card-list views">
                <div class="animated-background">
                    <div class="image-container">
                        <div class="masker container-image"></div>
                        <div class="masker container-image-2"></div>
                    </div>
                    <div class="content-container">
                        <div class="masker container-top"></div>
                        <div class="masker container-left"></div>
                        <div class="masker container-right"></div>
                        <div class="masker container-bottom"></div>
                    </div>
                </div>
            </div>
        );
    }

    renderCardSticky(): JSX.Element {
        return (
            <div class="outer-container card-sticky">
                <div class="gradient-container animated-background">
                    <div class="text-container">
                        <div class="category">
                            <div class="masker category-content"></div>
                        </div>
                        <div class="title">
                            <div class="masker title-content"></div>
                        </div>
                        <div class="button-card">
                            <div class="masker button-content"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        switch (this.displayType) {
            case 'card-sticky': {
                return (
                    this.renderCardSticky()
                );
            }
            case 'card-list': {
                return (this.renderCardList());
            }
            case 'card-feed': {
                switch (this.entityType) {
                    case 'feeds': {
                        return (this.renderCardFeed());
                    }
                    case 'blog': {
                        return (this.renderCardFeed());
                    }
                }
                break;
            }
            default: {
                return (this.renderDefault());
            }
        }
    }

    renderDefault(): JSX.Element {
        return (
            <div>
            </div>
        );
    }
}
