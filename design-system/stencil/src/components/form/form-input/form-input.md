---
name: Input
category: Form Components
---

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`placeholder`|string|   |the form input field's placeholder|
|`placeholderToLabel`|boolean|`false` |`true` changes the placeholder into a label|
|`required`|boolean|`false` |`true` adds required red star to label|
|`iconPrefix`|string|   |the input's placeholder|
|`iconSuffix`|string|   |the input's placeholder|
|`tooltip`|string|   |adds a tooltip to the form input|
|`value`|string|   |the form input field's value|
|`type`|string|`text`|the type of input|
|`showPasswordToggle`|boolean|`false`|will allow the user to show and hide the password text field|
|`showInputClear`|boolean|`false`|will allow the user to clear the input field|
|`borderColor`|string|   |will change the border color on input focus or blur|

```yoo-form-input.html
        <yoo-form-input placeholder="my place holder" required="true"></yoo-form-input>
        <br>
        <yoo-form-input placeholder="show password toggle" type="password" show-password-toggle=true ></yoo-form-input> 
        <br>
        <yoo-form-input placeholder="clear input" type="text" show-input-clear=true ></yoo-form-input> 
        <br>
        <yoo-form-input placeholder="icon prefix and suffix" icon-prefix="yo-pen" icon-suffix="yo-note"></yoo-form-input>
        <br>
        <yoo-form-input placeholder="hover over the icon to see the tooltip" icon-suffix="yo-info" tooltip="my long tooltip"></yoo-form-input>
        <br>
        <yoo-form-input placeholder="placeholder to label" placeholdertolabel="true"></yoo-form-input> 
        <br>
        <yoo-form-input placeholder="border color on foucs" border-color="success"></yoo-form-input>
```

## CSS
|Type|Name|Description|
|---|---|---|
|Small|`small`|Creates a smaller input field|
|Simple|`simple`|Creates an input in a simple style with one border on the bottom|
|Round|`round`|Creates a round input|
|Dark|`dark`|Form input dark|
|Accent|`accent`|Form input accent|
|Danger|`danger`|Form input danger|
|Success|`success`|Form input success|
|Dark|`dark`|Form input dark|
|Info|`info`|Form input info|
|Warning|`warning`|Form input warning|


```yoo-form-input-classes.html
    <yoo-form-input class="small" placeholder="small" required="true" border-color="success" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input>
    <br>
    <yoo-form-input class="round" placeholder="round" required="true" border-color="success" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input>
    <br>
    <yoo-form-input class="simple" placeholder="simple" required="true" border-color="success" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input>
    <br>
    <yoo-form-input class="simple-icon" placeholder="simple-icon" required="true" border-color="success" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input> 
    <br>
    <yoo-form-input class="accent simple-icon" placeholder="accent" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input>
    <br>
    <yoo-form-input class="danger simple-icon" placeholder="danger" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input>
    <br>
    <yoo-form-input class="success simple-icon" placeholder="success" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input> 
    <br>
    <yoo-form-input class="dark simple-icon" placeholder="dark" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input>
    <br>
    <yoo-form-input class="info simple-icon" placeholder="info" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input> 
    <br>
    <yoo-form-input class="warning simple-icon" placeholder="warning" icon-prefix="yo-close" icon-suffix="yo-close"></yoo-form-input>          
```

## Events
|Attr|Description|
|---|---|
|`inputBlurred`|Triggered when the form input is blurred|
|`inputFocused`|Triggered when the form input is focused on|
|`inputChanged`|Triggered when the value of form input changes|
|`iconClicked`|Triggered when an icon is clicked|
