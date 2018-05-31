---
name: Entity
category: Entities Components
---

Entity is a wrapper for item which use cards.

```
export type CardType = 'card-feed' | 'card-list' | 'card-default' | 'card-sticky';
export type EntityType = 'missions' | 'channel' | 'channels' | 'environnement' | 'feeds' | 'feedsComments' | 'blog' | 'users' | 'notifications' | 'files' | 'folders' | 'filesFolders';
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`item`|any|   |Item to display|
|`displayType`|CardType|   |the type of empty state|
|`entityType`|EntityType|   |the type of empty state|
|`icons`|Array < IEntityAction>| | |
|`topActions`|Array < IEntityAction>| | |
|`bottomActions`|Array < IEntityAction>| | |
|`secondaryActions`|Array < IEntityAction>| | |

```yoo-entity.html

    <yoo-entity></yoo-entity>
```
```yoo-entity.js

    var comp = document.querySelector('yoo-entity');
    comp.item = {title: "Title", text:"Hola Text", background: {_downloadURL: "https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA17563_hires.jpg"}};
```

