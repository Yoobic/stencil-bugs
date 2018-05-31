---
name: Panel
category: Core Components
---
Panel are use to help separating content a making processes as reading or filling a form easier to the user. Panels are a way of chunking into smaller pieces.

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`width`|number|`100%`|the width of the panel|
|`height`|number|`100%`|the height of the panel|

### Basic Panel

```yoo-panel.html
    <yoo-panel></yoo-panel>
```

### Different Sized Panel

```yoo-panel-sizes.html
    <yoo-panel height="100"></yoo-panel>
    <br>
    <yoo-panel height="100" width="100"></yoo-panel>
```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-panel accent|
|Dark|`dark`|yoo-panel dark|
|Success|`success`|yoo-panel success|
|Danger|`danger`|yoo-panel danger|
|Info|`info`|yoo-panel info|
|Warning|`warning`|yoo-panel warning|
|Gradient Accent|`gradient-accent`|yoo-panel gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-panel gradient-grey|
|Gradient Success|`gradient-success`|yoo-panel gradient-success|
|Gradient Danger|`gradient-danger`|yoo-panel gradient-danger|
|Gradient Info|`gradient-info`|yoo-panel gradient-info|
|Gradient Warning|`gradient-warning`|yoo-panel gradient-warning|

```yoo-panel-styles.html
    <yoo-panel height="50" class="accent"></yoo-panel>
    <br>
    <yoo-panel height="50" class="danger"></yoo-panel>
    <br>
    <yoo-panel height="50"class="success"></yoo-panel>
    <br>
    <yoo-panel height="50" class="info"></yoo-panel>
    <br>
    <yoo-panel height="50" class="warning"></yoo-panel>
    <br>
    <yoo-panel height="50" class="dark"></yoo-panel>
    <br>
    <yoo-panel height="50" class="gradient-accent"></yoo-panel>
    <br>
    <yoo-panel height="50" class="gradient-danger"></yoo-panel>
    <br>
    <yoo-panel height="50" class="gradient-success"></yoo-panel>
    <br>
    <yoo-panel height="50" class="gradient-info"></yoo-panel>
    <br>
    <yoo-panel height="50" class="gradient-warning"></yoo-panel>
    <br>
    <yoo-panel height="50" class="gradient-dark"></yoo-panel>
```
