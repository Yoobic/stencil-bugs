---
name: Ranking
category: Form Components
---


```yoo-form-ranking.html

    <yoo-form-ranking></yoo-form-ranking>
```
```yoo-form-ranking.js

    var comp = document.querySelector('yoo-form-ranking');
    comp.values = [{value: 'a'}, {value: 'b'}, {value: 'c'}, {value: 'd'}];

```

## Attributes
|Name|Type|Default|Description|
|---|---|---|---|
|`values`|`IItemRanking[]`|   |Values which need to be ranked|


Specify, a predefined rank if you need to. If the ranks defined are not correct, then they will be all reset.
Specify, an order for the unranked items with the order prop of the IItemRanking interface if you need to.

```tsx
export interface IItemRanking {
    value: string;
    rank?: number;
    order?: number;
}
```

### Order prop of ItemRanking

```yoo-form-ranking-order.html

    <yoo-form-ranking></yoo-form-ranking>
```
```yoo-form-ranking-order.js

    var comp = document.querySelector('yoo-form-ranking');
    comp.values = [{value: 'a', order: 1}, {value: 'b', order: 2}, {value: 'c', order: 3}, {value: 'd', order: 4}];

```

### Pre defined ranking 

```yoo-form-ranking-ranking.html

    <yoo-form-ranking></yoo-form-ranking>
```
```yoo-form-ranking-ranking.js

    var comp = document.querySelector('yoo-form-ranking');
    comp.values = [{rank: 1, value: 'a'}, {rank: 3, value: 'b'}, {rank: 4, value: 'c'}, {rank: 2, value: 'd'}]

```

## CSS

|Type|Name|Description|
|---|---|---|
|Accent|`accent`|yoo-form-slider accent|
|Dark|`dark`|yoo-form-slider dark|
|Success|`success`|yoo-form-slider success|
|Danger|`danger`|yoo-form-slider danger|
|Info|`info`|yoo-form-slider info|
|Warning|`warning`|yoo-form-slider warning|
|Gradient Accent|`gradient-accent`|label gradient accent|
|Gradient Danger|`gradient-danger`|label gradient danger|
|Gradient Info|`gradient-info`|label gradient info|
|Gradient Warning|`gradient-warning`|label gradient warning|
|Gradient Success|`gradient-success`|label gradient success|
|Gradient Dark|`gradient-dark`|label gradient dark|


### Styles variations 

```yoo-form-ranking-style.html

    <yoo-form-ranking class="accent"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="danger"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="success"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="warning"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="info"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="dark"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="gradient-accent"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="gradient-danger"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="gradient-success"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="gradient-warning"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="gradient-info"></yoo-form-ranking>
    <br/>
    <br/>
    <yoo-form-ranking class="gradient-dark"></yoo-form-ranking>
    <br/>
    <br/>

```
```yoo-form-ranking-style.js

    var comps = [...document.querySelectorAll('yoo-form-ranking')];
    comps.map(comp => {comp.values = [{value: 'a'}, {value: 'b'}, {value: 'c'}, {value: 'd'}];});

```

## Events

|Attr|Type|Description|
|---|---|---|
|`changed`|`ItemRanking[]`|Fired when the rank is modified by the user. You can use the value of the event to restaure a previous state on the ranking component.|