---
name: Card List
category: Entities Components
---

```card-list.html
        <yoo-card-list heading="Card List" class="accent" img-src="https://pbs.twimg.com/profile_images/960887020666150913/psDP3pv9_400x400.jpg" id="list"></yoo-card-list>
```
```card-list.js
    var listMode = document.querySelector('#list');
    var tags = [{text: 'Finished', icon:'yo-flag'},{text: 'Fire Account', icon:'yo-fire'}];
    listMode.tags = tags;
    listMode.topLeftBadge = "PDF";
    listMode.BottomRightBadge = "PDF";
    listMode.subheadings = ["subtitle 1", "subtitle 2"];
    listMode.badges = [{text: 'Finished', icon:'yo-home'}, {text:'In-Progress'}];
```


## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`text`|string|   |the text inside the label|

## CSS

|Type|Name|Description|
|---|---|---|


## Events
|Attr|Description|
|---|---|---|