---
name: Progress Bar
category: Core Components
---

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`progress`|number|   |progress value|
|`maxValue`|number|`100`|The max vlue for the progress bar|
|`hide-progress`|boolean|`false`|true hide the progress value|
|`percentage`|boolean|`false`|true will display the progress as a percentage|
|`circle`|boolean|`false`|true if you want to display a circle progress|
|`circleTitle`|string|  |the title of the circle progress bar|
|`circleLabel`|string|  |the label of the circle progress bar, will only take affect on the large circle progress bar|


### Progress Attributes

```yoo-progress-bar.html
<div style="padding:10px;">
    <yoo-progress-bar progress="0" class="accent"></yoo-progress-bar>
    <yoo-progress-bar progress="50" class="accent"></yoo-progress-bar>
    <yoo-progress-bar progress="100" class="accent"></yoo-progress-bar> 
    <yoo-progress-bar progress="100" max-value="400" class="accent"></yoo-progress-bar>
    <br/>
    <yoo-progress-bar progress="33" class="xsmall dark"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="xsmall success"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="xsmall info"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="xsmall warning"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="xsmall danger"></yoo-progress-bar>
    <br/>
</div>
```

### Circle Progress bar

```yoo-progress-bar-circle.html
<div style="padding:10px;">
    <yoo-progress-bar progress="0" class="accent" circle="true" circle-title="title" circle-label="This is a Label"></yoo-progress-bar>
    <yoo-progress-bar progress="20" max-value="40" class="accent  large-circle" circle="true" circle-title="large" circle-label="This is a Label"></yoo-progress-bar>
    <yoo-progress-bar progress="20" max-value="40" percentage="true" class="accent  large-circle" circle="true" circle-title="large" circle-label="Same as above but as a percentage!"></yoo-progress-bar>
    <yoo-progress-bar progress="54" class="accent" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="54" class="dark" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="54" class="danger" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="54" class="info" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="54" class="success" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="54" class="warning" circle="true"></yoo-progress-bar>
</div>
```

```yoo-progress-bar-circle.css hidden
    yoo-progress-bar {
        margin: 0.25rem;
    }
```

### Show/Hide progress label

```yoo-progress-bar-hide-label.html
<div style="padding:10px;">
    <yoo-progress-bar progress="18" class="info" hide-progress="true" ></yoo-progress-bar>
    <yoo-progress-bar progress="58" class="info" circle="true" hide-progress="true"></yoo-progress-bar>
</div>
```

### No progress overflow

```yoo-progress-bar-overflow.html
<div style="padding:10px;">
    Negative progress of -45
    <yoo-progress-bar progress="-45" class="info"></yoo-progress-bar>
    <br/>
    Progress to high of 150
    <yoo-progress-bar progress="150" class="info"></yoo-progress-bar>
</div>
```

## CSS

|Type|Name|Description|
|---|---|---|
|Rounded|`rounded`|Add rounded border radius
|Full|`full`|When display in circle, displayed as a full circle|
|Flip|`flip`|Display the progress from left to right|
|Accent|`accent`|progress bar accent|
|Dark|`dark`|progress bar secondary|
|Success|`success`|progress bar success|
|Danger|`danger`|progress bar danger|
|Info|`info`|progress bar info|
|Warning|`warning`|progress bar warning|
|Gradient Accent|`gradient-accent`|progress bar gradient-accent|
|Gradient Dark|`gradient-dark`|progress bar gradient-dark|
|Gradient Success|`gradient-success`|progress bar gradient-success|
|Gradient Danger|`gradient-danger`|progress bar gradient-danger|
|Gradient Info|`gradient-info`|progress bar gradient-info|
|Gradient Warning|`gradient-warning`|progress bar gradient-warning|
|Small|`small`|small progress bar|
|X-Small|`xsmall`|xsmall progress bar (1px)|
|Large-Circle|`large-circle`|A large circular progress bar|
|Clippec-Circle|`clipped-circle`|A clipepd circular progress bar|

### Style variations

```yoo-progress-bar-type.html

    <yoo-progress-bar progress="33" class="dark"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="success"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="info"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="warning"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="danger"></yoo-progress-bar>
    <br/>
    <yoo-progress-bar progress="33" class="gradient-accent"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="gradient-dark"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="gradient-success"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="gradient-info"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="gradient-warning"></yoo-progress-bar>
    <yoo-progress-bar progress="33" class="gradient-danger"></yoo-progress-bar>
    <br/>
    <yoo-progress-bar progress="78" class="gradient-accent small"></yoo-progress-bar>
    <yoo-progress-bar progress="78" class="gradient-dark small"></yoo-progress-bar>
    <yoo-progress-bar progress="78" class="gradient-success small"></yoo-progress-bar>
    <yoo-progress-bar progress="78" class="gradient-info small"></yoo-progress-bar>
    <yoo-progress-bar progress="78" class="gradient-warning small"></yoo-progress-bar>
    <yoo-progress-bar progress="78" class="gradient-danger small"></yoo-progress-bar>
    <br/>
    <br/>
    <yoo-progress-bar progress="54" class="gradient-accent" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="64" class="gradient-dark" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="74" class="gradient-danger" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="84" class="gradient-info" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="94" class="gradient-success" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="94" class="gradient-warning" circle="true"></yoo-progress-bar>
    <br/>
    <br/>
    <yoo-progress-bar progress="0" class="accent" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="10" class="accent" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="30" class="accent" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="61" class="accent" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="78" class="accent" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="100" class="accent" circle="true"></yoo-progress-bar>
    <br/>
    <br/>
    <yoo-progress-bar progress="54" class="gradient-accent full" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="64" class="gradient-dark full" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="74" class="gradient-danger full" circle="true"></yoo-progress-bar>
    <yoo-progress-bar progress="84" class="gradient-info full" circle="true" hide-progress="true"></yoo-progress-bar>
    <yoo-progress-bar progress="94" class="gradient-success full" circle="true" hide-progress="true"></yoo-progress-bar>
    <yoo-progress-bar progress="94" class="gradient-warning full" circle="true" hide-progress="true"></yoo-progress-bar>
    <br/>
    <br/>
    Flip
    <br/>
    <yoo-progress-bar progress="54" class="gradient-accent full flipped" circle="true" hide-progress="true"></yoo-progress-bar>
    <yoo-progress-bar progress="64" class="gradient-dark full  flipped" circle="true" hide-progress="true"></yoo-progress-bar>
    <yoo-progress-bar progress="74" class="gradient-danger flipped" circle="true"></yoo-progress-bar>
    <br/>
    <yoo-progress-bar progress="54" class="gradient-accent flipped"></yoo-progress-bar>
    <yoo-progress-bar progress="64" class="gradient-dark flipped"></yoo-progress-bar>
    <yoo-progress-bar progress="74" class="gradient-danger flipped"></yoo-progress-bar>
    <br>
    <yoo-progress-bar progress="75" class="accent  large-circle" circle="true" circle-title="Large" circle-label="This is a Large Circle"></yoo-progress-bar>
    <yoo-progress-bar progress="75" class="accent  large-circle clipped-circle" circle="true" circle-title="clipped" circle-label="This is a large clipped circle"></yoo-progress-bar>
```

```yoo-progress-bar-type.css hidden
    yoo-progress-bar {
        margin: 0.25rem;
    }
```
