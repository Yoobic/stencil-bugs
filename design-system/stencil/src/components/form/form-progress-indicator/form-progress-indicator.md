---
name: Progress Indicator
category: Form Components
---

A simple progress indicator to show the user it's current progress in completing a form. It has a maximum of 7 visible steps. Additional steps are collapsed into a context menu on the penultimate element.

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`steps`|string[]|   |the steps to display in the indicator|
|`currentStep`|number| |index-based number to indicate the current step|
|`isCompleted`|boolean|`false`|True to display a completed progress indicator|

```yoo-form-progress-indicator.html
<div style="padding:10px;">
    <yoo-form-progress-indicator id="progress1" current-step=1></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator id="progress2" current-step=3></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator id="progress3" current-step=5></yoo-form-progress-indicator>
    <br>
    <br>
    <yoo-form-progress-indicator id="progress4" current-step=8></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator id="progress5" is-completed="true"></yoo-form-progress-indicator>
</div>
```

```yoo-form-progress-indicator.js
    var comp1 = document.querySelector('#progress1');
    comp1.steps = ["Step 1", "Step 2"];
    var comp2 = document.querySelector('#progress2');
    comp2.steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7"];
    var comp3 = document.querySelector('#progress3');
    comp3.steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5","Step 6", "Step 7", "Step 8", "Step 9"];
    var comp4 = document.querySelector('#progress4');
    comp4.steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5","Step 6", "Step 7", "Step 8", "Step 9"];
    var comp5 = document.querySelector('#progress5');
    comp5.steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
```

## CSS

CSS classes can be used to change the color of the current step (default `accent`). The `class='vertical'` can be used to orient the element vertically.

|Type|Name|Description|
|---|---|---|
|Success|`success`|yoo-form-progress-indicator success|
|Danger|`danger`|yoo-form-progress-indicator danger|
|Info|`info`|yoo-form-progress-indicator info|
|Warning|`warning`|yoo-form-progress-indicator warning|
|Gradient Accent|`gradient-accent`|yoo-form-progress-indicator gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-form-progress-indicator gradient-dark|
|Gradient Success|`gradient-success`|yoo-form-progress-indicator gradient-success|
|Gradient Danger|`gradient-danger`|yoo-form-progress-indicator gradient-danger|
|Gradient Info|`gradient-info`|yoo-form-progress-indicator gradient-info|
|Gradient Warning|`gradient-warning`|yoo-form-progress-indicator gradient-warning|
|Vertical|`vertical`|yoo-form-progress-indicator vertical|

```yoo-form-progress-indicator-classes.html
<div style="padding:10px;">
    <yoo-form-progress-indicator class="vertical" current-step=3></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="success" current-step=0></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="danger" current-step=1></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="info" current-step=2></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="warning" current-step=3></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="gradient-accent" current-step=4></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="gradient-dark" current-step=5></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="gradient-success" current-step=6></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="gradient-danger" current-step=7></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="gradient-info" current-step=4></yoo-form-progress-indicator>
    <br/>
    <br/>
    <yoo-form-progress-indicator class="gradient-warning" current-step=3></yoo-form-progress-indicator>
</div>
```

```yoo-form-progress-indicator-classes.js
    var comps = document.querySelectorAll('yoo-form-progress-indicator');
    comps.forEach(comp => comp.steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5", "Step 6", "Step 7", "Step 8", "Step 9"]);
```

## Events

|Attr|Description|
|---|---|---|
|`stepSelected`|triggered when clicking on a step, it returns that step|