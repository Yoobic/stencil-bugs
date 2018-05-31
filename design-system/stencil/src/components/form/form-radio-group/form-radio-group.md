---
name: Radio Group
category: Form Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`text`|string|   |the text of the radio|
|`disabled`|boolean|false|whether the radio is disabled or not|
|`state`|string| |the starting state of the radio|

### Single Selection
```yoo-form-radio-group.html
    <yoo-form-radio-group class="accent"></yoo-form-radio-group>
```
```yoo-form-radio-group.js hidden
    var comp = document.querySelector('yoo-form-radio-group');
    comp.values = [{text: "Radio 1 Single Selection"}, {text: "Radio 2 Single Selection"},{text: "Radio 3 Single Selection"}];
```

### Multiple Selection
```yoo-form-radio-group-multiple.html
    <yoo-form-radio-group multiple-selection=true></yoo-form-radio-group>
```
```yoo-form-radio-group-multiple.js hidden
    var comp = document.querySelector('yoo-form-radio-group');
    comp.values = [{text: "Radio 1 Multiple Selection"}, {text: "Radio 2 Multiple Selection"},{text: "Radio 3 Multiple Selection"}];
```
## Events

|Attr|Description|
|---|---|---|
|`radioClicked`|event emitted when a radio state is changed|