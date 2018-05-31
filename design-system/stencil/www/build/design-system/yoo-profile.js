/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

class YooProfileComponent {
    onProfileEdit() {
        this.profileEdit.emit(true);
    }
    onClicked(item) {
        this.clicked.emit(item);
    }
    onLogout() {
        this.logout.emit(true);
    }
    render() {
        return (h("div", { class: "profile-content" }, (this.config ?
            h("span", null,
                h("div", { class: "profile-user" },
                    h("yoo-avatar", { onClick: () => this.onProfileEdit(), class: "large gradient-success large-border", user: this.config.user, "bottom-right-icon": "yo-pen" }),
                    h("div", { class: "profile-user-name" },
                        this.config.user.firstName,
                        " ",
                        this.config.user.lastName),
                    h("div", { class: "profile-user-role" }, this.config.user.role)),
                h("div", { class: "profile-links" }, this.config.links.map(link => {
                    return this.renderUl(link);
                })),
                (this.config.hideLogout ?
                    null
                    :
                        h("div", { class: "profile-logout", onClick: () => this.onLogout() },
                            h("div", { class: "border" }),
                            h("span", { class: "profile-logout-text" }, this.config.logoutText),
                            h("div", { class: "border" }))))
            :
                h("div", null, "loading"))));
    }
    renderUl(link) {
        return (h("span", null,
            h("div", { class: "profile-links-title" }, link.title),
            h("ul", { class: "profile-links-menu" }, link.items.map(item => {
                return this.renderLi(item);
            }))));
    }
    renderLi(item) {
        return (h("span", null,
            h("li", { class: "profile-links-menu-item", onClick: () => this.onClicked(item) },
                item.title,
                " ",
                h("i", { class: "yo-right" })),
            h("div", { class: "border" })));
    }
    static get is() { return "yoo-profile"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "config": {
            "type": "Any",
            "attr": "config"
        },
        "host": {
            "elementRef": true
        }
    }; }
    static get events() { return [{
            "name": "clicked",
            "method": "clicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "profileEdit",
            "method": "profileEdit",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "logout",
            "method": "logout",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "bottomRightClicked",
            "method": "onProfileEdit"
        }]; }
    static get style() { return ":host {\n  height: 100%;\n  font-size: 1.0625rem;\n  font-weight: 400; }\n  :host .border {\n    height: 1px;\n    width: 100%;\n    -webkit-box-shadow: inset 0 -0.5px 0 0 rgba(173, 173, 173, 0.5);\n    box-shadow: inset 0 -0.5px 0 0 rgba(173, 173, 173, 0.5); }\n  :host .profile-content {\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n    -ms-flex-pack: justify;\n    justify-content: space-between; }\n    :host .profile-content .profile-user {\n      text-align: center; }\n      :host .profile-content .profile-user .profile-user-name {\n        line-height: 1.3125rem; }\n      :host .profile-content .profile-user .profile-user-role {\n        line-height: 1rem;\n        font-size: 0.8125rem;\n        color: #adadad; }\n    :host .profile-content .profile-links {\n      padding-left: 1rem; }\n      :host .profile-content .profile-links .profile-links-title {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        color: #adadad;\n        width: 100%;\n        height: 1.875rem;\n        margin-top: 0.9375rem;\n        font-size: 0.8125rem; }\n      :host .profile-content .profile-links .profile-links-menu {\n        list-style: none;\n        padding: 0;\n        margin: 0;\n        padding-bottom: 0.3125rem; }\n        :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item {\n          display: -webkit-box;\n          display: -webkit-flex;\n          display: -ms-flexbox;\n          display: flex;\n          -webkit-box-pack: justify;\n          -webkit-justify-content: space-between;\n          -ms-flex-pack: justify;\n          justify-content: space-between;\n          -webkit-box-align: center;\n          -webkit-align-items: center;\n          -ms-flex-align: center;\n          align-items: center;\n          height: 2.75rem;\n          font-weight: 400;\n          cursor: pointer; }\n          :host .profile-content .profile-links .profile-links-menu .profile-links-menu-item .yo-right {\n            padding-right: 1rem; }\n    :host .profile-content .profile-logout {\n      display: block;\n      padding-left: 1rem;\n      margin-top: 1.25rem;\n      margin-bottom: 2.75rem; }\n      :host .profile-content .profile-logout .profile-logout-text {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: justify;\n        -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n        justify-content: space-between;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n        color: #ff625f;\n        height: 2.75rem; }"; }
}

export { YooProfileComponent as YooProfile };
