---
name: Web Menu
category: Core Components
---

```web-menu.html
    <yoo-web-menu></yoo-web-menu>
```
```web-menu.js
    var menu = document.querySelector('yoo-web-menu');
    var entry = {
      logo: "assets/logo/operations_simple.svg",
      items:[{label: 'action1', icon:'yo-fire', handler: () => {}},
                {label: 'action2', icon:'yo-yo', handler: () => {}},
                {label: 'action3', icon:'yo-more', handler: () => {}, separator: true},
                {label: 'page1', icon:'yo-trophy', href:"http://trophy", badge: '8'},
                {label: 'page2', icon:'yo-star', href:"http://star", badge: '28'},
                {label: 'page3', icon:'yo-fire', href:"http://fire", badge: '568'}],
      user: {imgData: "https://resources.stuff.co.nz/content/dam/images/1/i/o/a/a/c/image.related.StuffLandscapeSixteenByNine.620x349.1ioalf.png/1492902717643.jpg"}
    };
  menu.entry = entry;
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`entry`|IWebMenuEntry|   |entry of the menu|

## CSS

|Type|Name|Description|
|---|---|---|


## Events
|Attr|Description|
|---|---|---|
|`itemClicked`|fired when an action is clicked, send the action|
|`profilClicked`|fired when the avatar user is clicked, send the user|