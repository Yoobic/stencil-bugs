---
name: Login
category: App Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`leftPanelHeaderIcon`|string|`yoobic_landscape_full_dark.svg`|the icon for the left panel header|
|`leftPanelFooterText`|string|`Version X`|the text for the left panel footer|
|`rightPanelTitleText`|string|`Welcome`|the text for the right panel title|
|`rightPanelTitleIcon`|string|`yoobic_landscape_full_light.svg`|the icon for the center of the right panel|
|`rightPanelFooterIcon`|string|`yoobic_simple.svg`|the icon for the right panel footer|
|`rightPanelFooterText`|string|`Powered by`|the text for the right panel footer|
|`backgroundSrc`|string|    |the background image for the right panel|
|`backgroundColor`|string|`dark`|the background color for the right panel|
|`buttonClass`|string|  |the css class of the button|
|`error`|string|    |the text presented on a login error|
|`loading`|boolean| |   |
|`rememberMeText`|string|`Remember me`|the text for the remember me checkbox|
|`forgotPasswordText`|string|`Forgot password?`|the text for the forgot password button|
|`currentLanguage`|string|'EN'|the current language selected|
|`languages`|Language[] Object|    |the list to fill the language selection in the Language Selector component|

```yoo-login.html
    <yoo-login class="accent"></yoo-login>
```

```yoo-login.js
    var comp = document.querySelector('yoo-login');

    comp.languages = [
       { title: 'English', value: 'EN', icon: 'flag-icon flag-icon-gb'},
       { title: 'English US', value: 'EN', icon: 'flag-icon flag-icon-us'},
       { title: 'Spanish', value: 'ES', icon: 'flag-icon flag-icon-es'},
       { title: 'French', value: 'FR', icon: 'flag-icon flag-icon-fr'},
       { title: 'Dutch', value: 'NL', icon: 'flag-icon flag-icon-nl'},
       { title: 'Italian', value: 'IT', icon: 'flag-icon flag-icon-it'},
       { title: 'German', value: 'DE', icon: 'flag-icon flag-icon-de'}
   ];
```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-login accent|
|Dark|`dark`|yoo-login dark|
|Success|`success`|yoo-login success|
|Danger|`danger`|yoo-login danger|
|Info|`info`|yoo-login info|
|Warning|`warning`|yoo-login warning|
|Gradient Accent|`gradient-accent`|yoo-login gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-login gradient-grey|
|Gradient Success|`gradient-success`|yoo-login gradient-success|
|Gradient Danger|`gradient-danger`|yoo-login gradient-danger|
|Gradient Info|`gradient-info`|yoo-login gradient-info|
|Gradient Warning|`gradient-warning`|yoo-login gradient-warning|

```yoo-login-styles.html
    <yoo-login class="success" left-panel-header-icon="./assets/logo/operations_landscape_dark.svg" left-panel-footer-text="v 4.9.4" right-panel-title-text="We improve your store performance" right-panel-title-icon="./assets/logo/operations_landscape_light.svg" right-panel-footer-text="Powered by: " background-src="https://www.pixelstalk.net/wp-content/uploads/2016/06/Star-Wars-Backgrounds.jpg"></yoo-login>
```

```yoo-login.js
    var comp = document.querySelector('yoo-login');

    comp.languages = [
       {title: 'English', value: 'EN', icon: 'flag-icon flag-icon-gb'},
       { title: 'English US', value: 'EN', icon: 'flag-icon flag-icon-us'},
       { title: 'Spanish', value: 'ES', icon: 'flag-icon flag-icon-es'},
       { title: 'French', value: 'FR', icon: 'flag-icon flag-icon-fr'},
       { title: 'Dutch', value: 'NL', icon: 'flag-icon flag-icon-nl'},
       { title: 'Italian', value: 'IT', icon: 'flag-icon flag-icon-it'},
       { title: 'German', value: 'DE', icon: 'flag-icon flag-icon-de'}
   ];
```
## Events

|Attr|Description|
|---|---|---|
|`doLogin`|event emitted when the login button is pressed|
|`languageSelectedParent`|event emitted a different language is selected|
|`rememberMeSelected`|event emitter when login button is pressed, boolean|
|`passwordResetRequested`|event emitted when forgot password button is pressed|
