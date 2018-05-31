---
name: Color Picker
category: Form Components
---

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`color`|string|`#ffffff`|the default color of the color picker|
|`hideLabel`|boolean|false|show or hide the label|

### Default

```yoo-form-color-picker-default.html
<div style="padding:10px;">
    <yoo-form-color-picker></yoo-form-color-picker>
</div>
```

### Color

```yoo-form-color-picker.html
<div style="padding:10px;">
    <yoo-form-color-picker color="#fa2367"></yoo-form-color-picker>
</div>
```

### Hidden Label

```yoo-form-color-picker-hide.html
<div style="padding:10px;">
    <yoo-form-color-picker hide-label="true"></yoo-form-color-picker>
</div>
```

## CSS

|Type|Name|Description|
|---|---|---|
|Large|`large`|large color picker |

### Style Variations

```yoo-form-color-picker-style.html
<div style="padding:10px;">
    <yoo-form-color-picker color="#fa2367"></yoo-form-color-picker>
    <yoo-form-color-picker color="#fa2367" class="large"></yoo-form-color-picker>
    <br/>
    <yoo-form-color-picker hide-label="true" color="#fa2367"></yoo-form-color-picker>
    <yoo-form-color-picker hide-label="true" color="#fa2367" class="large"></yoo-form-color-picker>
</div>
```

## Events

|Attr|Description|
|---|---|---|
|`colorSelected`|When the user change the selected color, send the new one as hexadecimal string|