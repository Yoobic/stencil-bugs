import { Component, Element, Event, EventEmitter, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'yoo-profile',
  styleUrl: 'profile.scss',
  scoped: true
})
export class YooProfileComponent {

  @Prop() config: any;

  @Event() clicked: EventEmitter<string>;
  @Event() profileEdit: EventEmitter<boolean>;
  @Event() logout: EventEmitter<boolean>;

   @Element() host: HTMLStencilElement;

  @Listen('bottomRightClicked')
  onProfileEdit() {
    this.profileEdit.emit(true);
  }

  onClicked(item) {
    this.clicked.emit(item);
  }

  onLogout() {
    this.logout.emit(true);
  }

  render(): JSX.Element {
    return (
      <div class="profile-content">
        {(this.config ?
          <span>
            <div class="profile-user">
              <yoo-avatar onClick={() => this.onProfileEdit()} class="large gradient-success large-border" user={this.config.user} bottom-right-icon="yo-pen"></yoo-avatar>
              <div class="profile-user-name">{this.config.user.firstName} {this.config.user.lastName}</div>
              <div class="profile-user-role">{this.config.user.role}</div>
            </div>
            <div class="profile-links">
              {this.config.links.map(link => {
                return this.renderUl(link);
              })}
            </div>

            {(this.config.hideLogout ?
              null
              :
              <div class="profile-logout" onClick={() => this.onLogout()}>
                <div class="border"></div>
                <span class="profile-logout-text">{this.config.logoutText}</span>
                <div class="border"></div>
              </div>
            )}
          </span>
          :
          <div>loading</div>
        )}
      </div>
    );
  }

  renderUl(link: { title: string, items: { title: string, handler: () => void }[] }): JSX.Element {
    return (
      <span>
        <div class="profile-links-title">{link.title}</div>
        <ul class="profile-links-menu">
          {link.items.map(item => {
            return this.renderLi(item);
          })}
        </ul>
      </span>
    );
  }

  renderLi(item: { title: string, handler: () => void }): JSX.Element {
    return (
      <span>
      <li class="profile-links-menu-item" onClick={() => this.onClicked(item)}>
        {item.title} <i class="yo-right"></i>
      </li>
      <div class="border"></div>
      </span>
    );
  }
}
