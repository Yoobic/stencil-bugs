---
name: Star Rating
category: Form Components
---


```yoo-form-star-rating.html

    <yoo-form-star-rating> </yoo-form-star-rating>

```

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`stars`|`number`|5|Number of stars in the star rating component|


### Stars Attributes

```yoo-form-star-rating-stars.html

    <yoo-form-star-rating stars="3"> </yoo-form-star-rating>
    <yoo-form-star-rating stars="5"> </yoo-form-star-rating>
    <yoo-form-star-rating stars="7"> </yoo-form-star-rating>
    <yoo-form-star-rating stars="9"> </yoo-form-star-rating>

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


### Style variations

```yoo-form-star-rating-style.html

    <yoo-form-star-rating class="accent" stars="3"> </yoo-form-star-rating>
    <yoo-form-star-rating class="danger" stars="5"> </yoo-form-star-rating>
    <yoo-form-star-rating class="dark" stars="7"> </yoo-form-star-rating>
    <yoo-form-star-rating class="success" stars="8"> </yoo-form-star-rating>
    <yoo-form-star-rating class="info" stars="9"> </yoo-form-star-rating>

```


## Events

|Attr|Description|
|---|---|---|
|`changed`|Send new value (number) of selected stars|