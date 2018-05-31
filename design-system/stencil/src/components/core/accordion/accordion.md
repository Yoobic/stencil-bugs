---
name: Accordion
category: Core Components
---
Accordions can be used with the `<yoo-accordion>` elements.

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`titles`|string[]|*required   |the headings of the accordions|
|`allowMultipleSelection`|boolean|false|allows the user to have more than one accordion open|

### Accordion Example

```yoo-accordion.html
    <yoo-accordion>
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
        <div slot="accordion2">
            <p>I am the accordion 2 content</p>
        </div>
        <div slot="accordion3">
            <p>I am the accordion 3 content</p>
        </div>
        <div slot="accordion4">
            <p>I am the accordion 4 content</p>
        </div>
    </yoo-accordion>
```
```yoo-accordion.js hidden
    var comp = document.querySelector('yoo-accordion');
    comp.titles = ["accordion1", "accordion2","accordion3","accordion4"];
```
### Multiple Selection
```yoo-accordion-multiple.html
    <yoo-accordion class="accent" allow-multiple-selection="true">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
        <div slot="accordion2">
            <p>I am the accordion 2 content</p>
        </div>
        <div slot="accordion3">
            <p>I am the accordion 3 content</p>
        </div>
        <div slot="accordion4">
            <p>I am the accordion 4 content</p>
        </div>
    </yoo-accordion>
```
```yoo-accordion-multiple.js hidden
    var comp = document.querySelector('yoo-accordion');
    comp.titles = ["accordion1", "accordion2","accordion3","accordion4"];
```



## Css
|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-accordion accent|
|Dark|`dark`|yoo-accordion dark|
|Success|`success`|yoo-accordion success|
|Danger|`danger`|yoo-accordion danger|
|Info|`info`|yoo-accordion info|
|Warning|`warning`|yoo-accordion warning|
|Gradient Accent|`accent-gradient`|yoo-accordion gradient-accent|
|Gradient Dark|`dark-gradient`|yoo-accordion gradient-dark|
|Gradient Success|`success-gradient`|yoo-accordion gradient-success|
|Gradient Danger|`danger-gradient`|yoo-accordion gradient-danger|
|Gradient Info|`info-gradient`|yoo-accordion gradient-info|
|Gradient Warning|`warning-gradient`|yoo-accordion gradient-warning|

```yoo-accordion-styles.html
    <yoo-accordion class="accent">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="dark">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="success">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="danger">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="info">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="warning">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="accent-gradient">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="dark-gradient">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="success-gradient">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="danger-gradient">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="info-gradient">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>
    <br>
    <yoo-accordion class="warning-gradient">
     <div slot="accordion1">
            <p>I am the accordion 1 content</p>
        </div>
    </yoo-accordion>


```

```yoo-accordion-styles.js hidden
    var comp = document.querySelector('yoo-accordion');
    comp.headings = ["accordion1"];
```

## Events

|Attr|Description|
|---|---|---|
|`yooChangeAccordionSelected`|event emitted when the accordion state is changed|