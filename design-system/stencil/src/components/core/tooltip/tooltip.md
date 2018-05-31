---
name: Tooltip
category: Core Components
---

The tooltip component is used with the `yoo-tooltip` tag. The text to be in the tooltip needs to be specified and additional options may be set to modify properties of the tooltip.
Any content may be inserted inside the `<yoo-tooltip></yoo-tooltip>` and the tooltip will appear around this content. 

## Attributes

|Name|Type|Default|Description|
|---|---|---|---|
|`text`|string|  |the text inside the tooltip|
|`placement`|string|  |the location of the tooltip relative to the inner content (top, bottom, left, right, top-start, top-end)|
|`options`|any|  |key value pairs of additional tooltip options|

```yoo-tooltip.html
    <br>
    <br>
    <yoo-tooltip text="I am a top placed tooltip" placement="top">
        <div>Any content can be in this slot</div>
    </yoo-tooltip>
    <br>
    <br>
    <yoo-tooltip id="tooltip2" text="I am a left tooltip" placement="left">
        <div>Any content can be here</div>
    </yoo-tooltip>
    <br>
    <br>
    <br>
    <yoo-tooltip text="I am a right tooltip" placement="right">
        <div>Any content can be in this slot</div>
    </yoo-tooltip>
    <br>
    <br>
    <yoo-tooltip text="I am a bottom placed tooltip" placement="bottom">
        <div>Any content can be in this slot</div>
    </yoo-tooltip>
    <br>
    <br>
```

```yoo-tooltip.js
    var cmp = document.querySelector('yoo-tooltip');
    cmp.options = {};
```

```yoo-tooltip.css hidden
    yoo-tooltip {
        width: 100px;
    }
    #tooltip2 {
        float: right;
    }
```

## Size Variation

Differently sized tooltips may be specified in the options. Size values can be: `small`, `regular`, `large`.

```yoo-tooltip-size.html
    <yoo-tooltip id="tooltip1" text="I am a small right placed tooltip" placement="right">
        <div>Any content can be in this slot</div>
    </yoo-tooltip>
    <br>
    <br>
    <yoo-tooltip id="tooltip2" text="I am a regular bottom placed tooltip" placement="bottom">
        <div>Any content can be in this slot</div>
    </yoo-tooltip>
    <br><br>
     <yoo-tooltip id="tooltip3" text="I am a large top placed tooltip" placement="top">
        <div>Any content can be in this slot</div>
    </yoo-tooltip>
```

```yoo-tooltip-size.js
    var cmp1 = document.querySelector('#tooltip1');
    cmp1.options = { size: "small" };
    var cmp2 = document.querySelector('#tooltip2');
    cmp2.options = { size: "regular" };
    var cmp3 = document.querySelector('#tooltip3');
    cmp3.options = { size: "large" };
```

```yoo-tooltip-size.css hidden
    yoo-tooltip {
        width: 100px;
    }
```