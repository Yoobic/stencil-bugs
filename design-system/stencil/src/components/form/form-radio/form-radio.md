---
name: Radio
category: Form Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`text`|string|   |the text of the radio|
|`disabled`|boolean|false|whether the radio is disabled or not|
|`state`|string| |the starting state of the radio|

```yoo-form-radio-variations.html
<div style="padding:10px;">
  <yoo-form-radio text="this is a radio" class="stable accent"></yoo-form-radio>
  <br>
  <br>
  <yoo-form-radio text="this is a radio with default state set to checked" class="stable accent" state="checked"></yoo-form-radio>
  <br>
  <br>
  <yoo-form-radio text="this is an unchecked disabled radio" class="stable accent" disabled="true"></yoo-form-radio>
  <br>
  <br>
  <yoo-form-radio text="this is a checked disabled radio" class="stable accent" disabled="true" state="checked"></yoo-form-radio>
</div>
<div style="padding:10px;">
    <yoo-form-radio text="this is a radio" class="accent"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a radio with default state set to checked" class="accent" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is an unchecked disabled radio" disabled="true"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a checked disabled radio" disabled="true" state="checked"></yoo-form-radio>
</div>
```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-form-radio accent|
|Success|`success`|yoo-form-radio success|
|Dark|`dark`|yoo-form-radio dark|
|Danger|`danger`|yoo-form-radio danger|
|Info|`info`|yoo-form-radio info|
|Warning|`warning`|yoo-form-radio warning|
|Gradient Accent|`gradient-accent`|yoo-form-radio gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-form-radio gradient-dark|
|Gradient Success|`gradient-success`|yoo-form-radio gradient-success|
|Gradient Danger|`gradient-danger`|yoo-form-radio gradient-danger|
|Gradient Info|`gradient-info`|yoo-form-radio gradient-info|
|Gradient Warning|`gradient-warning`|yoo-form-radio gradient-warning|
|Stable|`stable`|yoo-form-radio variation style|

```yoo-form-radio-styles.html
<div style="padding:10px;">
    <yoo-form-radio text="this is an accent radio" class="accent" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a danger radio" class="danger" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a success radio" class="success" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is an info radio" class="info" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a warning radio" class="warning" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a dark radio (default)" class="dark" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is an stable accent radio" class="stable accent" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a stable danger radio" class="stable danger" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a stable success radio" class="stable success" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is an stable info radio" class="stable info" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a stable warning radio" class="stable warning" state="checked"></yoo-form-radio>
    <br><br>
    <yoo-form-radio text="this is a stable dark radio (default)" class="stable dark" state="checked"></yoo-form-radio>
</div>
```

## Events

|Attr|Description|
|---|---|---|
|`radioClicked`|event emitted when a radio state is changed|