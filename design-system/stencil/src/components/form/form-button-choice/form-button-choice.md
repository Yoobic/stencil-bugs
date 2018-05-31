---
name: Button Choice
category: Form Components
---

```yoo-form-button-choice.html

    <yoo-form-button-choice></yoo-form-button-choice>

```
```yoo-form-button-choice.js

    var comp = document.querySelector('yoo-form-button-choice');
    comp.choices = ['salut', 'bonjour', 'hi'];

```

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`multiple`|boolean|`false`|Set to true if you want to allow multiple selection|
|`choices`|`string[]`|`[]`|Set of choices to print in the buttons|
|`selected`|`boolean[]`|`[]`|Pre defined selected items. Use this prop to restaure a previous state. Set true for the item which need to be selected at the beginning|

If you try to select more than one choice without setting `multiple` to true, choices will be all unselected. 
### Multiple Attribute

```yoo-form-button-choice-multiple.html

    <yoo-form-button-choice multiple="true"></yoo-form-button-choice>
```
```yoo-form-button-choice-multiple.js

    var comp = document.querySelector('yoo-form-button-choice');
    comp.choices = ['salut', 'bonjour', 'hi', 'que tal', 'arigato', 'good morning'];

```

### Selected Attribute

```yoo-form-button-choice-selected.html

    <yoo-form-button-choice multiple="true"></yoo-form-button-choice>
```
```yoo-form-button-choice-selected.js

    var comp = document.querySelector('yoo-form-button-choice');
    comp.choices = ['salut', 'bonjour', 'hi', 'que tal', 'arigato', 'good morning'];
    comp.selected = [false, false, true, false, true, false];
    
```

## CSS

|Type|Name|Description|
|---|---|---|
|Round|`round`|Rounded label|
|Accent|`accent`|Accent style on selected|
|Danger|`danger`|Danger style on selected|
|Warning|`warning`|Warning style on selected|
|Info|`info`|Info style on selected|
|Dark|`dark`|Dark style on selected|

### Style variations

```yoo-form-button-choice-style.html

    <h3>Long choices</h3>
    <br/>
    <yoo-form-button-choice ></yoo-form-button-choice>
    <br/>
    <h3>Styles</h3>
    <br/>
    <yoo-form-button-choice class="round"></yoo-form-button-choice>
    <br/>
    <br/>    
    <yoo-form-button-choice class="accent"></yoo-form-button-choice>
    <br/>
    <br/>
    <yoo-form-button-choice class="danger"></yoo-form-button-choice>
    <br/>
    <br/>
    <yoo-form-button-choice class="warning"></yoo-form-button-choice>
    <br/>
    <br/>
    <yoo-form-button-choice class="info"></yoo-form-button-choice>
    <br/>
    <br/>
    <yoo-form-button-choice class="dark"></yoo-form-button-choice>


```
```yoo-form-button-choice-style.js

    var comps = [...document.querySelectorAll('yoo-form-button-choice')];
    comps.map((comp) => {comp.choices = ['salut', 'bonjour', 'hi', 'que tal', 'arigato', 'good morning']});
    var comp1 = document.querySelector('yoo-form-button-choice');
    comp1.choices = ['this is a verrrrrrrrrrrry looooooooooooooooooong choice', 'small', 'soooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo big choice','little'];
```

### Style variations 

## Events

|Attr|Type|Description|
|---|---|---|
|`changed`|`string[]`|When a button is clicked, an event is emitted with all the current selected values|