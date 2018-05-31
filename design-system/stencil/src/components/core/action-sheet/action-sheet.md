---
name: Action Sheet
category: Core Components
---
An Action Sheet is a dialog that lets the user choose from a set of options. It appears on top of the app's content, and must be manually dismissed by the user before they can resume interaction with the app. 

See the Modal controller for details on how to implement

The following interface is used:

```tsx 
export interface IActionSheetButton  {
    text?: string;
    icon?: string;
    disabled?: boolean;
    cssClass?: string;
}

export interface IActionSheet  {
    heading?: string;
    buttons: IActionSheetButton[];
}
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`heading`|string|   |the title of the action sheet|
|`buttons[]`|IActionSheetButton[]|  |entry to create the action sheet heading and buttons|

```yoo-action-sheet.html
<yoo-modal-controller></yoo-modal-controller>
<div style="padding:10px;">
    <yoo-button text="Trigger Action Sheet" class="accent squared" onclick="generate()"></yoo-button>
</div>
```

```yoo-action-sheet.js
    var modalCtrl = document.querySelector('yoo-modal-controller');
    var htmlElement = document.createElement('div');
    htmlElement.innerHTML = `<div class="test">This is the test text</div>`;
    var actionSheetProps = { heading: 'Action sheet', buttons: [{text: 'Action 1', cssClass: "accent"}, {text: 'Action 2', icon: 'yo-fire', cssClass: "success"}, {text: 'Action 3', icon: 'yo-fire', cssClass: "info"}, {text: 'Disabled Action 4', icon: 'yo-fire', cssClass: "accent", disabled: "true"}] };

    function generate() {
    modalCtrl.generateActionSheet(actionSheetProps);
    modalCtrl.showActionSheet();
  }
```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-action-sheet accent|
|Dark|`dark`|yoo-action-sheet dark|
|Success|`success`|yoo-action-sheet success|
|Danger|`danger`|yoo-action-sheet danger|
|Info|`info`|yoo-action-sheet info|
|Warning|`warning`|yoo-action-sheet warning|
|Gradient Accent|`gradient-accent`|yoo-action-sheet gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-action-sheet gradient-grey|
|Gradient Success|`gradient-success`|yoo-action-sheet gradient-success|
|Gradient Danger|`gradient-danger`|yoo-action-sheet gradient-danger|
|Gradient Info|`gradient-info`|yoo-action-sheet gradient-info|
|Gradient Warning|`gradient-warning`|yoo-action-sheet gradient-warning|

## Events

|Attr|Description|
|---|---|---|
|`actionSelected`|event triggered when a button supplied to the action sheet has been clicked. Returns a string value equal to the title of the button, will also dismiss the action sheet|
|`actionSheetClosed`|event triggered when the menu is closed|