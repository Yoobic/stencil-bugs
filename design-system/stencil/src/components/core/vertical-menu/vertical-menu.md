---
name: Vertical Menu
category: Core Components
---

Vertical Menu is intended to be used as the main menu of an application. It displays of the left.

The following interfaces are used:

```tsx 
export interface IVerticalMenuEntry {
    menuRows: IVerticalMenuRow[];
}

export interface IVerticalMenuRow {
    item?: IVerticalMenuItem;
    subItems?: IVerticalMenuItem[];
}

export interface IVerticalMenuItem {
    text?: string;
    imgSrc?: string;
    icon?: string;
    emittedEvent?: string;
    isActive?: boolean;
    anchor?: string;
}
```

```yoo-vertical-menu.html
    <yoo-vertical-menu></yoo-vertical-menu>
```
```yoo-vertical-menu.js 
  var menu = document.querySelector('yoo-vertical-menu');
  var verticalText = { text: "Amazing Component"};
  var verticalTextActive = { text: "Text", isActive: true };
  var verticalText2 = { text: "Core Component", imgSrc: "./assets/empty-states/calendar.svg" };
  var verticalText3 = { text: "Form Component", imgSrc: "./assets/empty-states/channel.svg", isActive: true };
  var verticalRow = { item: verticalText};
  var verticalRowActive = { item: verticalTextActive};
  var verticalRow2 = { item: verticalText2, subItems: [verticalText, verticalText3] };
  var verticalRow3 = { item: verticalText, subItems: [verticalText, verticalText, verticalText] };
  menu.entry = { menuRows: [verticalRowActive, verticalRow, verticalRow2, verticalRow, verticalRow3] };
```

```yoo-vertical-menu-side.html
 <div style="width:50%">
    <yoo-vertical-menu></yoo-vertical-menu>
 </div>
```
```yoo-vertical-menu-side.js 
  var menu = document.querySelector('yoo-vertical-menu');
  var verticalText = { text: "Amazing Component"};
  var verticalTextActive = { text: "Text", isActive: true };
  var verticalText2 = { text: "Core Component", imgSrc: "./assets/empty-states/calendar.svg" };
  var verticalText3 = { text: "Form Component", imgSrc: "./assets/empty-states/channel.svg", isActive: true };
  var verticalRow = { item: verticalText};
  var verticalRowActive = { item: verticalTextActive};
  var verticalRow2 = { item: verticalText2, subItems: [verticalText, verticalText3] };
  var verticalRow3 = { item: verticalText, subItems: [verticalText, verticalText, verticalText] };
  menu.entry = { menuRows: [verticalRowActive, verticalRow, verticalRow2, verticalRow, verticalRow3] };
```

```yoo-vertical-menu-modal.html
    <yoo-vertical-menu></yoo-vertical-menu>
```
```yoo-vertical-menu-modal.js 
  var menu = document.querySelector('yoo-vertical-menu');
  var verticalText = { text: "Amazing Component"};
  var verticalTextActive = { text: "Text", isActive: true };
  var verticalText2 = { text: "Core Component", imgSrc: "./assets/empty-states/calendar.svg" };
  var verticalText3 = { text: "Form Component", imgSrc: "./assets/empty-states/channel.svg", isActive: true };
  var verticalRow = { item: verticalText};
  var verticalRowActive = { item: verticalTextActive};
  var verticalRow2 = { item: verticalText2, subItems: [verticalText, verticalText3] };
  var verticalRow3 = { item: verticalText, subItems: [verticalText, verticalText, verticalText] };
  menu.entry = { menuRows: [verticalRowActive, verticalRow, verticalRow2, verticalRow, verticalRow3] };
  menu.fixed = false;
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`entry`|`VerticalMenuEntry`|{ menuRows: [] }|entry to create the vertical menu|
|`text`|`string`|'Menu'|text of the vertical menu|
|`fixed`|`boolean`|true|Display the vertical menu without a modal, as a fixed element|

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-vertical-menu accent|
|Dark|`dark`|yoo-vertical-menu dark|
|Success|`success`|yoo-vertical-menu success|
|Danger|`danger`|yoo-vertical-menu danger|
|Info|`info`|yoo-vertical-menu info|
|Warning|`warning`|yoo-vertical-menu warning|
|Gradient Accent|`gradient-accent`|yoo-vertical-menu gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-vertical-menu gradient-grey|
|Gradient Success|`gradient-success`|yoo-vertical-menu gradient-success|
|Gradient Danger|`gradient-danger`|yoo-vertical-menu gradient-danger|
|Gradient Info|`gradient-info`|yoo-vertical-menu gradient-info|
|Gradient Warning|`gradient-warning`|yoo-vertical-menu gradient-warning|

## Events
|Attr|Description|
|---|---|
|`itemClicked`|event triggered when an item supplied to the menu has been clicked. Returned a string value defined in the entry prop as the emittedEvent string|
|`menuClosed`|event triggered when the menu is closed|
