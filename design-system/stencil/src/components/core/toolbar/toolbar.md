---
name: Toolbar
category: Core Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`actions`|`IActionBar[]`|   |Actions you want to set in the toolBar|
|`showActive`|`boolean`|`false`|Show active action in the toolBar|

```yoo-toolbar.html
    <yoo-toolbar class="bottom">
      <yoo-form-input attr-flex icon-suffix="yo-search"></yoo-form-input>
      <yoo-button icon="yo-plus" class="icon-only accent"></yoo-button>
    </yoo-toolbar>

    <yoo-toolbar class="accent top">
      <yoo-button class="link-transparent-accent" attr-flex text="Select All"></yoo-button>
      <yoo-button icon="yo-more" class="icon-only link-transparent-accent"></yoo-button>
    </yoo-toolbar>
```

```yoo-toolbar.css hidden
yoo-toolbar {
  margin-bottom: 40px;
}
```

## Actions attributes

```yoo-toolbar-actions.html

    <yoo-toolbar></yoo-toolbar>
```
```yoo-toolbar-actions.js

  var comp = document.querySelector('yoo-toolbar');
  comp.actions = [ { title: 'Action 1', handler: () => {}}, { title: 'Action 2', handler: () => {}}];

```

## ShowActive attributes

```yoo-toolbar-active.html

    <yoo-toolbar show-active="true"></yoo-toolbar>
```
```yoo-toolbar-active.js

  var comp = document.querySelector('yoo-toolbar');
  comp.actions = [ { title: 'Action 1', handler: () => {}}, { title: 'Action 2', handler: () => {}}];
  
```

## Interfaces 

```tsx

export interface IActionBar {
    title?: string;
    icon?: string;
    handler?: Function;
    hidden?: boolean;
}

```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-toolbar accent|
|Top|`top`|yoo-toolbar top toolbar|
|Bottom|`bottom`|yoo-toolbar bottom toolbar|

