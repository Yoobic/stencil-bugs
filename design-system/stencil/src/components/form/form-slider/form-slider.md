---
name: Slider
category: Form Components
---

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`initialValue`|number|   |initialValue passed to the slider|
|`minimum`|number|`0`|minimum number of the slider|
|`maximum`|number|`100`|maximum number of the slider|
|`disabled`|boolean|`false`|set true to disable the slider|
|`hideLabel`|boolean|`false`|set true to hide the label|
|`hideReferences`|boolean|`false`|set true to hide the references|
|`doubleSlider`|boolean|`false`|set true to use double slider|

### InitialValue

```yoo-form-slider-initial.html
<div style="padding:10px;">
    <yoo-form-slider class="accent" initial-value="34"></yoo-form-slider>
</div>
```

### Minimum & Maximum

```yoo-form-slider-max-min.html
<div style="padding:10px;">
    <yoo-form-slider minimum="-34" class="accent" initial-value="34" maximum="134"></yoo-form-slider>
</div>
```

### Disabled

```yoo-form-slider-disabled.html
<div style="padding:10px;">
    <yoo-form-slider disabled="true" class="dark" initial-value="34" ></yoo-form-slider>
</div>
```

### Hide Label

```yoo-form-slider-hide-label.html
<div style="padding:10px;">
    <yoo-form-slider hide-label="true" class="accent" initial-value="34" ></yoo-form-slider>
</div>
```

### Hide References

```yoo-form-slider-hide-ref.html
<div style="padding:10px;">
    <yoo-form-slider hide-references="true" class="accent" initial-value="34"></yoo-form-slider>
</div>
```

### Double Slider

```yoo-form-slider-double.html
<div style="padding:10px;">
    <yoo-form-slider class="accent" initial-value="34" double-slider="true"></yoo-form-slider>
</div>
```

## CSS

|Type|Name|Description|
|---|---|---|
|Inline|`inline`|yoo-form-slider is displayed inline|
|Accent|`accent`|yoo-form-slider accent|
|Dark|`dark`|yoo-form-slider dark|
|Success|`success`|yoo-form-slider success|
|Danger|`danger`|yoo-form-slider danger|
|Info|`info`|yoo-form-slider info|
|Warning|`warning`|yoo-form-slider warning|
|Gradient Accent|`gradient-accent`|yoo-form-slider gradient-accent|
|Gradient Dark|`gradient-dark`|yoo-form-slider gradient-dark|
|Gradient Success|`gradient-success`|yoo-form-slider gradient-success|
|Gradient Danger|`gradient-danger`|yoo-form-slider gradient-danger|
|Gradient Info|`gradient-info`|yoo-form-slider gradient-info|
|Gradient Warning|`gradient-warning`|yoo-form-slider gradient-warning|

```yoo-form-slider-style.html
<div style="padding:10px;">
    <yoo-form-slider class="accent" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="dark" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="success" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="danger" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="info" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="warning" initial-value="34"></yoo-form-slider>
    <br/>
    <br/>
    <yoo-form-slider class="gradient-accent" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-dark" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-success" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-danger" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-info" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-warning" initial-value="34"></yoo-form-slider>
</div>
```

### Inline Slider

```yoo-form-slider-inline.html
<div style="padding:10px;">
    <yoo-form-slider class="accent inline" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="dark inline" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="danger inline" initial-value="34"></yoo-form-slider>
    <br/>
    <yoo-form-slider class="success inline" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="warning inline" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="info inline" initial-value="34"></yoo-form-slider>
    <br/>
    <yoo-form-slider class="gradient-accent inline" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-dark inline" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-danger inline" initial-value="34"></yoo-form-slider>
    <br/>
    <yoo-form-slider class="gradient-success inline" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-warning inline" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-info inline" initial-value="34"></yoo-form-slider>
    <br/>
    <yoo-form-slider class="gradient-success inline" double-slider="true" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-warning inline" double-slider="true" initial-value="34"></yoo-form-slider>
    <yoo-form-slider class="gradient-info inline" double-slider="true" initial-value="34"></yoo-form-slider>
</div>
```

## Events

|Attr|Description|
|---|---|---|
|`singleSliderChanged`|send new value (number) when users use move the slider|
|`doubleSliderChanged`|send new value (number) when users use move the second slider|
