---
name: Checkbox
category: Form Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`text`|string|   |the text of the checkbox|
|`state`|string| unchecked |the state of the checkbox, can be one of three values; unchecked, indeternimate and checked|
|`disabled`|boolean| `false`  |whether the checkbox is enabled or not|
|`isIndeterminate`|boolean| | allows a third indeterminate state for the checkbox|

```yoo-form-checkbox.html
<div style="padding:10px;">
    <yoo-form-checkbox text="this is a checkbox" class="accent"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is an indeterminate checkbox" class="accent" is-indeterminate="true"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a checkbox with starting state checked" state="checked" class="accent"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a disabled unchecked checkbox" disabled="true"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a disabled indeterminate checkbox" disabled="true" state="indeterminate"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a disabled checked checkbox" disabled="true" state="checked"></yoo-form-checkbox>
</div>
```

## CSS

The checkbox has the `dark` class by default.

|Type|Name|Description|
|---|---|---|
|Large|`large`|yoo-form-checkbox large|
|Accent|`accent`|yoo-form-checkbox accent|
|Success|`success`|yoo-form-checkbox success|
|Danger|`danger`|yoo-form-checkbox danger|
|Info|`info`|yoo-form-checkbox info|
|Warning|`warning`|yoo-form-checkbox warning|
|Gradient Accent|`gradient-accent`|yoo-form-checkbox gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-form-checkbox gradient-dark|
|Gradient Success|`gradient-success`|yoo-form-checkbox gradient-success|
|Gradient Danger|`gradient-danger`|yoo-form-checkbox gradient-danger|
|Gradient Info|`gradient-info`|yoo-form-checkbox gradient-info|
|Gradient Warning|`gradient-warning`|yoo-form-checkbox gradient-warning|

```yoo-form-checkbox-styles.html
<div style="padding:10px;">
    <yoo-form-checkbox text="this is a large accent checkbox" state="checked" class="accent large"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is an accent checkbox" class="accent" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a danger checkbox" class="danger" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a success checkbox" class="success" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is an info checkbox" class="info" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a warning checkbox" class="warning" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a dark checkbox (default)" class="dark" state="checked"></yoo-form-checkbox>
</div>
<div style="padding:10px;">
    <yoo-form-checkbox text="this is a large accent checkbox" state="checked" class="round accent large"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is an accent checkbox" class="round accent" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a danger checkbox" class="round danger" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a success checkbox" class="round success" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is an info checkbox" class="round info" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a warning checkbox" class="round warning" state="checked"></yoo-form-checkbox>
    <br><br>
    <yoo-form-checkbox text="this is a dark checkbox (default)" class="round dark" state="checked"></yoo-form-checkbox>
</div>
```

## Events

|Attr|Description|
|---|---|---|
|`onCheck`|event emitted when a checkbox state is changed|