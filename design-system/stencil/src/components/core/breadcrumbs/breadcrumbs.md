---
name: Breadcrumbs
category: Core Components
---

Breadcrumbs are a navigation pattern that can be implemented with `<yoo-breadcrumbs>`. They are always horizontal and if they have more than 7 items,
these will be collapsed into a context-menu starting with the root item at the bottom.

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`items`|string[ ]| required*   |Hierarchy of pages to present in the breadcrumbs - the last item will be highlighted|

```yoo-breadcrumbs.html
    <yoo-breadcrumbs></yoo-breadcrumbs>
```

```yoo-breadcrumbs.js
    var comp = document.querySelector('yoo-breadcrumbs');
    comp.items = ["item 1", "item2", "item 3", "item 4", "item 5", "item 6"];
```

```yoo-breadcrumbs-max.html
    <yoo-breadcrumbs></yoo-breadcrumbs>
```

```yoo-breadcrumbs-max.js 
    var comp = document.querySelector('yoo-breadcrumbs');
    comp.items = ["item 1", "item2", "item 3", "item 4", "item 5", "item 6", "item 7"];
```

```yoo-breadcrumbs-collapse.html
    <yoo-breadcrumbs></yoo-breadcrumbs>
```

```yoo-breadcrumbs-collapse.js 
    var comp = document.querySelector('yoo-breadcrumbs');
    comp.items = ["item 1", "item2", "item 3", "item 4", "item 5", "item 6", "item 7", "item 8", "item 9", "item 10"];
```

## Events

|Attr|Description|
|---|---|
|`itemSelected`|Returns the item the user clicks on|
