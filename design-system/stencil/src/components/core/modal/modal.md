---
name: Modal
category: Core Components
---

Modals can be customized with multiple properties. Properties conform to the IModalEntry interface below:

```ts
export interface IModalEntry {
    heading?: string;
    headingIcon?: string;
    content?: HTMLElement;
    hasHeader?: boolean;
    hasFooter?: boolean;
    footerText?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    cssClass?: string;
    animationName?: string;
    animationProp?: any;
    primaryFn?: Function;
    withYooCtrl?: boolean;
    scrollEnabled?: boolean;
}
```

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`heading`|string|   |the heading of the modal, will only be displayed if `hasHeader` property is `true`|
|`headingIcon`|string| |the icon to display to the left of the heading|
|`content`|HTMLElement| |the content inside the body of the modal|
|`hasHeader`|boolean|`true`|defines if the modal has a header|
|`hasFooter`|boolean|`false`|defines if the modal has a footer|
|`footerText`|string||the text inside the footer|
|`primaryButtonText`|string|`Confirm`  |the text inside the primary button, will only be displayed if `hasFooter` property is `true`|
|`secondaryButtonText`|string|`Cancel`|the text inside the secondary button, will only be displayed if `hasFooter` property is `true`|
|`cssClass`|string| |space separated classes to add to the modal|
|`animationName`|string||adds an animation to the modal, see animation docs for options|
|`animationProp`|any|||
|`primaryFn`|Function||function triggered on the modal primary button click|
|`withYooCtrl`|boolean|specify whether the `yoo-modal-controller` is being used|
|`scrollEnabled`|boolean|false|specify whether the `yoo-slim-scroll` is being used|

### Basic

```yoo-modal-basic.html
    <div style="height: 500px; width: 500px;">
        <yoo-modal heading="Basic Modal" with-yoo-ctrl="true">
            <div >Test content</div>        
        </yoo-modal>
    </div>
```

### With Footer

```yoo-modal-footer.html
    <div style="height: 500px; width: 500px;">
        <yoo-modal class="accent" with-yoo-ctrl="true" headingIcon="yo-fire" heading="Modal with footer" has-footer="true" primary-button-text="Confirm" secondary-button-text="Cancel">
            <div >Test content</div>
        </yoo-modal>
    </div>
```

### Without Header

```yoo-modal-no-header.html

    <yoo-modal has-footer="true" with-yoo-ctrl="true" has-header="false">
        <div >Test content</div>
    </yoo-modal>
```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-modal accent|
|Dark|`dark`|yoo-modal dark|
|Success|`success`|yoo-modal success|
|Danger|`danger`|yoo-modal danger|
|Info|`info`|yoo-modal info|
|Warning|`warning`|yoo-modal warning|
|Fullscreen|`fullscreen`|yoo-modal fullscreen|
|Drawer|`drawer`|yoo-modal drawer|

```yoo-modal-danger.html
    <yoo-modal class="danger" with-yoo-ctrl="true" heading-icon="yo-fire" heading="Modal danger" has-footer="true" primary-button-text="Confirm" secondary-button-text="Cancel">
        <div >Test content</div>
    </yoo-modal>
```

```yoo-modal-success.html
    <yoo-modal class="success" with-yoo-ctrl="true" heading-icon="yo-fire" heading="Modal success" has-footer="true" primary-button-text="Confirm" secondary-button-text="Cancel">
        <div >Test content</div>
    </yoo-modal>
```

```yoo-modal-info.html
    <yoo-modal class="info" with-yoo-ctrl="true" heading-icon="yo-fire" heading="Modal info" has-footer="true" primary-button-text="Confirm" secondary-button-text="Cancel">
        <div >Test content</div>
    </yoo-modal>
```

```yoo-modal-warning.html
    <yoo-modal class="warning" with-yoo-ctrl="true" heading-icon="yo-fire" heading="Modal warning" has-footer="true" primary-button-text="Confirm" secondary-button-text="Cancel">
        <div >Test content</div>
    </yoo-modal>
```

```yoo-modal-dark.html
    <yoo-modal class="dark" with-yoo-ctrl="true" heading-icon="yo-fire" heading="Modal dark" has-footer="true" primary-button-text="Confirm" secondary-button-text="Dismiss">
        <div >Test content</div>
    </yoo-modal>
```

```yoo-modal-drawer.html
    <yoo-modal class=" drawer accent" with-yoo-ctrl="true" heading-icon="yo-fire" heading="Modal dark" has-footer="true" primary-button-text="Confirm" secondary-button-text="Dismiss">
        <div >Test content</div>
    </yoo-modal>
```

```yoo-modal-fullscreen.html
    <yoo-modal class="success fullscreen" with-yoo-ctrl="true" heading-icon="yo-fire" heading="Fullscreen Success" has-footer="true" primary-button-text="Confirm" secondary-button-text="Dismiss">
        <div >Test content</div>
    </yoo-modal>
```

```yoo-modal-menu.html
    <yoo-modal class="accent menu" with-yoo-ctrl="true" heading-icon="yo-fire" heading="Menu Accent" has-footer="true" primary-button-text="Confirm" secondary-button-text="Dismiss">
        <div >Test content</div>
    </yoo-modal>
```

## Events

|Attr|Description|
|---|---|
|`modalPrimaryButtonClicked`|called when the primary button is clicked|
|`modalClosed`|called when the modal is closed|