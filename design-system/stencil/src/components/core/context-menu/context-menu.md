---
name: Context Menu
category: Core Components
---
Provides a context menu. Context menu entries comply with the `IContextMenuEntry` interface.

``` typescript
export interface IContextMenuEntry {
    itemTitle?: string;
    icon?: string;
    class?: string;
    active?: boolean;
    separator?: boolean;
    separatorAfter?: boolean;
    hidden?: boolean;
    isHidden?: Function;
    visible?: boolean;
    handler?: Function;
    items?: Array<IContextMenuEntry>;
    sendImmutable?: boolean;
}
```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`items`|`IContextMenuEntry[]`|   |the context menu entries to display|
|`context`|any|   |an object to represent the menu's context |

```yoo-context-menu.html
<div style="padding:10px;">
    <yoo-context-menu>
        <yoo-button slot="trigger" class="squared" text="test"></yoo-button>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sequi vero laudantium cumque similique consectetur corporis blanditiis error neque ex libero, ipsa nostrum optio pariatur necessitatibus. Quas perferendis provident ipsam.</div>
    </yoo-context-menu>


     <yoo-context-menu id="contextmenu">
        <yoo-button class="accent squared" slot="trigger" text="test"></yoo-button>
    </yoo-context-menu>
</div>
```

```yoo-context-menu.js
    var cmp = document.querySelector('#contextmenu');
    cmp.items = [{
        itemTitle: 'Edit',
        handler:() => alert('edit clicked')
    },{
        itemTitle: 'Preview',
        handler:() => alert('preview clicked'),
    },{
        itemTitle: 'Expire',
        separator: true,
        handler:() => alert('expire clicked'),
    }];
```

## Events

|Attr|Description|
|---|---|
|`contextMenuOpened`|Triggered by opening the context menu|
|`contextMenuClosed`|Triggered by closing the context menu|
