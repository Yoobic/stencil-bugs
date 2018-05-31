---
name: Input Bar
category: Core Components
---

```input-bar.html
    <yoo-input-bar></yoo-input-bar>
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`icon`|string||icon at the left of the input|
|`iconAction`|string|`yo-gallery`|icon inside the input|
|`actionText`|string|`Post`|icon inside the input displayed when no text is inside|
|`value`|string|   |value of the text inside the input|
|`placeholder`|string|`Add comment`|placeholder in the input|

## Events
|Attr|Description|
|---|---|---|
|`sendText`|send the text entered by the user|
|`iconClicked`|fired when the icon at the left is clicked|
|`browseLibrary`|fired when the icon is clicked inside the field (for browsing lirary)|