import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { getBackImageStyle, cloudinary } from '../../../utils/helpers';
import { IUser } from '@shared/interfaces';
import { pipes } from '../../../utils/pipes';

@Component({
    tag: 'yoo-avatar',
    styleUrl: 'avatar.scss',
    scoped: true
})
export class YooAvatarComponent {

    @Prop() imgSrc: string;
    @Prop() topRightIcon: string;
    @Prop() topLeftIcon: string;
    @Prop() bottomRightIcon: string;
    @Prop() bottomLeftIcon: string;
    @Prop() user: IUser;
    @Prop() icon: string;
    @Prop() iconText: string;

    @Event() topRightClicked: EventEmitter<boolean>;
    @Event() topLeftClicked: EventEmitter<boolean>;
    @Event() bottomRightClicked: EventEmitter<boolean>;
    @Event() bottomLeftClicked: EventEmitter<boolean>;

    @Element() host: HTMLStencilElement;

    render(): JSX.Element {
        return (
            <div class="avatar">
                {this.topRightIcon ? <span class="top-right" onClick={() => this.topRightClicked.emit(true)}><i class={this.topRightIcon}></i></span> : null}
                {this.topLeftIcon ? <span class="top-left" onClick={() => this.topLeftClicked.emit(true)}><i class={this.topLeftIcon}></i></span> : null}
                {this.imgSrc ?
                    <div class="image" style={getBackImageStyle(cloudinary(this.imgSrc, 100, 100))}></div>
                    : this.icon || this.iconText ?
                        <div class="image icon-container">
                            {this.icon ? <i class={this.icon} /> : <span> {this.iconText.substr(0, 2)}</span>}
                        </div>
                        : this.user && this.user.imageData ?
                            <div class="image" style={getBackImageStyle(cloudinary(this.user.imageData, 100, 100))}></div>
                            :
                            <div class="image initial-container"><span class="user-initial">{pipes.userInitial.transform(this.user)}</span></div>
                }
                {this.bottomRightIcon ? <span class="bottom-right" onClick={() => this.bottomRightClicked.emit(true)}><i class={this.bottomRightIcon}></i></span> : null}
                {this.bottomLeftIcon ? <span class="bottom-left" onClick={() => this.bottomLeftClicked.emit(true)}><i class={this.bottomLeftIcon}></i></span> : null}
            </div>
        );
    }
}
