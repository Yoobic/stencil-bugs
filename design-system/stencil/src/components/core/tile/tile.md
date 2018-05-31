---
name: Tile
category: Core Components
---

```tile.html
    <yoo-tile id="tile1" text="ONGOING MISSIONS" value="5"></yoo-tile>
    <br/><br/>
    <yoo-tile id="tile2" text="PENDING MISSIONS" value="7"></yoo-tile>
```

```tile.js hidden
  var comp = document.querySelector('#tile1');
  comp.textClass = "info";

  var comp2 = document.querySelector('#tile2');
  comp2.textClass = "warning";
```

```tile-example.html
    <yoo-tile icon="yo-activity" text="ONGOING MISSIONS" textClass="info" value="5"></yoo-tile>
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`icon`|string|   |the icon displayed in the tile|
|`value`|string|   |the value displayed in the tile|
|`text`|string|   |the text displayed in the tile|
|`textClass`|string|   |the css of the text|

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|tile accent|
|Dark|`dark`|tile dark|
|Success|`success`|tile success|
|Danger|`danger`|tile danger|
|Info|`info`|tile info|
|Warning|`warning`|tile warning|
|Gradient Accent|`gradient-accent`|tile gradient-accent|
|Gradient Dark|`gradient-dark`|tile gradient-grey|
|Gradient Success|`gradient-success`|tile gradient-success|
|Gradient Danger|`gradient-danger`|tile gradient-danger|
|Gradient Info|`gradient-info`|tile gradient-info|
|Gradient Warning|`gradient-warning`|tile gradient-warning|