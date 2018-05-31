---
name: Toggle
category: Form Components
---

## CSS

|Type|Name|Description|
|---|---|---|
|Background Fill|`background-fill`|fills the background of the toggle|
|Accent|`accent`|yoo-form-toggle accent|
|Dark|`dark`|yoo-form-toggle dark|
|Success|`success`|yoo-form-toggle success|
|Danger|`danger`|yoo-form-toggle danger|
|Info|`info`|yoo-form-toggle info|
|Warning|`warning`|yoo-form-toggle warning|


```yoo-form-toggle.html
<div class="container">
    <div class="column-container">
        <yoo-form-toggle class="accent"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="dark"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="success"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="danger"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="info"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="warning"></yoo-form-toggle>
    </div>
    <div class="column-container">
        <yoo-form-toggle class="accent background-fill"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="dark background-fill"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="success background-fill"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="danger background-fill"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="info background-fill"></yoo-form-toggle>
        <br>
        <yoo-form-toggle class="warning background-fill"></yoo-form-toggle>
    </div>
</div>

```

```yoo-form-toggle.css hidden
    .container {
        display: flex;
    }

    .column-container {
        padding-right: 10px;
        display: flex;
        flex-direction: column;
    }
    
```

## Events

|Attr|Description|
|---|---|---|
|`toggled`|boolean event emitted on toggle|